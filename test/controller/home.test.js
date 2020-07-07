'use strict';
const { app, assert } = require('egg-mock/bootstrap');

describe('测试/controller/home.test.js', () => {
  let that;
  beforeEach(async () => {
    that = await require('../testconfig')();
    app.mockCsrf();
    app.mockSession({ userInfo: { _id: that.userId } });
  });
  afterEach(async () => {
    await require('../resetConfig')(that);
  });
  describe('GET 请求/', () => {
    it('get 请求/ 跳转回登录页面', async () => {
      const result = await app.httpRequest()
        .get('/');
      assert(result.status === 302);
    });

    it('get 请求/ 跳转回留言板页面', async () => {
      const result = await app.httpRequest().get('/');
      assert(result.status === 302);
    });
  });

  describe('GET 请求/api/time', () => {
    it('get 请求/api/time 获取系统实际', async () => {
      const result = await app.httpRequest()
        .get('/api/time');
      assert(result.status === 200);
      assert(result.body.data === Date());
    });
  });
});
