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

}
module.exports = UserController;
