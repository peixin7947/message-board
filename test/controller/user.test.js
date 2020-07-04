'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');
const fs = require('fs');
const path = require('path');

describe('测试/controller/user.test.js', () => {
  describe('get 请求/api/information', () => {
    it('获取用户信息', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .get('/api/information')
        .set('Cookie', [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_5eZGywWSGzSBdRgXMaDBGNmgluw_0tLlRCGsoIoKj_rfZKFrwlLRhhh9-Pq_fV7KwRkol5FNMlifsEi1HjNcvNRDfXvsvc6V15mnYSFJsTvZQJz0A0a9160NwHoj0QoT6opdz67BCum7sGtFDYj6LZ0zY4v873r_6jo-waxKlHV_9FCbihN6_x6MCWcv2D1ImQNh6HgWwM31bLVkkBVVi3LW-i82iEUKo5ef4hQDf3wWIe0aWAZc9vwXPm4jAnuXGxIVl8LK7P2H_zUf7RJvMqWNtGsQri5yKS_bbeYjCuNqEZBIrv0idzurTqZQzW56AKG04NQ8p1a3CAz7c-52t78wnYcu7VSwycbxRR1LgJ3GxipsekYTdNGxHxY6ahZ_We5uMhcLIZn26G_3r0yUfHId9eDvpzvdmdKzQpFrdIx4Rk8x4ONr1lasvab43uwbdaj4rVqyXxo6SX2PhfedQlwr_1QRDoN77u5mFvfHPbhw5hblXi9N6QWjeuZT-xmC9Qz4k-WEP23yPpk3jWmYO8x7sAFvNFzVPC1BMxcHxdW2x7V9fjxPQnYHdofJNIppB56vwHk_qiRgg_FNq2JncNO_IGtunlwkfuLf3PJUxkY' ]);
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.data);
    });
  });

  describe('put 请求/api/information', () => {
    it('更新用户信息', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .put('/api/information')
        .set('Cookie', [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_5eZGywWSGzSBdRgXMaDBGNmgluw_0tLlRCGsoIoKj_rfZKFrwlLRhhh9-Pq_fV7KwRkol5FNMlifsEi1HjNcvNRDfXvsvc6V15mnYSFJsTvZQJz0A0a9160NwHoj0QoT6opdz67BCum7sGtFDYj6LZ0zY4v873r_6jo-waxKlHV_9FCbihN6_x6MCWcv2D1ImQNh6HgWwM31bLVkkBVVi3LW-i82iEUKo5ef4hQDf3wWIe0aWAZc9vwXPm4jAnuXGxIVl8LK7P2H_zUf7RJvMqWNtGsQri5yKS_bbeYjCuNqEZBIrv0idzurTqZQzW56AKG04NQ8p1a3CAz7c-52t78wnYcu7VSwycbxRR1LgJ3GxipsekYTdNGxHxY6ahZ_We5uMhcLIZn26G_3r0yUfHId9eDvpzvdmdKzQpFrdIx4Rk8x4ONr1lasvab43uwbdaj4rVqyXxo6SX2PhfedQlwr_1QRDoN77u5mFvfHPbhw5hblXi9N6QWjeuZT-xmC9Qz4k-WEP23yPpk3jWmYO8x7sAFvNFzVPC1BMxcHxdW2x7V9fjxPQnYHdofJNIppB56vwHk_qiRgg_FNq2JncNO_IGtunlwkfuLf3PJUxkY' ])
        .send({
          age: 12,
        });
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.msg === '修改成功');
    });
  });
  describe('post 请求/api/avatar/upload', () => {
    // 读取一个二进制图片
    const file = fs.readFileSync(path.join(__dirname, 'test.png'));
    it('上传用户头像', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .put('/api/information')
        .set('Cookie', [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_5eZGywWSGzSBdRgXMaDBGNmgluw_0tLlRCGsoIoKj_rfZKFrwlLRhhh9-Pq_fV7KwRkol5FNMlifsEi1HjNcvNRDfXvsvc6V15mnYSFJsTvZQJz0A0a9160NwHoj0QoT6opdz67BCum7sGtFDYj6LZ0zY4v873r_6jo-waxKlHV_9FCbihN6_x6MCWcv2D1ImQNh6HgWwM31bLVkkBVVi3LW-i82iEUKo5ef4hQDf3wWIe0aWAZc9vwXPm4jAnuXGxIVl8LK7P2H_zUf7RJvMqWNtGsQri5yKS_bbeYjCuNqEZBIrv0idzurTqZQzW56AKG04NQ8p1a3CAz7c-52t78wnYcu7VSwycbxRR1LgJ3GxipsekYTdNGxHxY6ahZ_We5uMhcLIZn26G_3r0yUfHId9eDvpzvdmdKzQpFrdIx4Rk8x4ONr1lasvab43uwbdaj4rVqyXxo6SX2PhfedQlwr_1QRDoN77u5mFvfHPbhw5hblXi9N6QWjeuZT-xmC9Qz4k-WEP23yPpk3jWmYO8x7sAFvNFzVPC1BMxcHxdW2x7V9fjxPQnYHdofJNIppB56vwHk_qiRgg_FNq2JncNO_IGtunlwkfuLf3PJUxkY' ])
        .send(file);
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.msg === '修改成功');
    });
  });
});
