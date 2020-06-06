'use strict';
const Joi = require('joi');
const Controller = require('egg').Controller;

class AuthController extends Controller {
  async login() {
    return;
  }

  async register() {
    const { ctx } = this;
    const user = ctx.request.body;
    if (!user.password || !user.repassword) {
      await ctx.render('/home/register.tpl', { message: '密码不能为空' });
      return;
    } else if (user.password !== user.repassword) {
      await ctx.render('/home/register.tpl', { message: '2次输入的密码不一致' });
      return;
    }
    const schema = Joi.object({
      username: Joi.string().min(3).max(30)
        .required(),
      password: Joi.string().min(6).max(30)
        .required(),
    });
    const check = Joi.validate({
      username: user.username,
      password: user.password,
    }, schema);
    let message = '';
    if (check.error !== null) {
      ctx.response.body = '<script language=javascript>alert("注册失败!!请检查输入的数据是否正确。' + check.error + '");window.window.location.href="/register/view";</script>';
      return;
    }
    const userObj = await ctx.service.user.findOne({ username: user.username });
    if (userObj) {
      message = '用户名已存在';
      await ctx.render('/home/register.tpl', { message });
      return;
    }
    await ctx.service.user.addUser(user);
    message = '<script language=javascript>alert("注册成功!!!");window.window.location.href="/";</script>';


    ctx.response.body = message;
  }

}

module.exports = AuthController;
