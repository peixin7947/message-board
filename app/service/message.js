'use strict';

const Service = require('egg').Service;

class MessageService extends Service {

  /**
   * 获取用户的留言
   * @param {Object} data 参数体
   * @return {Promise<{list}>} 分页查询数据和总量
   */
  async listMessage(data) {
    const { ctx } = this;
    let { sort, pageSize, pageIndex, keyword } = data;
    sort = JSON.parse(sort);
    let filter;
    if (keyword) {
      const regex = new RegExp(this.ctx._.escapeRegExp(keyword), 'i');
      filter = {
        $or: [
          { content: { $regex: regex } },
          { title: { $regex: regex } },
        ],
      };
    }
    const items = await ctx.model.Message.find(Object.assign({ doDel: null }, filter))
      .populate([
        { path: 'creator', select: 'nickname avatar' },
      ])
      .sort(sort)
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize)
      .lean();
    const total = await ctx.model.Message.count({ isDel: false, doDel: null });
    return { items, total };
  }

  /**
   * 获取留言详情
   * @param data
   * @return {Promise<void>}
   */
  async getMessageById(data) {
    const { ctx } = this;
    const message = await ctx.model.Message.findOne({ _id: data.id, isDel: false, doDel: null })
      .populate([
        { path: 'creator', select: 'nickname avatar' },
        // { path: 'reply.creator', select: 'nickname avatar' },
        // { path: 'reply.toUser', select: 'nickname avatar' },
      ])
      .lean();
    message.content = ctx.helper.escape(message.content);
    // 除去已删除的评论
    const comments = await ctx.model.Comment.find({ messageId: data.id, doDel: null })
      .populate([
        { path: 'creator', select: 'nickname avatar' },
        { path: 'toUser', select: 'nickname avatar' },
        { path: 'reply.creator', select: 'nickname avatar' },
        { path: 'reply.toUser', select: 'nickname avatar' },
      ]).lean();
    message.comments = comments;
    return message;
  }

  /**
   *  发布一个留言
   * @param {Object} data 参数体
   * @param {String} data.title 留言标题
   * @param {String} data.content 留言内容
   * @return {Promise<{msg: string}>} 返回消息
   */
  async createMessage(data) {
    const { ctx } = this;
    const { title, content, tag } = data;
    const userInfo = ctx.session.userInfo;
    await ctx.model.Message.create({ creator: userInfo._id, content, title, tag });
    return { msg: '发布留言成功' };
  }

  /**
   * 删除留言
   * @param {Object} data 参数体
   * @return {Promise<{msg: string}>} 返回消息
   */
  async deleteMessage(data) {
    const { ctx } = this;
    const { id } = data;
    const userInfo = ctx.session.userInfo;
    let model = await ctx.model.Message.findOne({ _id: id, doDel: null });
    if (!model) {
      model = await ctx.model.Comment.findOne({ _id: id, doDel: null });
      if (!model) return { msg: '删除失败，已被删除或不存在' };
    }
    if (String(model.creator) !== String(userInfo._id)) {
      return { msg: '无权删除' };
    }
    model.doDel = { userId: userInfo._id };
    model.save();
    return { msg: '删除成功' };
  }

  /**
   * 编辑留言评论
   * @param {Object} data 参数体
   * @param {String} data.id 留言评论id
   * @param {String} data.content 留言评论的内容
   * @param {String} data.title 留言的主题
   * @return {Promise<{msg: string}>} 返回消息
   */
  async updateMessage(data) {
    const { ctx } = this;
    const { id, content, title, tag } = data;
    const userInfo = ctx.session.userInfo;
    const message = await ctx.model.Message.findOne({ _id: id, doDel: null });
    // 如果留言或消息不存在
    if (!message) {
      return { msg: '留言或评论不存在' };
    }
    if (String(message.creator) !== String(userInfo._id)) {
      return { msg: '不可编辑非自己的留言' };
    }
    message.tag = tag;
    message.content = content;
    message.title = title;
    message.updateTime = new Date();
    message.save();
    return { msg: '修改成功' };
  }

  /**
   * 获取用户的留言列表
   * @param {Object} data 参数体
   * @return {Promise<{total, items}>} 留言的数据和总量
   */
  async getMessageListByUserId(data) {
    const { ctx, app } = this;
    let { userId, sort, pageSize, pageIndex } = data;
    sort = JSON.parse(sort);
    const items = await ctx.model.Message.find({ creator: app.mongoose.Types.ObjectId(userId), doDel: null })
      .populate([
        { path: 'creator', select: 'nickname avatar' },
        // { path: 'reply.creator', select: 'nickname avatar' },
        // { path: 'reply.toUser', select: 'nickname avatar' },
      ])
      .sort(sort)
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize)
      .lean();
    // 除去已删除的评论
    items.forEach(item => {
      if (item.reply && item.reply.length) {
        ctx._.remove(item.reply, reply => reply.isDel !== false);
      }
      item.children = item.reply;
    });

    const total = await ctx.model.Message.count({ creator: userId, isDel: false, doDel: null });
    return { items, total };
  }

  /**
   * 获取5条没有评论的留言
   * @return {Promise<void>} 5条没有评论的留言
   */
  async getNotCommentMessage() {
    const { ctx } = this;
    const message = await ctx.model.Message.aggregate([
      {
        $match: {
          doDel: null,
        },
      },
      {
        $lookup: {
          from: 'Comment',
          localField: '_id',
          foreignField: 'messageId',
          as: 'comments',
        },
      },
      {
        $match: { comments: [] },
      },
      {
        $limit: 5,
      },
    ]);
    return message;
  }

}

module.exports = MessageService;
