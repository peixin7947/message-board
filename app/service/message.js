'use strict';

const Service = require('egg').Service;
class MessageService extends Service {

  /**
   * 获取用户的留言
   * @param data
   * @return {Promise<{list}>}
   */
  async getMessageById(data) {
    const { ctx } = this;
    let { sort, pageSize, pageIndex } = data;
    sort = JSON.parse(sort);
    const list = await ctx.model.Message.find({ isDel: false, doDel: null }).populate([
      { path: 'creator', select: 'nickname avatar' },
      { path: 'reply.creator', select: 'nickname avatar' },
      { path: 'reply.toUser', select: 'nickname avatar' },
    ])
      .sort(sort)
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize);
    return { list };
  }

  async createMessage(data) {
    const { ctx } = this;
    const { id, content } = data;
    const userInfo = ctx.session.userInfo;
    await ctx.model.Message.create({ userId: id, creator: userInfo._id, content });
    return { msg: '发布留言成功' };
  }

}
module.exports = MessageService;
