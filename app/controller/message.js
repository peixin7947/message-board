'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
  /**
   * 获取当前的留言
   * @return {Promise<void>} 返回留言列表
   */
  async listMessage() {
    const { ctx } = this;
    const data = ctx.validate({
      sort: ctx.Joi.string().default('{"createTime":-1}'),
      pageSize: ctx.Joi.number().default(10),
      pageIndex: ctx.Joi.number().default(1),
      keyword: ctx.Joi.string().allow(''),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.body = await ctx.service.message.listMessage(data);
  }

  /**
   * 获取留言详情
   * @return {Promise<void>} 返回留言列表
   */
  async getMessageById() {
    const { ctx } = this;
    const data = ctx.validate({
      id: ctx.helper.validateObj('_id').required(),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.body = await ctx.service.message.getMessageById(data);
  }

  /**
   * 发布留言
   * @return {Promise<void>} 消息
   */
  async createMessage() {
    const { ctx } = this;
    const data = ctx.validate({
      content: ctx.Joi.string().max(1024)
        .required(),
      title: ctx.Joi.string().min(3).max(30)
        .required(),
      tag: [ '分享', '问答' ],
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.response.body = await ctx.service.message.createMessage(data);
  }

  /**
   *  增加评论方法
   * @return {Promise<void>} 消息
   */
  async createReply() {
    const { ctx } = this;
    const data = ctx.validate({
      messageId: ctx.helper.validateObj('_id')
        .required(),
      toUser: ctx.helper.validateObj('_id')
        .required(),
      content: ctx.Joi.string().max(1024)
        .required(),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.response.body = await ctx.service.message.createReply(data);
  }

  // 删除留言或者评论
  async deleteMessage() {
    const { ctx } = this;
    const data = ctx.validate({
      id: ctx.helper.validateObj('_id').required(),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.response.body = await ctx.service.message.deleteMessage(data);
  }

  // 编辑留言或者评论
  async updateMessage() {
    const { ctx } = this;
    const data = ctx.validate({
      id: ctx.helper.validateObj('_id')
        .required(),
      content: ctx.Joi.string().max(1024)
        .required(),
      tag: ctx.Joi.string(),
      title: ctx.Joi.string().max(30).allow(''),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.response.body = await ctx.service.message.updateMessage(data);
  }

  /**
   * 获取用户的留言列表
   * @return {Promise<void>} 留言列表
   */
  async getMessageListByUserId() {
    const { ctx } = this;
    const data = ctx.validate({
      userId: ctx.helper.validateObj('_id').required(),
      sort: ctx.Joi.string().default('{"createTime":-1}'),
      pageSize: ctx.Joi.number().default(6),
      pageIndex: ctx.Joi.number().default(1),
    }, Object.assign(ctx.params, ctx.request.body, ctx.query));
    ctx.body = await ctx.service.message.getMessageListByUserId(data);
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
    ctx.body = await ctx.service.message.getReplyListByUserId(data);
  }

}

module.exports = MessageController;
