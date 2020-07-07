'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const fs = require('fs');

describe('测试/controller/user.test.js', () => {
  let that;
  beforeEach(async () => {
    that = await require('../testconfig')();
    app.mockCsrf();
    app.mockSession({ userInfo: { _id: that.userId } });
  });
  afterEach(async () => {
    await require('../resetConfig')(that);
  });

  describe('get 请求/api/information', () => {
    it('获取用户信息', async () => {
      const result = await app.httpRequest()
        .get('/api/information');
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.data);
    });
  });

  describe('put 请求/api/information', () => {
    it('更新用户信息', async () => {
      const result = await app.httpRequest()
        .put('/api/information')
        .send({
          age: 12,
        });
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.msg === '修改成功');
    });
  });
  describe('post 请求/api/avatar/upload', () => {
    it('上传用户头像', async () => {
      const file = fs.readFileSync('app/public/static/images/test.jpg');
      const result = await app.httpRequest()
        .post('/api/avatar/upload')
        .attach('file', file, 'test.jpg');
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.data.url !== undefined);
    });
  });

  describe('get 请求/api/information/:id', () => {
    it('获取其他用户的信息', async () => {
      const result = await app.httpRequest()
        .get(`/api/information/${that.userId1}`);
      assert(result.status === 200);
      assert(result.body.status === 0);
    });
  });
});
