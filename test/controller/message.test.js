'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');

const that = this;

describe('测试/controller/message.test.js', () => {
  before(async function() {
    const { userId, userId1, messageId, messageId1, replyId, replyId1 } = await require('../testconfig');
    that.userId = userId;
    that.userId1 = userId1;
    that.messageId = messageId;
    that.messageId1 = messageId1;
    that.replyId = replyId;
    that.replyId1 = replyId1;
  });
  describe('get 请求/api/message', () => {
    it('获取留言列表', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .get('/api/message')
        .set('Cookie', [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_5eZGywWSGzSBdRgXMaDBGNmgluw_0tLlRCGsoIoKj_rfZKFrwlLRhhh9-Pq_fV7KwRkol5FNMlifsEi1HjNcvNRDfXvsvc6V15mnYSFJsTvZQJz0A0a9160NwHoj0QoT6opdz67BCum7sGtFDYj6LZ0zY4v873r_6jo-waxKlHV_9FCbihN6_x6MCWcv2D1ImQNh6HgWwM31bLVkkBVVi3LW-i82iEUKo5ef4hQDf3wWIe0aWAZc9vwXPm4jAnuXGxIVl8LK7P2H_zUf7RJvMqWNtGsQri5yKS_bbeYjCuNqEZBIrv0idzurTqZQzW56AKG04NQ8p1a3CAz7c-52t78wnYcu7VSwycbxRR1LgJ3GxipsekYTdNGxHxY6ahZ_We5uMhcLIZn26G_3r0yUfHId9eDvpzvdmdKzQpFrdIx4Rk8x4ONr1lasvab43uwbdaj4rVqyXxo6SX2PhfedQlwr_1QRDoN77u5mFvfHPbhw5hblXi9N6QWjeuZT-xmC9Qz4k-WEP23yPpk3jWmYO8x7sAFvNFzVPC1BMxcHxdW2x7V9fjxPQnYHdofJNIppB56vwHk_qiRgg_FNq2JncNO_IGtunlwkfuLf3PJUxkY' ]);
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.data);
    });
  });

  describe('get 请求/api/message/:id', () => {
    it('获取某个用户的留言', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .get(`/api/message/${that.userId}`)
        .set('Cookie', [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_5eZGywWSGzSBdRgXMaDBGNmgluw_0tLlRCGsoIoKj_rfZKFrwlLRhhh9-Pq_fV7KwRkol5FNMlifsEi1HjNcvNRDfXvsvc6V15mnYSFJsTvZQJz0A0a9160NwHoj0QoT6opdz67BCum7sGtFDYj6LZ0zY4v873r_6jo-waxKlHV_9FCbihN6_x6MCWcv2D1ImQNh6HgWwM31bLVkkBVVi3LW-i82iEUKo5ef4hQDf3wWIe0aWAZc9vwXPm4jAnuXGxIVl8LK7P2H_zUf7RJvMqWNtGsQri5yKS_bbeYjCuNqEZBIrv0idzurTqZQzW56AKG04NQ8p1a3CAz7c-52t78wnYcu7VSwycbxRR1LgJ3GxipsekYTdNGxHxY6ahZ_We5uMhcLIZn26G_3r0yUfHId9eDvpzvdmdKzQpFrdIx4Rk8x4ONr1lasvab43uwbdaj4rVqyXxo6SX2PhfedQlwr_1QRDoN77u5mFvfHPbhw5hblXi9N6QWjeuZT-xmC9Qz4k-WEP23yPpk3jWmYO8x7sAFvNFzVPC1BMxcHxdW2x7V9fjxPQnYHdofJNIppB56vwHk_qiRgg_FNq2JncNO_IGtunlwkfuLf3PJUxkY' ]);
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.data);
    });
  });
  describe('get 请求/api/reply/:id', () => {
    it('获取某个用户的评论', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .get(`/api/reply/${that.userId}`)
        .set('Cookie', [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_5eZGywWSGzSBdRgXMaDBGNmgluw_0tLlRCGsoIoKj_rfZKFrwlLRhhh9-Pq_fV7KwRkol5FNMlifsEi1HjNcvNRDfXvsvc6V15mnYSFJsTvZQJz0A0a9160NwHoj0QoT6opdz67BCum7sGtFDYj6LZ0zY4v873r_6jo-waxKlHV_9FCbihN6_x6MCWcv2D1ImQNh6HgWwM31bLVkkBVVi3LW-i82iEUKo5ef4hQDf3wWIe0aWAZc9vwXPm4jAnuXGxIVl8LK7P2H_zUf7RJvMqWNtGsQri5yKS_bbeYjCuNqEZBIrv0idzurTqZQzW56AKG04NQ8p1a3CAz7c-52t78wnYcu7VSwycbxRR1LgJ3GxipsekYTdNGxHxY6ahZ_We5uMhcLIZn26G_3r0yUfHId9eDvpzvdmdKzQpFrdIx4Rk8x4ONr1lasvab43uwbdaj4rVqyXxo6SX2PhfedQlwr_1QRDoN77u5mFvfHPbhw5hblXi9N6QWjeuZT-xmC9Qz4k-WEP23yPpk3jWmYO8x7sAFvNFzVPC1BMxcHxdW2x7V9fjxPQnYHdofJNIppB56vwHk_qiRgg_FNq2JncNO_IGtunlwkfuLf3PJUxkY' ]);
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.data);
    });
  });

  // 发布留言
  describe('post 请求/api/message', () => {
    it('创建留言', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .post('/api/message')
        .set('Cookie', [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_5eZGywWSGzSBdRgXMaDBGNmgluw_0tLlRCGsoIoKj_rfZKFrwlLRhhh9-Pq_fV7KwRkol5FNMlifsEi1HjNcvNRDfXvsvc6V15mnYSFJsTvZQJz0A0a9160NwHoj0QoT6opdz67BCum7sGtFDYj6LZ0zY4v873r_6jo-waxKlHV_9FCbihN6_x6MCWcv2D1ImQNh6HgWwM31bLVkkBVVi3LW-i82iEUKo5ef4hQDf3wWIe0aWAZc9vwXPm4jAnuXGxIVl8LK7P2H_zUf7RJvMqWNtGsQri5yKS_bbeYjCuNqEZBIrv0idzurTqZQzW56AKG04NQ8p1a3CAz7c-52t78wnYcu7VSwycbxRR1LgJ3GxipsekYTdNGxHxY6ahZ_We5uMhcLIZn26G_3r0yUfHId9eDvpzvdmdKzQpFrdIx4Rk8x4ONr1lasvab43uwbdaj4rVqyXxo6SX2PhfedQlwr_1QRDoN77u5mFvfHPbhw5hblXi9N6QWjeuZT-xmC9Qz4k-WEP23yPpk3jWmYO8x7sAFvNFzVPC1BMxcHxdW2x7V9fjxPQnYHdofJNIppB56vwHk_qiRgg_FNq2JncNO_IGtunlwkfuLf3PJUxkY' ])
        .send({
          content: '单元测试，测试创建留言',
          title: '单元测试，测试创建留言',
        });
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.msg = '发布留言成功');
    });
  });

  // 创建评论
  describe('post 请求/api/reply', () => {
    it('创建评论', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .post('/api/reply')
        .set('Cookie', [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_5eZGywWSGzSBdRgXMaDBGNmgluw_0tLlRCGsoIoKj_rfZKFrwlLRhhh9-Pq_fV7KwRkol5FNMlifsEi1HjNcvNRDfXvsvc6V15mnYSFJsTvZQJz0A0a9160NwHoj0QoT6opdz67BCum7sGtFDYj6LZ0zY4v873r_6jo-waxKlHV_9FCbihN6_x6MCWcv2D1ImQNh6HgWwM31bLVkkBVVi3LW-i82iEUKo5ef4hQDf3wWIe0aWAZc9vwXPm4jAnuXGxIVl8LK7P2H_zUf7RJvMqWNtGsQri5yKS_bbeYjCuNqEZBIrv0idzurTqZQzW56AKG04NQ8p1a3CAz7c-52t78wnYcu7VSwycbxRR1LgJ3GxipsekYTdNGxHxY6ahZ_We5uMhcLIZn26G_3r0yUfHId9eDvpzvdmdKzQpFrdIx4Rk8x4ONr1lasvab43uwbdaj4rVqyXxo6SX2PhfedQlwr_1QRDoN77u5mFvfHPbhw5hblXi9N6QWjeuZT-xmC9Qz4k-WEP23yPpk3jWmYO8x7sAFvNFzVPC1BMxcHxdW2x7V9fjxPQnYHdofJNIppB56vwHk_qiRgg_FNq2JncNO_IGtunlwkfuLf3PJUxkY' ])
        .send({
          content: '单元测试，测试创建评论',
          toUser: that.userId,
          messageId: that.messageId,
        });
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.msg = '发布留言成功');
    });
  });

  // 删除消息
  describe('delete 请求/api/message', () => {
    it('删除留言：删除非自己的留言', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .delete('/api/message')
        .set('Cookie', [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_5eZGywWSGzSBdRgXMaDBGNmgluw_0tLlRCGsoIoKj_rfZKFrwlLRhhh9-Pq_fV7KwRkol5FNMlifsEi1HjNcvNRDfXvsvc6V15mnYSFJsTvZQJz0A0a9160NwHoj0QoT6opdz67BCum7sGtFDYj6LZ0zY4v873r_6jo-waxKlHV_9FCbihN6_x6MCWcv2D1ImQNh6HgWwM31bLVkkBVVi3LW-i82iEUKo5ef4hQDf3wWIe0aWAZc9vwXPm4jAnuXGxIVl8LK7P2H_zUf7RJvMqWNtGsQri5yKS_bbeYjCuNqEZBIrv0idzurTqZQzW56AKG04NQ8p1a3CAz7c-52t78wnYcu7VSwycbxRR1LgJ3GxipsekYTdNGxHxY6ahZ_We5uMhcLIZn26G_3r0yUfHId9eDvpzvdmdKzQpFrdIx4Rk8x4ONr1lasvab43uwbdaj4rVqyXxo6SX2PhfedQlwr_1QRDoN77u5mFvfHPbhw5hblXi9N6QWjeuZT-xmC9Qz4k-WEP23yPpk3jWmYO8x7sAFvNFzVPC1BMxcHxdW2x7V9fjxPQnYHdofJNIppB56vwHk_qiRgg_FNq2JncNO_IGtunlwkfuLf3PJUxkY' ])
        .send({
          id: that.messageId1,
        });
      assert(result.status === 200);
      assert(result.body.status === 1);
      assert(result.body.msg = '无权删除');
    });
    // it('删除留言：删除自己的评论', async () => {
    //   // 模拟 CSRF token
    //   app.mockCsrf();
    //   const ctx = app.mockContext();
    //   const result = await app.httpRequest()
    //     .delete('/api/message')
    //     .set('Cookie', [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_5eZGywWSGzSBdRgXMaDBGNmgluw_0tLlRCGsoIoKj_rfZKFrwlLRhhh9-Pq_fV7KwRkol5FNMlifsEi1HjNcvNRDfXvsvc6V15mnYSFJsTvZQJz0A0a9160NwHoj0QoT6opdz67BCum7sGtFDYj6LZ0zY4v873r_6jo-waxKlHV_9FCbihN6_x6MCWcv2D1ImQNh6HgWwM31bLVkkBVVi3LW-i82iEUKo5ef4hQDf3wWIe0aWAZc9vwXPm4jAnuXGxIVl8LK7P2H_zUf7RJvMqWNtGsQri5yKS_bbeYjCuNqEZBIrv0idzurTqZQzW56AKG04NQ8p1a3CAz7c-52t78wnYcu7VSwycbxRR1LgJ3GxipsekYTdNGxHxY6ahZ_We5uMhcLIZn26G_3r0yUfHId9eDvpzvdmdKzQpFrdIx4Rk8x4ONr1lasvab43uwbdaj4rVqyXxo6SX2PhfedQlwr_1QRDoN77u5mFvfHPbhw5hblXi9N6QWjeuZT-xmC9Qz4k-WEP23yPpk3jWmYO8x7sAFvNFzVPC1BMxcHxdW2x7V9fjxPQnYHdofJNIppB56vwHk_qiRgg_FNq2JncNO_IGtunlwkfuLf3PJUxkY' ])
    //     .send({
    //       id: replyId,
    //     });
    //   assert(result.status === 200);
    //   assert(result.body.status === 0);
    //   assert(result.body.msg = '删除成功');
    //   await ctx.model.Message.updateOne({ 'reply._id': replyId }, { 'reply.isDel': false, 'reply.doDel': null });
    // });
    // it('删除留言：删除自己的留言', async () => {
    //   // 模拟 CSRF token
    //   app.mockCsrf();
    //   const ctx = app.mockContext();
    //   const result = await app.httpRequest()
    //     .delete('/api/message')
    //     .set('Cookie', [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_5eZGywWSGzSBdRgXMaDBGNmgluw_0tLlRCGsoIoKj_rfZKFrwlLRhhh9-Pq_fV7KwRkol5FNMlifsEi1HjNcvNRDfXvsvc6V15mnYSFJsTvZQJz0A0a9160NwHoj0QoT6opdz67BCum7sGtFDYj6LZ0zY4v873r_6jo-waxKlHV_9FCbihN6_x6MCWcv2D1ImQNh6HgWwM31bLVkkBVVi3LW-i82iEUKo5ef4hQDf3wWIe0aWAZc9vwXPm4jAnuXGxIVl8LK7P2H_zUf7RJvMqWNtGsQri5yKS_bbeYjCuNqEZBIrv0idzurTqZQzW56AKG04NQ8p1a3CAz7c-52t78wnYcu7VSwycbxRR1LgJ3GxipsekYTdNGxHxY6ahZ_We5uMhcLIZn26G_3r0yUfHId9eDvpzvdmdKzQpFrdIx4Rk8x4ONr1lasvab43uwbdaj4rVqyXxo6SX2PhfedQlwr_1QRDoN77u5mFvfHPbhw5hblXi9N6QWjeuZT-xmC9Qz4k-WEP23yPpk3jWmYO8x7sAFvNFzVPC1BMxcHxdW2x7V9fjxPQnYHdofJNIppB56vwHk_qiRgg_FNq2JncNO_IGtunlwkfuLf3PJUxkY' ])
    //     .send({
    //       id: messageId,
    //     });
    //   assert(result.status === 200);
    //   assert(result.body.status === 0);
    //   assert(result.body.msg = '删除成功');
    //   await ctx.model.Message.updateOne({ _id: messageId }, { isDel: false, doDel: null });
    // });
  });

  // 编辑消息
  describe('put 请求/api/message', () => {
    it('编辑消息', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .put('/api/message')
        .set('Cookie', [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_5eZGywWSGzSBdRgXMaDBGNmgluw_0tLlRCGsoIoKj_rfZKFrwlLRhhh9-Pq_fV7KwRkol5FNMlifsEi1HjNcvNRDfXvsvc6V15mnYSFJsTvZQJz0A0a9160NwHoj0QoT6opdz67BCum7sGtFDYj6LZ0zY4v873r_6jo-waxKlHV_9FCbihN6_x6MCWcv2D1ImQNh6HgWwM31bLVkkBVVi3LW-i82iEUKo5ef4hQDf3wWIe0aWAZc9vwXPm4jAnuXGxIVl8LK7P2H_zUf7RJvMqWNtGsQri5yKS_bbeYjCuNqEZBIrv0idzurTqZQzW56AKG04NQ8p1a3CAz7c-52t78wnYcu7VSwycbxRR1LgJ3GxipsekYTdNGxHxY6ahZ_We5uMhcLIZn26G_3r0yUfHId9eDvpzvdmdKzQpFrdIx4Rk8x4ONr1lasvab43uwbdaj4rVqyXxo6SX2PhfedQlwr_1QRDoN77u5mFvfHPbhw5hblXi9N6QWjeuZT-xmC9Qz4k-WEP23yPpk3jWmYO8x7sAFvNFzVPC1BMxcHxdW2x7V9fjxPQnYHdofJNIppB56vwHk_qiRgg_FNq2JncNO_IGtunlwkfuLf3PJUxkY' ])
        .send({
          content: '单元测试，测试编辑评论',
          id: that.replyId1,
        });
      assert(result.status === 200);
      assert(result.body.status === 1);
      assert(result.body.msg = '不可编辑非自己的留言');
    });
  });
  after(async function() {
    const ctx = app.mockContext();
    await ctx.model.Message.remove({
      content: '单元测试，测试创建留言',
      title: '单元测试，测试创建留言',
    });
    await ctx.model.Message.remove({ 'reply.content': '单元测试，测试创建评论' });
    await ctx.model.User.remove({ _id: that.userId });
    await ctx.model.Message.remove({ _id: that.messageId });
    await ctx.model.Message.remove({ _id: that.messageId1 });
    await ctx.model.User.remove({ _id: that.userId1 });
  });

});
