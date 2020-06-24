'use strict';

const Service = require('egg').Service;
class MessageService extends Service {
  async login(username, password) {
    const result = await this.ctx.model.User.findOne({ username, password: md5(password) })
      .lean();
    return result;
  }

}
module.exports = MessageService;
