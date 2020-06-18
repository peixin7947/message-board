'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class UserController extends Controller {
  // 注册用户
  async create() {
    const { ctx } = this;
    const user = {
      userName: ctx.request.body.userName,
      password: ctx.request.body.password,
    };
    const res = await ctx.service.user.addUser(user);
    ctx.body = res;
  }

  // 获取当前用户的个人信息
  async getUserInformation() {
    const { ctx } = this;
    ctx.response.body = await ctx.service.user.getUserInformation();
  }

  // 更新当前用户的个人信息
  async updateUserInformation() {
    const { ctx } = this;
    const data = Object.assign({}, ctx.request.body, ctx.params, ctx.query);
    ctx.response.body = await ctx.service.user.updateUserInformation(data);
  }

  /**
   * 上传头像方法
   * @return {Promise<void>}
   */
  async uploadAvatar() {
    const { ctx } = this;
    // let file = ctx.request.files[0];
    // // 读取文件
    // file = fs.readFileSync(file.filepath);
    // const target = path.join('./', 'uploadfile/test.png');
    // fs.writeFileSync(target, file);
    const stream = await ctx.getFileStream();
    // stream对象也包含了文件名，大小等基本信息
    const filename = '/static/uploadAvatar/' + new Date().getTime()
      + '-' + Math.floor(Math.random() * 100000) + '-' + stream.filename;
    // 创建文件写入路径
    const target = path.join('./app/public', filename);
    // 创建文件写入流
    const fileStream = fs.createWriteStream(target);
    try {
      // 以管道方式写入流
      await stream.pipe(fileStream);
    } catch (e) {
      ctx.body = { status: 422, msg: '上传头像失败' };
      return;
    }
    ctx.body = { status: 0, data: { url: filename } };
  }

}

module.exports = UserController;
