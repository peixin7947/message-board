'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');

class UserController extends Controller {

  // 获取当前用户的个人信息
  async getUserInformation() {
    const { ctx } = this;
    ctx.response.body = await ctx.service.user.getUserInformation();
  }

  // 获取其他用户的个人信息
  async getInformationById() {
    const { ctx } = this;
    const data = ctx.validate({
      id: ctx.helper.validateObj('_id'),
    }, Object.assign(ctx.params));
    ctx.response.body = await ctx.service.user.getInformationById(data);
  }

  // 更新当前用户的个人信息
  async updateUserInformation() {
    const { ctx } = this;
    // 参数校验
    const data = ctx.validate({
      nickname: ctx.Joi.string().min(3).max(18),
      email: ctx.Joi.string().email(),
      avatar: ctx.Joi.string(),
      sex: [ 1, 0 ],
      intro: ctx.Joi.string().max(256).allow(''),
      age: ctx.Joi.number().integer().min(0)
        .max(120),
      password: ctx.Joi.string().min(6).max(24),
      oldPassword: ctx.Joi.string().min(6).max(24),
      rePassword: ctx.Joi.string().min(6).max(24),
    });
    ctx.response.body = await ctx.service.user.updateUserInformation(data);
  }

  /**
   * 上传头像方法
   * @return {Promise<void>} 返回消息
   */
  async uploadAvatar() {
    const { ctx } = this;
    // 获取上传的文件
    const stream = await ctx.getFileStream();
    // stream对象也包含了文件名，大小等基本信息
    const filename = '/static/uploadAvatar/' + new Date().getTime()
      + '-' + Math.floor(Math.random() * 100000) + '-' + stream.filename;
    // 创建文件写入路径
    const target = path.join('./app/public', filename);
    try {
      // 创建文件写入流
      const fileStream = fs.createWriteStream(target);
      // 以管道方式写入流
      await stream.pipe(fileStream);
    } catch (e) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      ctx.code = 1;
      ctx.body = { msg: '上传头像失败' };
    }
    ctx.body = { url: filename };
  }
}

module.exports = UserController;
