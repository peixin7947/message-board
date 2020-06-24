'use strict';
const Controller = require('egg').Controller;

class AuthController extends Controller {
  // 登录验证
  async login() {
    const { ctx } = this;
    // 参数校验
    const data = ctx.validate({
      username: ctx.Joi.string().min(3).max(24)
        .required(),
      password: ctx.Joi.string().min(6).max(24)
        .required(),
    }, Object.assign({}, ctx.params, ctx.query, ctx.request.body));
    const user = await ctx.service.auth.login(data);
    if (user) {
      ctx.session[this.config.login.LOGIN_FIELD] = user;
      // 调用 rotateCsrfSecret 刷新用户的 CSRF token
      ctx.rotateCsrfSecret();
      ctx.body = { msg: '登录成功' };
      return;
    }
    ctx.code = 1;
    ctx.body = { msg: '输入用户名密码错误' };
  }

  // 用户注册
  async register() {
    const { ctx } = this;
    ctx.response._prue = true;
    // 参数校验
    const data = ctx.validate({
      username: ctx.Joi.string().min(3).max(24)
        .required(),
      password: ctx.Joi.string().min(6).max(24)
        .required(),
      rePassword: ctx.Joi.string().min(6).max(24)
        .required(),
    }, Object.assign({}, ctx.params, ctx.query, ctx.request.body));

    const userObj = await ctx.model.User.findOne({ username: data.username });
    if (userObj) {
      ctx.code = 1;
      ctx.body = { msg: '用户名已存在' };
      return;
    }
    await ctx.service.user.addUser(data);
    ctx.response.body = { msg: '注册成功' };
  }

  // 用户退出登录
  async logout() {
    const { ctx } = this;
    ctx.rotateCsrfSecret();
    ctx.session.userInfo = null;
    ctx.body = { msg: '已退出登录' };
  }


}

module.exports = AuthController;
