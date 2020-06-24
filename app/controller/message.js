'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
  /**
   * 获取当前用户的留言
   * @param {string} 用户id
   * @return {Promise<void>}
   */
  async listMessage() {
    const { ctx } = this;
    // const userInfo = ctx.session.userInfo;
    const data = ctx.validate({
      sort: ctx.Joi.string().default('{"createTime":-1}'),
      pageSize: ctx.Joi.number().default(10),
      pageIndex: ctx.Joi.number().default(1),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.body = await ctx.service.message.getMessageById(data);
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
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.response.body = await ctx.service.message.createMessage(data);
  }
}

module.exports = MessageController;
