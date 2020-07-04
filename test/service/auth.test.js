'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');

describe('测试/service/auth.test.js', () => {
  it('测试login方法:正常登录', async () => {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const msgObj = await ctx.service.auth.login({
      username: 'admin',
      password: '123123',
    });
    assert(msgObj);
    assert(msgObj.msg === '登录成功');
  });
  it('测试login方法:用户不存在', async () => {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const msgObj = await ctx.service.auth.login({
      username: '不存在的用户',
      password: '123123',
    });
    assert(msgObj);
    assert(msgObj.msg === '用户不存在');
  });
  it('测试login方法:密码错误', async () => {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const msgObj = await ctx.service.auth.login({
      username: 'admin',
      password: '1231231',
    });
    assert(msgObj);
    assert(msgObj.msg === '输入密码错误');
  });

});
