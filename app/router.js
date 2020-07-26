'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index); // 首页跳转
  router.get('/api/time', controller.home.time); // 获取系统时间

  router.post('/register', controller.auth.register); // 注册用户
  router.post('/login', controller.auth.login); // 登录用户
  router.put('/api/resetPassword', controller.auth.resetPassword); // 重置密码
  router.get('/api/information', controller.user.getUserInformation); // 获取用户信息
  router.put('/api/information', controller.user.updateUserInformation); // 更新用户信息
  router.post('/api/avatar/upload', controller.user.uploadAvatar); // 上传用户头像
  router.post('/api/logout', controller.auth.logout); // 用户退出登录
  router.get('/api/information/:id', controller.user.getInformationById); // 获取其他用户的信息

  router.get('/api/message', controller.message.listMessage); // 获取留言列表
  router.get('/api/message/noComment', controller.message.getNotCommentMessage); // 获取留言列表
  router.get('/api/message/:id', controller.message.getMessageById); // 获取留言详情
  router.get('/api/user/message/:userId', controller.message.getMessageListByUserId); // 获取某个用户的留言
  router.post('/api/message', controller.message.createMessage); // 创建留言
  router.delete('/api/message', controller.message.deleteMessage); // 删除留言或评论
  router.put('/api/message', controller.message.updateMessage); // 编辑消息

  router.put('/api/comment', controller.comment.updateComment); // 编辑评论
  router.post('/api/comment', controller.comment.createComment); // 创建评论
  router.get('/api/comment/:id', controller.comment.getReplyListByUserId); // 获取某个用户的评论

};
