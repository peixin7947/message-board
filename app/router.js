'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index); // 首页跳转
  router.post('/register', controller.auth.register); // 注册用户
  router.post('/user', controller.user.create); // 添加一个用户
  router.post('/login', controller.auth.login); // 登录用户
  router.get('/api/information', controller.user.getUserInformation); // 获取用户信息
  router.post('/api/information', controller.user.updateUserInformation); // 更新用户信息
  router.post('/api/avatar/upload', controller.user.uploadAvatar); // 上传用户头像
  router.get('/api/:id/password', controller.user.updateUserPassword); // 修改用户密码
  router.post('/api/logout', controller.auth.logout); // 用户退出登录
  router.get('/api/message', controller.message.listMessage); // 获取留言
  router.put('/api/message/:id', controller.message.createMessage); // 创建留言
  router.put('/api/reply', controller.message.createReply); // 创建评论
  router.delete('/api/message', controller.message.deleteMessage); // 删除消息


};
