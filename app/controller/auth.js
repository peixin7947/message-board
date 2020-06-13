'use strict';
const Controller = require('egg').Controller;

class AuthController extends Controller {
  // 登录验证
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    if (username && password) {
      const user = await ctx.service.auth.login(username, password);
      if (user) {
        ctx.session[this.config.login.LOGIN_FIELD] = user;
        // 调用 rotateCsrfSecret 刷新用户的 CSRF token
        ctx.rotateCsrfSecret();
        ctx.response.body = await ctx.renderView('index.html');
        return;
      }
    }
    await ctx.render('/home/login.tpl', { message: '输入用户名密码错误' });
  }

  async register() {
    const { ctx } = this;
    // 参数校验
    const user = ctx.request.body;
    if (!user.password || !user.rePassword) {
      await ctx.render('/home/register.tpl', { message: '密码不能为空' });
      return;
    } else if (user.password !== user.rePassword) {
      await ctx.render('/home/register.tpl', { message: '2次输入的密码不一致' });
      return;
    }
    const value = ctx.validate({
      username: ctx.Joi.string().min(3).max(30)
        .required(),
      password: ctx.Joi.string().min(6).max(30)
        .required(),
      rePassword: ctx.Joi.string().min(6).max(30)
        .required(),
    }, Object.assign(ctx.params, ctx.query, ctx.request.body));
    let message = '';
    if (value.errors) {
      await ctx.render('/home/register.tpl', { message: '注册失败!!请检查输入的数据格式是否正确。' });
      return;
    }

    const userObj = await ctx.model.User.findOne({ username: user.username });
    if (userObj) {
      message = '用户名已存在';
      await ctx.render('/home/register.tpl', { message });
      return;
    }
    await ctx.service.user.addUser(user);
    message = '<script language=javascript>alert("注册成功!!!");window.location.href="/";</script>';
    ctx.response.body = message;
  }

}

module.exports = AuthController;
