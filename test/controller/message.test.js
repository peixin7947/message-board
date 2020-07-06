'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');


describe('测试/controller/message.test.js', () => {
  let that;
  before(async function() {
    that = await require('../testconfig')();
  });
  describe('get 请求/api/message', () => {
    it('获取留言列表', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .get('/api/message')
        .set('Cookie', that.cookie);
      assert(result.status === 200);
      assert(result.body.status === 0);
    });
  });

  // 发布留言
  describe('post 请求/api/message', () => {
    it('创建留言', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .post('/api/message')
        .set('Cookie', that.cookie)
        .send({
          content: '单元测试，测试创建留言',
          title: '单元测试，测试创建留言',
        });
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.msg = '发布留言成功');
    });
    it('未登录创建留言', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .post('/api/message')
        .send({
          content: '单元测试，测试创建留言',
          title: '单元测试，测试创建留言',
        });
      assert(result.body.msg = '未登录,请先进行登录');
    });
  });

  // 创建评论
  describe('post 请求/api/reply', () => {
    it('创建评论', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .post('/api/reply')
        .set('Cookie', that.cookie)
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

  describe('get 请求/api/message/:id', () => {
    it('获取某个用户的留言', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .get(`/api/message/${that.userId}`)
        .set('Cookie', that.cookie);
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
        .set('Cookie', that.cookie);
      assert(result.status === 200);
      assert(result.body.status === 0);
      assert(result.body.data);
    });
  });


  // 删除消息
  describe('delete 请求/api/message', () => {
    it('删除留言：删除非自己的留言', async () => {
      // 模拟 CSRF token
      app.mockCsrf();
      const result = await app.httpRequest()
        .delete('/api/message')
        .set('Cookie', that.cookie)
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
    //     .set('Cookie', that.cookie)
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
    //     .set('Cookie', that.cookie)
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
        .set('Cookie', that.cookie)
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
