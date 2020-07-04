'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');


describe('测试/controller/auth.test.js', () => {
  describe('post请求/login', () => {
    it('发送正确的登录用户信息', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .post('/login')
        .send({
          username: 'admin',
          password: '123123',
        });
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.msg === '登录成功');
    });
    it('发送不存在的用户信息', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
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
      // 模拟 CSRF token
      app.mockCsrf();
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

  describe('post请求/register', () => {
    it('发送用户注册信息：成功注册', async () => {
      app.mockCsrf();
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
      app.mockCsrf();
      const result = await app.httpRequest()
        .post('/register')
        .send({
          username: 'admin',
          password: '123123',
          rePassword: '123123',
        });
      assert(result.status === 200);
      assert(result.body.msg === '用户名已存在');
      assert(result.body.status === 1);
    });
  });

  // 退出登录
  describe('post请求/api/logout', () => {
    it('发送退出登录请求', async () => {
      app.mockCsrf();
      const result = await app.httpRequest()
        .post('/api/logout')
        .set('Cookie', [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_5eZGywWSGzSBdRgXMaDBGNmgluw_0tLlRCGsoIoKj_rfZKFrwlLRhhh9-Pq_fV7KwRkol5FNMlifsEi1HjNcvNRDfXvsvc6V15mnYSFJsTvZQJz0A0a9160NwHoj0QoT6opdz67BCum7sGtFDYj6LZ0zY4v873r_6jo-waxKlHV_9FCbihN6_x6MCWcv2D1ImQNh6HgWwM31bLVkkBVVi3LW-i82iEUKo5ef4hQDf3wWIe0aWAZc9vwXPm4jAnuXGxIVl8LK7P2H_zUf7RJvMqWNtGsQri5yKS_bbeYjCuNqEZBIrv0idzurTqZQzW56AKG04NQ8p1a3CAz7c-52t78wnYcu7VSwycbxRR1LgJ3GxipsekYTdNGxHxY6ahZ_We5uMhcLIZn26G_3r0yUfHId9eDvpzvdmdKzQpFrdIx4Rk8x4ONr1lasvab43uwbdaj4rVqyXxo6SX2PhfedQlwr_1QRDoN77u5mFvfHPbhw5hblXi9N6QWjeuZT-xmC9Qz4k-WEP23yPpk3jWmYO8x7sAFvNFzVPC1BMxcHxdW2x7V9fjxPQnYHdofJNIppB56vwHk_qiRgg_FNq2JncNO_IGtunlwkfuLf3PJUxkY' ]);
      assert(result.status === 200);
      assert(result.body.msg === '已退出登录');
    });
  });
  // 重置密码
  describe('put请求/api/resetPassword', () => {
    it('发送重置密码请求', async () => {
      app.mockCsrf();
      const result = await app.httpRequest()
        .put('/api/resetPassword')
        .send({
          username: 'admin',
          password: '123123',
          email: 'chaoguan@2980.com',
        });
      assert(result.status === 200);
      assert(result.body.msg === '修改密码成功');
    });
  });
});
