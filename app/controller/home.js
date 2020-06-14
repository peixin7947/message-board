'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async login() {
    await this.ctx.render('auth/login.tpl');
  }

  async register() {
    await this.ctx.render('auth/register.tpl');
  }

}

module.exports = HomeController;
