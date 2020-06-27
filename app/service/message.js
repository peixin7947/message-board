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
    items.forEach(item => {
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

  async createReply(data) {
    const { ctx } = this;
    const { toUser, content, messageId } = data;
    const userInfo = ctx.session.userInfo;
    await ctx.model.Message.updateOne({ _id: messageId },
      { $push: { reply: { creator: userInfo._id, content, toUser } } });
    return { msg: '发布留言成功' };
  }

  async deleteMessage(data) {
    const { ctx } = this;
    const { replyId, messageId } = data;
    const userInfo = ctx.session.userInfo;
    if (replyId) {
      const res = await ctx.model.Message.updateOne({ _id: messageId, 'reply._id': replyId, 'reply.creator': userInfo._id },
        { reply: { isDel: true, doDel: { userId: userInfo._id } } });
      console.log(res);
    } else {
      await ctx.model.Message.updateOne({ _id: messageId }, { isDel: true, doDel: { userId: userInfo._id } });
    }
    return { msg: '删除成功' };
  }

}

module.exports = MessageService;
