'use strict';
const Service = require('egg').Service;
const md5 = require('js-md5');
class UserService extends Service {
  /**
   * 增加一个用户
   * @param user
   * @return {Promise<void>}
   */
  async addUser(user) {
    new this.ctx.model.User({
      username: user.username,
      password: md5(user.password),
    }).save();
  }

  async getUserInformation() {
    const { ctx } = this;
    // ctx.throw(422, 'test');
    const userInfo = ctx.session.userInfo;
    const user = await ctx.model.User.findOne({ _id: userInfo._id });
    return { status: 0, data: user };
  }


}

module.exports = UserService;
