'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
  /**
   * 获取当前用户的留言
   * @param {string} 用户id
   * @return {Promise<void>}
   */
  async getUserMessageById() {
    const { ctx } = this;
    const userInfo = ctx.session.userInfo;
    const data = ctx.validate({
      id: ctx.helper.validataObj('_id').require(),
    });
    ctx.body = await ctx.service.message.getUserMessageById();
  }
}

module.exports = MessageController;
