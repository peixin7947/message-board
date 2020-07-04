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
      const result = await app.httpRequest()
        .get('/')
        .set('Cookie', [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_5eZGywWSGzSBdRgXMaDBGNmgluw_0tLlRCGsoIoKj_rfZKFrwlLRhhh9-Pq_fV7KwRkol5FNMlifsEi1HjNcvNRDfXvsvc6V15mnYSFJsTvZQJz0A0a9160NwHoj0QoT6opdz67BCum7sGtFDYj6LZ0zY4v873r_6jo-waxKlHV_9FCbihN6_x6MCWcv2D1ImQNh6HgWwM31bLVkkBVVi3LW-i82iEUKo5ef4hQDf3wWIe0aWAZc9vwXPm4jAnuXGxIVl8LK7P2H_zUf7RJvMqWNtGsQri5yKS_bbeYjCuNqEZBIrv0idzurTqZQzW56AKG04NQ8p1a3CAz7c-52t78wnYcu7VSwycbxRR1LgJ3GxipsekYTdNGxHxY6ahZ_We5uMhcLIZn26G_3r0yUfHId9eDvpzvdmdKzQpFrdIx4Rk8x4ONr1lasvab43uwbdaj4rVqyXxo6SX2PhfedQlwr_1QRDoN77u5mFvfHPbhw5hblXi9N6QWjeuZT-xmC9Qz4k-WEP23yPpk3jWmYO8x7sAFvNFzVPC1BMxcHxdW2x7V9fjxPQnYHdofJNIppB56vwHk_qiRgg_FNq2JncNO_IGtunlwkfuLf3PJUxkY' ]);
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
