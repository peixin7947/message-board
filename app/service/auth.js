'use strict';

const Service = require('egg').Service;
const md5 = require('js-md5');
class AuthService extends Service {
  async login(data) {
    const { username, password } = data;
    const result = await this.ctx.model.User.findOne({ username, password: md5(password) })
      .lean();
    return result;
  }

}
module.exports = AuthService;
