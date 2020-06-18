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
    await this.ctx.model.User({
      username: user.username,
      password: md5(user.password),
      nickname: user.username,
    }).save();
  }

  /**
   * 获取当前用户信息
   * @return {Promise<{data, status: number}>}
   */
  async getUserInformation() {
    const { ctx } = this;
    const userInfo = ctx.session.userInfo;
    const user = await ctx.model.User.findOne({ _id: userInfo._id }).lean();
    // user.sex = (user.sex === 1 ? '男' : '女');
    return { status: 0, data: user };
  }


  async updateUserInformation(data) {
    const { ctx } = this;
    const userInfo = ctx.session.userInfo;
    const user = data.all;
    await ctx.model.User.updateOne({ _id: userInfo._id }, user);
    return { status: 0, msg: '修改成功' };
  }

  async uploadAvatar(imgBuffer) {
    const { ctx } = this;
    const userInfo = ctx.session.userInfo;
    ctx.model.User.updateOne({ _id: userInfo._id }, { avatar: imgBuffer });
  }

}

module.exports = UserService;
