'use strict';

const Service = require('egg').Service;

class CommentService extends Service {

  /**
   *  留言增加评论
   * @param {Object} data 参数体
   * @return {Promise<{msg: string}>} 返回消息
   */
  async createComment(data) {
    const { ctx } = this;
    const { toUser, content, messageId, commentId } =
      data;
    const userInfo = ctx.session.userInfo;
    const creator = userInfo._id;
    const message = await ctx.model.Message.findOne({ _id: String(messageId), doDel: null });
    if (!message) {
      return { msg: '留言不存在' };
    }
    // 2级评论
    if (commentId) {
      const comment = await ctx.model.Comment.findOne({ _id: commentId, doDel: null });
      comment.reply.push({ content, toUser, creator });
      comment.save();
    } else {
      await ctx.model.Comment.create({ messageId, toUser, content, creator });
    }
    return { msg: '评论成功' };
  }

  /**
   * 编辑评论
   * @param data
   * @return {Promise<{msg: string}>}
   */
  async updateComment(data) {
    const { ctx } = this;
    const { id, content } = data;
    const userInfo = ctx.session.userInfo;
    const comment = await ctx.model.Comment.findOne({ _id: id, doDel: null });
    // 如果留言或消息不存在
    if (!comment) {
      return { msg: '评论不存在' };
    }
    if (String(comment.creator) !== String(userInfo._id)) {
      return { msg: '不可编辑非自己的评论' };
    }
    comment.content = content;
    comment.updateTime = new Date();
    comment.save();
    return { msg: '修改成功' };
  }

  /**
   *  获取用户的评论
   * @param {Object} data 参数体
   * @return {Promise<{total: number, items: []}>} 回复的数据和总量
   */
  async getCommentListByUserId(data) {
    const { ctx, app } = this;
    let { id, sort, pageSize, pageIndex } = data;
    sort = JSON.parse(sort);
    const comment = await ctx.model.Comment.find({ creator: app.mongoose.Types.ObjectId(id), doDel: null })
      .populate([
        { path: 'creator', select: 'nickname avatar' },
      ])
      .sort(sort)
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize)
      .lean();
    const total = await ctx.model.Comment.count({ creator: app.mongoose.Types.ObjectId(id), doDel: null });
    return { items: comment, total };
  }
}

module.exports = CommentService;
