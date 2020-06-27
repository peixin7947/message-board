'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
  /**
   * 获取当前的留言
   * @param {string} 用户id
   * @return {Promise<void>}
   */
  async listMessage() {
    const { ctx } = this;
    const data = ctx.validate({
      sort: ctx.Joi.string().default('{"createTime":-1}'),
      pageSize: ctx.Joi.number().default(10),
      pageIndex: ctx.Joi.number().default(1),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.body = await ctx.service.message.listMessage(data);
  }

  /**
   * 发布留言
   * @return {Promise<void>}
   */
  async createMessage() {
    const { ctx } = this;
    const data = ctx.validate({
      id: ctx.helper.validateObj('_id').required(),
      content: ctx.Joi.string().required(),
      title: ctx.Joi.string().required(),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.response.body = await ctx.service.message.createMessage(data);
  }

  async createReply() {
    const { ctx } = this;
    const data = ctx.validate({
      messageId: ctx.helper.validateObj('_id')
        .required(),
      toUser: ctx.helper.validateObj('_id')
        .required(),
      content: ctx.Joi.string()
        .required(),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.response.body = await ctx.service.message.createReply(data);
  }

  async deleteMessage() {
    const { ctx } = this;
    const data = ctx.validate({
      messageId: ctx.helper.validateObj('_id'),
      // 评论为空时，删除留言
      replyId: ctx.helper.validateObj('_id').allow(''),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.response.body = await ctx.service.message.deleteMessage(data);
  }

}

module.exports = MessageController;
