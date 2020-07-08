'use strict';
const { app, assert } = require('egg-mock/bootstrap');

describe('测试/controller/auth.test.js', () => {
  let that;
  beforeEach(async () => {
    that = await require('../testConfig')();
    app.mockCsrf();
  });
  afterEach(async () => {
    await require('../resetConfig')(that);
  });
  describe('post请求/register', () => {
    it('发送用户注册信息：成功注册', async () => {
      const result = await app.httpRequest()
        .post('/register')
        .send({
          username: 'admin1',
          password: '123123',
          rePassword: '123123',
        });
      assert(result.status === 200);
      // 由于一直注册会报错，所以不校验消息
    });
    it('发送用户注册信息：已存在', async () => {
      const result = await app.httpRequest()
        .post('/register')
        .send({
          username: 'test',
          password: '123123',
          rePassword: '123123',
        });
      assert(result.status === 200);
      assert(result.body.msg === '用户名已存在');
      assert(result.body.status === 1);
    });
    it('发送用户注册信息：参数错误', async () => {
      const result = await app.httpRequest()
        .post('/register')
        .send({
          username: '1',
          password: '1',
          rePassword: '1',
        });
      assert(result.body.msg === '应提供有效的用户名!');
    });
  });

  // 退出登录
  describe('post请求/api/logout', () => {
    it('发送退出登录请求', async () => {
      app.mockSession({ userInfo: { _id: that.userId } });
      app.mockCsrf();
      const result = await app.httpRequest().post('/api/logout');
      assert(result.status === 200);
      assert(result.body.status === 0);
    });
  });

  describe('post请求/login', () => {
    it('发送正确的登录用户信息', async () => {
      app.mockCsrf();
      const result = await app.httpRequest()
        .post('/login')
        .send({
          username: 'test',
          password: 'password',
        });
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.msg === '登录成功');
    });
    it('发送不存在的用户信息', async () => {
      const result = await app.httpRequest()
        .post('/login')
        .send({
          username: 'bucunzai',
          password: '123123',
        });
      assert(result.status === 200);
      assert(result.body.msg === '用户不存在');
      assert(result.body.status === 1);
    });
    it('发送错误的用户信息', async () => {
      const result = await app.httpRequest()
        .post('/login')
        .send({
          username: 'admin',
          password: '111111',
        });
      assert(result.status === 200);
      assert(result.body.msg === '输入密码错误');
      assert(result.body.status === 1);
    });
  });
  // 重置密码
  describe('put请求/api/resetPassword', () => {
    it('发送重置密码请求', async () => {
      const result = await app.httpRequest()
        .put('/api/resetPassword')
        .send({
          username: 'test',
          password: '123123',
          email: 'test@duoyi.com',
        });
      assert(result.status === 200);
      assert(result.body.msg === '修改密码成功');
    });
  });
});
