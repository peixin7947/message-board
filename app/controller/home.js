'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 得到服务器时间，初始化csrf用
  async time() {
    this.ctx.body = Date();
  }

  // 首页跳转
  async index() {
    const { ctx } = this;
    const userInfo = ctx.session.userInfo;
    // 已经登录
    if (userInfo) {
      return ctx.redirect('/index.html#/messageBoard');
    }
    return ctx.redirect('/index.html');
  }

}

module.exports = HomeController;
