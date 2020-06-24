'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.response._prue = true;
    await this.ctx.render('auth/login.tpl');
  }

  async register() {
    const { ctx } = this;
    ctx.response._prue = true;
    await this.ctx.render('auth/register.tpl');
  }

  // 首页跳转
  async index() {
    const { ctx } = this;
    const userInfo = ctx.session.userInfo;
    // 已经登录
    if (userInfo) {
      return ctx.redirect('/html/information.html');
    }
    return ctx.redirect('/login/view');
  }

}

module.exports = HomeController;
