'use strict';
const { app } = require('egg-mock/bootstrap');
const md5 = require('js-md5');
const ctx = app.mockContext();

module.exports = async () => {
  const user = await ctx.model.User.create({ username: 'test', password: (md5('password')) });
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
  const cookie = [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_-FAullMTh1axHvDldEAtKWECcfqohWSRYzZcUS5jqRZoNz6_fFYuma_NV1hu14HNJX8IUyJ8idmadMYIowntvgppOXh6_rCgY1oqLrRdcez0-dVizgbdc644Y8KmRsZI8x48xWm-RtKVVf4lv3QDQU6UZZ5yUhasJ22DpH2rQ1x99qe84M6TKnij2g64UgXv49zrGfe5JcwbnCUQvUwaHbsfVbCgehNCWHRbtlrGcVmiJYQMjpKaBRToNfYu0SSn29GK_Yl02QMDVacOLGiqYJdSid49vR1kHpW405uhybZRYZqkITb_1sd3dLu2m9HbmNA506pRKrZZHgB4RFdumMN3SgcEcUQWdEvM2duaGrRQ9x_jcjvw-AI8moP-Dty7mjjd8m1MNWPpfck5QZtogyfFN97HGimupIV6219WGp4YdgWuC3g8CYQodgTZIQjWHkVH2vdkt4COo4Drf_qpdbmUAwDs0c3mF675Ag-zvI_MM09aZC2HeG5g3VqC5JBthEAP6Yh6tE9eYmvVIRcLr--e_feDueUcS6QZVPDkpNWNOTxfk-brOSEbMheyRFG-PotA5WuQPwNzU8JPmNeOxE=' ];
  return { userId, userId1, messageId, messageId1, replyId, replyId1, cookie };
};
