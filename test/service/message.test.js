'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
const that = this;

describe('测试/service/message.test.js', () => {
  before(async function() {
    const { userId, userId1, messageId, messageId1, replyId, replyId1 } = await require('../testconfig');
    that.userId = userId;
    that.userId1 = userId1;
    that.messageId = messageId;
    that.messageId1 = messageId1;
    that.replyId = replyId;
    that.replyId1 = replyId1;
  });
  it('测试 listMessage 方法', async () => {
    const ctx = app.mockContext();
    const data = {
      sort: '{"createTime":-1}',
      pageSize: 5,
      pageIndex: 1,
    };
    const result = await ctx.service.message.listMessage(data);
    assert(result);
  });

  it('测试 createMessage 方法', async () => {
    const ctx = app.mockContext();
    ctx.session.userInfo = {
      _id: that.userId,
    };
    const data = {
      title: '单元测试  测试 createMessage 方法',
      content: '单元测试  测试 createMessage 方法',
    };
    const result = await ctx.service.message.createMessage(data);
    assert(result.msg === '发布留言成功');
  });

  describe('测试 createReply 方法', () => {
    it('评论成功', async () => {
      const ctx = app.mockContext();
      ctx.session.userInfo = {
        _id: that.userId,
      };
      const data = {
        content: '单元测试  测试 createReply 方法',
        toUser: that.userId,
        messageId: that.messageId,
      };
      const result = await ctx.service.message.createReply(data);
      assert(result.msg === '发布留言成功');
    });

    it('评论失败', async () => {
      const ctx = app.mockContext();
      ctx.session.userInfo = {
        _id: that.userId,
      };
      const data = {
        content: '单元测试  测试 createReply 方法',
        toUser: that.userId,
        messageId: '5eff2b68e0c5561cec650d4b',
      };
      const result = await ctx.service.message.createReply(data);
      assert(result.msg === '留言评论不存在');
    });
  });

  describe('测试 deleteMessage 方法', () => {
    it('留言不存在', async () => {
      const ctx = app.mockContext();
      ctx.session.userInfo = {
        _id: that.userId,
      };
      const data = {
        id: '5eff2b68e0c5561cec650d4b',
      };
      const result = await ctx.service.message.deleteMessage(data);
      assert(result.msg === '留言不存在或已被删除');
    });

    it('无权删除', async () => {
      const ctx = app.mockContext();
      ctx.session.userInfo = {
        _id: that.userId,
      };
      const data = {
        id: that.messageId1,
      };
      let result = await ctx.service.message.deleteMessage(data);
      assert(result.msg === '无权删除');

      data.id = that.replyId1;
      result = await ctx.service.message.deleteMessage(data);
      assert(result.msg === '无权删除');
    });
    it('删除成功', async () => {
      const ctx = app.mockContext();
      ctx.session.userInfo = {
        _id: that.userId,
      };
      const data = {
        id: that.messageId,
      };
      let result = await ctx.service.message.deleteMessage(data);
      assert(result.msg === '删除成功');

      data.id = that.replyId;
      result = await ctx.service.message.deleteMessage(data);
      assert(result.msg === '删除成功');
    });

  });

  describe('测试 updateMessage 方法', () => {
    it('留言不存在', async () => {
      const ctx = app.mockContext();
      ctx.session.userInfo = {
        _id: that.userId,
      };
      const data = {
        id: '5eff2b68e0c5561cec650d4b',
      };
      const result = await ctx.service.message.updateMessage(data);
      assert(result.msg === '留言或评论不存在');
    });

    it('不可编辑非自己的留言', async () => {
      const ctx = app.mockContext();
      ctx.session.userInfo = {
        _id: that.userId,
      };
      const data = {
        id: that.messageId1,
      };
      let result = await ctx.service.message.updateMessage(data);
      assert(result.msg === '不可编辑非自己的留言');

      data.id = that.replyId1;
      result = await ctx.service.message.updateMessage(data);
      assert(result.msg === '不可编辑非自己的留言');
    });
    it('修改成功', async () => {
      const ctx = app.mockContext();
      ctx.session.userInfo = {
        _id: that.userId,
      };
      const data = {
        id: that.messageId,
      };
      let result = await ctx.service.message.deleteMessage(data);
      assert(result.msg = '修改成功');

      data.id = that.replyId;
      result = await ctx.service.message.deleteMessage(data);
      assert(result.msg = '修改成功');
    });
  });

  after(async function() {
    console.log('还原删除的数据');
    const ctx = app.mockContext();
    // 删除增加评论测试数据
    // await ctx.model.Message.remove({ 'reply.content': '单元测试  测试 createReply 方法' });
    // 删除增加留言的测试数据
    await ctx.model.Message.remove({
      title: '单元测试  测试 createMessage 方法',
      content: '单元测试  测试 createMessage 方法',
    });
    await ctx.model.User.remove({ _id: that.userId });
    await ctx.model.Message.remove({ _id: that.messageId });
    await ctx.model.Message.remove({ _id: that.messageId1 });
    await ctx.model.User.remove({ _id: that.userId1 });
  });
});
