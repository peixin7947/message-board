'use strict';
const Controller = require('egg').Controller;
const md5 = require('js-md5');
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
    ctx.body = await ctx.service.auth.login(data);
  }

  // 用户注册
  async register() {
    const { ctx } = this;
    // 参数校验
    const data = ctx.validate({
      username: ctx.Joi.string().min(3).max(24)
        .trim()
        .required(),
      password: ctx.Joi.string().min(6).max(24)
        .trim()
        .required(),
      rePassword: ctx.Joi.string().min(6).max(24)
        .trim()
        .required(),
      email: ctx.Joi.string().email().required(),
    }, Object.assign({}, ctx.params, ctx.query, ctx.request.body));

    const userObj = await ctx.model.User.findOne({ username: data.username });
    if (userObj) {
      ctx.body = { msg: '用户名已存在' };
      return;
    }
    data.nickname = data.username;
    data.password = md5(data.password);
    await this.ctx.model.User.create(data);
    ctx.response.body = { msg: '注册成功' };
  }

  // 用户退出登录
  async logout() {
    const { ctx } = this;
    ctx.rotateCsrfSecret();
    ctx.session.userInfo = null;
    ctx.body = { msg: '已退出登录' };
  }

  // 重置密码
  async resetPassword() {
    const { ctx } = this;
    // 参数校验
    const data = ctx.validate({
      username: ctx.Joi.string().min(3).max(24)
        .trim()
        .required(),
      email: ctx.Joi.string().email().required(),
      password: ctx.Joi.string().min(6).max(24)
        .trim()
        .required(),
    }, Object.assign({}, ctx.params, ctx.query, ctx.request.body));
    ctx.body = await ctx.service.user.resetPassword(data);
  }

}

module.exports = AuthController;
