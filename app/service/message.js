'use strict';

const Service = require('egg').Service;

class MessageService extends Service {

  /**
   * 获取用户的留言
   * @param data
   * @return {Promise<{list}>}
   */
  async listMessage(data) {
    const { ctx } = this;
    let { sort, pageSize, pageIndex } = data;
    sort = JSON.parse(sort);
    const items = await ctx.model.Message.find({ isDel: false, doDel: null })
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
    const total = await ctx.model.Message.count({ isDel: false, doDel: null });
    return { items, total };
  }

  /**
   *  发布一个留言
   * @param data
   * @param {String} title 留言标题
   * @param {String} content 留言内容
   * @return {Promise<{msg: string}>}
   */
  async createMessage(data) {
    const { ctx } = this;
    const { title, content } = data;
    const userInfo = ctx.session.userInfo;
    await ctx.model.Message.create({ creator: userInfo._id, content, title });
    return { msg: '发布留言成功' };
  }

  /**
   *  增加评论
   * @param data
   * @return {Promise<{msg: string}>}
   */
  async createReply(data) {
    const { ctx } = this;
    const { toUser, content, messageId } =
      data;
    const userInfo = ctx.session.userInfo;
    const message = await ctx.model.Message.findOne({ $or: [{ _id: messageId }, { 'reply._id': messageId }], isDel: false, doDel: null });
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
   * @param data
   * @return {Promise<{msg: string}>}
   */
  async deleteMessage(data) {
    const { ctx } = this;
    const { id } = data;
    const userInfo = ctx.session.userInfo;
    const message = await ctx.model.Message.findOne({ $or: [{ _id: id }, { 'reply._id': id }], isDel: false, doDel: null });
    if (!message) return { msg: '留言不存在或已被删除' };
    // 如果是留言
    if (String(message._id) === String(id)) {
      if (String(message.creator) !== userInfo._id) {
        ctx.code = 1;
        return { msg: '无权删除' };
      }
      message.isDel = true;
      message.doDel = { userId: userInfo._id };
    } else {
      const reply = message.reply.find(item => String(item._id) === String(id));
      if (String(reply.creator) !== userInfo._id && String(message.creator) !== userInfo._id) {
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
   * @param data
   * @param{String} id 留言评论id
   * @param{String} content 留言评论的内容
   * @param{String} title 留言的主题
   * @return {Promise<{msg: string}>}
   */
  async updateMessage(data) {
    const { ctx } = this;
    const { id, content, title } = data;
    const userInfo = ctx.session.userInfo;
    const message = await ctx.model.Message.findOne({ $or: [{ _id: id }, { 'reply._id': id }], isDel: false, doDel: null });
    // 如果留言或消息不存在
    if (!message) {
      ctx.code = 1;
      return { msg: '留言或评论不存在' };
    }
    if (String(message._id) === id) {
      if (String(message.creator) !== userInfo._id) {
        ctx.code = 1;
        return { msg: '不可编辑非自己的留言' };
      }
      message.content = content;
      message.title = title;
      message.updateTime = new Date();
    } else {
      const reply = message.reply.find(item => String(item.creator._id) === userInfo._id);
      if (String(reply.creator) !== userInfo._id) {
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
   * @param data
   * @return {Promise<{total, items}>}
   */
  async getMessageListByUserId(data) {
    const { ctx, app } = this;
    let { id, sort, pageSize, pageIndex } = data;
    sort = JSON.parse(sort);
    const items = await ctx.model.Message.find({ creator: app.mongoose.Types.ObjectId(id), isDel: false, doDel: null })
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

    const total = await ctx.model.Message.count({ creator: id, isDel: false, doDel: null });
    return { items, total };
  }

  /**
   *  获取用户的评论
   * @param data
   * @return {Promise<{total: number, items: []}>}
   */
  async getReplyListByUserId(data) {
    const { ctx, app } = this;
    let { id, sort, pageSize, pageIndex } = data;
    sort = JSON.parse(sort);
    const message = await ctx.model.Message.find({ 'reply.creator': app.mongoose.Types.ObjectId(id), isDel: false, doDel: null })
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
      items = ctx._.union(items, item.reply.filter(reply => String(reply.creator._id) === id));
    });

    return { items, total: items.length };
  }
}

module.exports = MessageService;
