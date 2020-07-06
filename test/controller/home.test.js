'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');

describe('测试/controller/home.test.js', () => {
  describe('GET 请求/', () => {
    it('get 请求/ 跳转回登录页面', async () => {
      const result = await app.httpRequest()
        .get('/');
      assert(result.status === 302);
    });

    it('get 请求/ 跳转回留言板页面', async () => {
      const cookie = app.config.test.cookie;
      const result = await app.httpRequest()
        .get('/')
        .set('Cookie', cookie);
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
