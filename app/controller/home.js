'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async login() {
    const { ctx } = this;
    await ctx.render('html/login.html');
  }

  async register() {
    const { ctx } = this;
    await ctx.render('html/register.tpl');
  }

  // 首页跳转
  async index() {
    const { ctx } = this;
    const userInfo = ctx.session.userInfo;
    // 已经登录
    if (userInfo) {
      return ctx.redirect('/html/messageBoard.html');
    }
    return ctx.redirect('/html/login.html');
  }

}

module.exports = HomeController;
