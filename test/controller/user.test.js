'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');
const fs = require('fs');
const path = require('path');

describe('测试/controller/user.test.js', () => {
  describe('get 请求/api/information', () => {
    it('获取用户信息', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const cookie = app.config.test.cookie;
      const result = await app.httpRequest()
        .get('/api/information')
        .set('Cookie', cookie);
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.data);
    });

    it('未登录获取用户信息', async () => {
      app.mockCsrf();
      const result = await app.httpRequest()
        .get('/api/information');
      assert(result.status === 200);
      assert(result.body.msg === '未登录,请先进行登录');
    });
  });

  describe('put 请求/api/information', () => {
    it('更新用户信息', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const cookie = app.config.test.cookie;
      const result = await app.httpRequest()
        .put('/api/information')
        .set('Cookie', cookie)
        .send({
          age: 12,
        });
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.msg === '修改成功');
    });
    it('未登录更新用户信息', async () => {
      app.mockCsrf();
      const result = await app.httpRequest()
        .put('/api/information')
        .send({
          age: 12,
        });
      assert(result.body.msg === '未登录,请先进行登录');
    });
  });
  describe('post 请求/api/avatar/upload', () => {
    it('上传用户头像', async () => {
      app.mockCsrf();
      const file = fs.readFileSync('app/public/static/images/test.jpg');
      const cookie = app.config.test.cookie;
      const result = await app.httpRequest()
        .post('/api/avatar/upload')
        .set('Cookie', cookie)
        .attach('file', file, 'test.jpg');
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.data.url !== undefined);
    });
    it('未登录上传用户头像', async () => {
      app.mockCsrf();
      const file = fs.readFileSync('app/public/static/images/test.jpg');
      const result = await app.httpRequest()
        .post('/api/avatar/upload')
        .attach('file', file, 'test.jpg');
      assert(result.body.msg === '未登录,请先进行登录');
    });
  });
});
