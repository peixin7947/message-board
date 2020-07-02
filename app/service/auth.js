'use strict';

const Service = require('egg').Service;
const md5 = require('js-md5');
class AuthService extends Service {

  /**
   * 登录认证
   * @param {Object} data 参数体
   * @return {Promise<{msg: string}>} 返回提示消息
   */
  async login(data) {
    const { ctx } = this;
    const { username, password } = data;
    const user = await this.ctx.model.User.findOne({ username })
      .lean();
    if (!user) {
      ctx.code = 1;
      return { msg: '用户不存在' };
    }
    if (user.password === md5(password)) {
      ctx.session[this.config.login.LOGIN_FIELD] = user;
      // 调用 rotateCsrfSecret 刷新用户的 CSRF token
      ctx.rotateCsrfSecret();
      return { msg: '登录成功' };
    }
    ctx.code = 1;
    return { msg: '输入密码错误' };
  }
}
module.exports = AuthService;
