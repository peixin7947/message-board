'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async login() {
    await this.ctx.render('auth/login.tpl');
  }

  async register() {
    await this.ctx.render('auth/register.tpl');
  }

  async urlToView() {
    const { ctx } = this;
    const { url } = ctx.query;
    if (url === 'information') {
      await ctx.renderView('home/information.tpl');
      return;
    }
    // ctx.body = await ctx.render('home/messageBoard.tpl', data);
    // ctx.body = { status: 0 };
  }

}

module.exports = HomeController;
