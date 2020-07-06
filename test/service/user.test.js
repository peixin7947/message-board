'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('测试/service/user.test.js', () => {
  let that;
  let ctx;
  before(async function() {
    that = await require('../testconfig')();
    ctx = app.mockContext();
  });

  it('获取用户信息', async () => {
    ctx.session.userInfo = {
      _id: that.userId,
    };
    const result = await ctx.service.user.getUserInformation();
    assert(result);
  });

  describe('测试 updateUserInformation 方法', () => {
    it('修改成功', async () => {
      const ctx = app.mockContext();
      ctx.session.userInfo = {
        _id: that.userId,
      };
      let data = { };
      let result = await ctx.service.user.updateUserInformation(data);
      assert(result.msg = '修改成功');
      data = {
        oldPassword: 'test',
        password: 'test',
      };
      result = await ctx.service.user.updateUserInformation(data);
      assert(result.msg = '修改成功');
    });
    it('修改失败', async () => {
      const ctx = app.mockContext();
      ctx.session.userInfo = {
        _id: that.userId,
      };
      const data = {
        oldPassword: '1111111',
        password: 'test',
      };
      const result = await ctx.service.user.updateUserInformation(data);
      assert(result.msg = '原密码输入错误');
    });
  });

  describe('测试 resetPassword 方法', () => {
    it(' 修改失败', async () => {
      const ctx = app.mockContext();
      let data = {
        username: '不存在的用户',
        email: 'chaoguan@2980.com',
        password: '123123',
      };
      let result = await ctx.service.user.resetPassword(data);
      assert(result.msg = '用户不存在');

      data = {
        username: 'test',
        email: 'chaoguan01@2980.com',
        password: '123123',
      };
      result = await ctx.service.user.resetPassword(data);
      assert(result.msg = '输入邮箱不正确');
    });
    it(' 修改成功', async () => {
      const ctx = app.mockContext();
      const data = {
        username: 'test',
        email: '',
        password: 'test',
      };
      const result = await ctx.service.user.resetPassword(data);
      assert(result.msg = '修改密码成功');
    });
  });

  after(async () => {
    await ctx.model.User.remove({ _id: that.userId });
    await ctx.model.Message.remove({ _id: that.messageId });
    await ctx.model.Message.remove({ _id: that.messageId1 });
    await ctx.model.User.remove({ _id: that.userId1 });
  });
});
