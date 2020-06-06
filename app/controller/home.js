'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async login() {
    await this.ctx.render('home/login.tpl');
  }

  async register() {
    await this.ctx.render('home/register.tpl');
  }

}

module.exports = HomeController;
