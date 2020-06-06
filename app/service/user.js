'use strict';
const Service = require('egg').Service;
const md5 = require('js-md5');
class UserService extends Service {
  async findUser() {
    const result = await this.ctx.model.User.find();
    return result;
  }

  async addUser(user) {
    new this.ctx.model.User({
      username: user.username,
      password: md5(user.password),
    }).save();
  }

  async updateUser(user) {
    const result = await this.ctx.model.User.updateOne(user);
    return result;
  }

  async deleteUser(user) {
    const result = await this.ctx.model.User.deleteOne(user);
    return result;
  }

  async findOne(user) {
    const result = await this.ctx.model.User.findOne(user).lean();
    return result;
  }

}

module.exports = UserService;
