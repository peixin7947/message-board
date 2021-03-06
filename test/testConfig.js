'use strict';
const { app } = require('egg-mock/bootstrap');
const md5 = require('js-md5');
const ctx = app.mockContext();

module.exports = async () => {
  const user = await ctx.model.User.create({ username: 'test', password: (md5('password')), email: 'test@duoyi.com' });
  const user1 = await ctx.model.User.create({ username: 'test1', password: (md5('password')) });
  const userId = user._id;
  const userId1 = user1._id;
  // user有权限的留言
  const message = await ctx.model.Message.create({ creator: user._id });
  // user没权限的留言
  const message1 = await ctx.model.Message.create({ creator: user1._id });
  const messageId = message._id;
  const messageId1 = message1._id;
  message.reply.push({ creator: user._id, toUser: user._id });
  message1.reply.push({ creator: user1._id, toUser: user1._id });
  await message1.save();
  await message.save();
  const replyId = message.reply[0]._id;
  const replyId1 = message1.reply[0]._id;
  return { userId, userId1, messageId, messageId1, replyId, replyId1 };
};
