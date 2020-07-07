

'use strict';
const { app } = require('egg-mock/bootstrap');
const ctx = app.mockContext();

module.exports = async data => {
  await ctx.model.User.remove({ _id: data.userId });
  await ctx.model.Message.remove({ _id: data.messageId });
  await ctx.model.Message.remove({ _id: data.messageId1 });
  await ctx.model.User.remove({ _id: data.userId1 });
};
