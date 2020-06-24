'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index); // 重定向到留言板页面
  router.get('/register/view', controller.home.register); // 渲染注册页面
  router.get('/login/view', controller.home.login); // 渲染登录页面
  router.post('/register', controller.auth.register); // 注册用户
  router.post('/user', controller.user.create); // 添加一个用户
  router.post('/login', controller.auth.login); // 登录用户
  router.get('/api/information', controller.user.getUserInformation); // 获取用户信息
  router.post('/api/information', controller.user.updateUserInformation); // 更新用户信息
  router.post('/api/avatar/upload', controller.user.uploadAvatar); // 上传用户头像
  router.get('/api/:id/password', controller.user.updateUserPassword); // 修改用户密码
  router.post('/api/logout', controller.auth.logout); // 用户退出登录


};
