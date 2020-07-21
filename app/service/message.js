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
    const items = await ctx.model.Message.find(Object.assign({ isDel: false, doDel: null }, filter))
      .populate([
        { path: 'creator', select: 'nickname avatar' },
        // { path: 'reply.creator', select: 'nickname avatar' },
        // { path: 'reply.toUser', select: 'nickname avatar' },
      ])
      .sort(sort)
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize)
      .lean();
    // // 除去已删除的评论
    // items.forEach(item => {
    //   // item.content = ctx.helper.escape(item.content);
    //   if (item.reply && item.reply.length) {
    //     ctx._.remove(item.reply, reply => reply.isDel !== false);
    //   }
    //   item.children = item.reply;
    // });

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
        { path: 'reply.creator', select: 'nickname avatar' },
        { path: 'reply.toUser', select: 'nickname avatar' },
      ])
      .lean();
    // 除去已删除的评论
    message.content = ctx.helper.escape(message.content);
    if (message.reply && message.reply.length) {
      ctx._.remove(message.reply, reply => reply.isDel !== false);
    }
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
   *  增加评论
   * @param {Object} data 参数体
   * @return {Promise<{msg: string}>} 返回消息
   */
  async createReply(data) {
    const { ctx } = this;
    const { toUser, content, messageId } =
      data;
    const userInfo = ctx.session.userInfo;
    const message = await ctx.model.Message.findOne({ $or: [{ _id: String(messageId) }, { 'reply._id': messageId }], isDel: false, doDel: null });
    if (!message) {
      ctx.code = 1;
      return { msg: '留言评论不存在' };
    }
    message.reply.push({ creator: userInfo._id, content, toUser });
    message.save();
    return { msg: '发布留言成功' };
  }

  /**
   * 删除留言或评论
   * @param {Object} data 参数体
   * @return {Promise<{msg: string}>} 返回消息
   */
  async deleteMessage(data) {
    const { ctx } = this;
    const { id } = data;
    const userInfo = ctx.session.userInfo;
    const message = await ctx.model.Message.findOne({ $or: [{ _id: id }, { 'reply._id': id }], isDel: false, doDel: null });
    if (!message) return { msg: '留言不存在或已被删除' };
    // 如果是留言
    if (String(message._id) === String(id)) {
      if (String(message.creator) !== String(userInfo._id)) {
        ctx.code = 1;
        return { msg: '无权删除' };
      }
      message.isDel = true;
      message.doDel = { userId: userInfo._id };
    } else {
      const reply = message.reply.find(item => String(item._id) === String(id));
      if (String(reply.creator) !== String(userInfo._id)
        && String(message.creator) !== String(userInfo._id)) {
        ctx.code = 1;
        return { msg: '无权删除' };
      }
      reply.isDel = true;
      reply.doDel = { userId: userInfo._id };
    }
    message.save();
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
    const { id, content, title } = data;
    const userInfo = ctx.session.userInfo;
    const message = await ctx.model.Message.findOne(
      { $or: [{ _id: id }, { 'reply._id': id }], isDel: false, doDel: null });
    // 如果留言或消息不存在
    if (!message) {
      ctx.code = 1;
      return { msg: '留言或评论不存在' };
    }
    if (String(message._id) === String(id)) {
      if (String(message.creator) !== String(userInfo._id)) {
        ctx.code = 1;
        return { msg: '不可编辑非自己的留言' };
      }
      message.content = content;
      message.title = title;
      message.updateTime = new Date();
    } else {
      const reply = message.reply.find(item => String(item._id) === String(id));
      if (String(reply.creator) !== String(userInfo._id)) {
        ctx.code = 1;
        return { msg: '不可编辑非自己的留言' };
      }
      reply.content = content;
    }
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
    const items = await ctx.model.Message.find({ creator: app.mongoose.Types.ObjectId(userId), isDel: false, doDel: null })
      .populate([
        { path: 'creator', select: 'nickname avatar' },
        { path: 'reply.creator', select: 'nickname avatar' },
        { path: 'reply.toUser', select: 'nickname avatar' },
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
   *  获取用户的评论
   * @param {Object} data 参数体
   * @return {Promise<{total: number, items: []}>} 回复的数据和总量
   */
  async getReplyListByUserId(data) {
    const { ctx, app } = this;
    let { id, sort, pageSize, pageIndex } = data;
    sort = JSON.parse(sort);
    const message = await ctx.model.Message.find({ 'reply.creator': app.mongoose.Types.ObjectId(id), isDel: false })
      .populate([
        { path: 'creator', select: 'nickname avatar' },
        { path: 'reply.creator', select: 'nickname avatar' },
        { path: 'reply.toUser', select: 'nickname avatar' },
      ])
      .sort(sort)
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize)
      .lean();
    let items = [];
    message.forEach(item => {
      items = ctx._.union(items, item.reply.filter(reply => String(reply.creator._id) === String(id)));
    });

    return { items, total: items.length };
  }
}

module.exports = MessageService;
