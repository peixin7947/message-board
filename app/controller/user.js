'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {
  async create() {
    const { ctx } = this;
    const user = {
      userName: ctx.request.body.userName,
      password: ctx.request.body.password,
    };
    console.log(user);
    const res = await ctx.service.user.addUser(user);
    ctx.body = res;
  }

  // 获取当前用户的个人信息
  async getUserInformation() {
    const { ctx } = this;
    ctx.response.body = await ctx.service.user.getUserInformation();
  }
  // 更新当前用户的个人信息
  async updateUserInformation() {
    const { ctx } = this;
    ctx.response.body = await ctx.service.user.updateUserInformation();
  }

  async uploadAvatar() {
    const { ctx } = this;
    ctx.response.body = await ctx.service.user.uploadAvatar();
  }

}
module.exports = UserController;
