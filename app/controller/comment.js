'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  /**
   *  增加评论方法
   * @return {Promise<void>} 消息
   */
  async createComment() {
    const { ctx } = this;
    const data = ctx.validate({
      messageId: ctx.helper.validateObj('_id').required(),
      commentId: ctx.helper.validateObj('_id'),
      toUser: ctx.helper.validateObj('_id')
        .required(),
      content: ctx.Joi.string().max(1024)
        .required(),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.response.body = await ctx.service.comment.createComment(data);
  }

  // 删除评论
  async deleteComment() {
    const { ctx } = this;
    const data = ctx.validate({
      id: ctx.helper.validateObj('_id').required(),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.response.body = await ctx.service.comment.deleteMessage(data);
  }

  // 编辑留言或者评论
  async updateComment() {
    const { ctx } = this;
    const data = ctx.validate({
      id: ctx.helper.validateObj('_id')
        .required(),
      content: ctx.Joi.string().max(1024)
        .required(),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.response.body = await ctx.service.comment.updateComment(data);
  }


  /**
   * 获取用户评论列表
   * @return {Promise<void>}
   */
  async getReplyListByUserId() {
    const { ctx } = this;
    const data = ctx.validate({
      id: ctx.helper.validateObj('_id').required(),
      sort: ctx.Joi.string().default('{"createTime":-1}'),
      pageSize: ctx.Joi.number().default(10),
      pageIndex: ctx.Joi.number().default(1),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.body = await ctx.service.comment.getCommentListByUserId(data);
  }

}

module.exports = CommentController;
