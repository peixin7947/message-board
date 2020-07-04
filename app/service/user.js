'use strict';
const Service = require('egg').Service;
const md5 = require('js-md5');
class UserService extends Service {
  /**
   * 增加一个用户
   * @param {Object} user 用户
   * @return {Promise<void>} 无需返回
   */
  // async addUser(user) {
  //   await this.ctx.model.User({
  //     username: user.username,
  //     password: md5(user.password),
  //     nickname: user.username,
  //   }).save();
  // }

  /**
   * 获取当前用户信息
   * @return {Promise<void>} 用户实体
   */
  async getUserInformation() {
    const { ctx } = this;
    const userInfo = ctx.session.userInfo;
    const user = await ctx.model.User.findOne({ _id: userInfo._id }).lean();
    user.userId = user._id;
    return user;
  }

  /**
   * 修改用户信息
   * @param {Object} data 参数体
   * @return {Promise<{msg: string}>} 返回消息
   */
  async updateUserInformation(data) {
    const { ctx } = this;
    const userInfo = ctx.session.userInfo;
    // 如果是修改密码
    const { oldPassword, password } = data;
    if (password) {
      const user = await ctx.model.User.findOne({ _id: userInfo._id, password: md5(oldPassword) }).lean();
      if (!user) {
        ctx.code = 2;
        return { msg: '原密码输入错误' };
      }
      data.password = md5(password);
    }
    await ctx.model.User.updateOne({ _id: userInfo._id }, data);
    return { msg: '修改成功' };
  }

  /**
   * 修改用户密码
   * @param {Object} data 参数体
   * @return {Promise<{msg: string}>} 返回消息
   */
  // async updateUserPassword(data) {
  //   const { ctx } = this;
  //   const { id, password, newPassword } = data;
  //   await ctx.model.User.findOneAndUpdate({ _id: id, password: md5(password) }, { password: newPassword });
  //   return { msg: '修改密码成功' };
  // }


  /**
   * 重置用户密码
   * @param {Object} data 参数体
   * @param {String} data.username 用户名
   * @param {String} data.email 用户邮箱
   * @param {String} data.password 用户密码
   * @return {Promise<{msg: string}>} 返回类型
   */
  async resetPassword(data) {
    const { ctx } = this;
    const { username, password, email } = data;
    const user = await ctx.model.User.findOne({ username });
    if (!user) {
      ctx.code = 1;
      return { msg: '用户不存在' };
    }
    if (user.email !== email) {
      ctx.code = 1;
      return { msg: '输入邮箱不正确' };
    }
    user.password = md5(password);
    user.save();
    return { msg: '修改密码成功' };
  }
}

module.exports = UserService;
