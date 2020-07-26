'use strict';
const Service = require('egg').Service;
const md5 = require('js-md5');
class UserService extends Service {
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
   * 获取他人信息
   * @param {Object} data 参数体
   * @return {Promise<void>} 返回用户信息
   */
  async getInformationById(data) {
    const { ctx } = this;
    const { id } = data;
    const user = await ctx.model.User.findOne({ _id: id }, 'nickname sex avatar intro age').lean();
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
    const { oldPassword, password, rePassword } = data;
    if (password) {
      if (String(rePassword) !== String(password)) {
        return { msg: '两次输入的密码不一致' };
      }
      const user = await ctx.model.User.findOne({ _id: userInfo._id, password: md5(oldPassword) }).lean();
      if (!user) {
        return { msg: '原密码输入错误' };
      }
      data.password = md5(password);
    }
    await ctx.model.User.updateOne({ _id: userInfo._id }, data);
    return { msg: '修改成功' };
  }

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
    const { username, password, email, rePassword } = data;
    if (password !== rePassword) {
      return { msg: '两次输入的密码不一致' };
    }
    const user = await ctx.model.User.findOne({ username });
    if (!user) {
      return { msg: '用户不存在' };
    }
    if (user.email !== email) {
      return { msg: '输入邮箱不正确' };
    }
    user.password = md5(password);
    user.save();
    return { msg: '修改密码成功' };
  }
}

module.exports = UserService;
