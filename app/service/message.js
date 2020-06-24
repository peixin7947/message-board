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
    // const items = await ctx.model.Message.find({ isDel: false, doDel: null })
    //   .populate([
    //     { path: 'creator', select: 'nickname avatar' },
    //     { path: 'reply.creator', select: 'nickname avatar' },
    //     { path: 'reply.toUser', select: 'nickname avatar' },
    //   ])
    //   .sort(sort)
    //   .skip((pageIndex - 1) * pageSize)
    //   .limit(pageSize);

    // todo 修改聚合查询
    const items = await ctx.model.Message.aggregate([
      {
        $match: { isDel: false, doDel: null },
      },
      {
        $lookup: {
          from: 'User',
          localField: 'creator',
          foreignField: '_id',
          as: 'doc',
        },
      },
      {
        $project: {
          'doc.nickname': 1,
          'doc.avatar': 1,
        },
      },
    ]);

    return { items };
  }

  async createMessage(data) {
    const { ctx } = this;
    const { title, content } = data;
    const userInfo = ctx.session.userInfo;
    await ctx.model.Message.create({ creator: userInfo._id, content, title });
    return { msg: '发布留言成功' };
  }

}

module.exports = MessageService;
