'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');

describe('测试/service/message.test.js', () => {
  let that;
  let ctx;
  before(async () => {
    ctx = app.mockContext();
    that = await require('../testconfig')();
  });

  it('测试 listMessage 方法', async () => {
    const data = {
      sort: '{"createTime":-1}',
      pageSize: 5,
      pageIndex: 1,
    };
    const result = await ctx.service.message.listMessage(data);
    assert(result);
  });

  it('测试 createMessage 方法', async () => {
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
      ctx.session.userInfo = {
        _id: that.userId,
      };
      const data = {
        id: '5eff2b68e0c5561cec650d4b',
      };
      const result = await ctx.service.message.deleteMessage(data);
      assert(result.msg === '留言不存在或已被删除');
    });

    it('无权删除评论和留言', async () => {
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
    it('删除成功评论和留言', async () => {
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

  describe('测试 getMessageListByUserId 方法', () => {
    it('获取用户留言列表', async () => {
      const data = {
        sort: '{"createTime":-1}',
        id: that.userId1,
      };
      const result = await ctx.service.message.getMessageListByUserId(data);
      assert(result.total > 0);
    });
  });

  describe('测试 getReplyListByUserId 方法', () => {
    it('获取用户评论列表', async () => {
      const data = {
        sort: '{"createTime":-1}',
        id: that.userId1,
      };
      const result = await ctx.service.message.getReplyListByUserId(data);
      assert(result.total > 0);
    });
  });

  after(async () => {
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
