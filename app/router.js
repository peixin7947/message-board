'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.redirect('/', '/login/view'); // 重定向到留言板页面
  router.get('/register/view', controller.home.register); // 渲染注册页面
  router.get('/login/view', controller.home.login); // 渲染登录页面
  router.post('/register', controller.auth.register); // 注册用户
  router.post('/user', controller.user.create); // 添加一个用户
  router.post('/login', controller.auth.login); // 登录用户
  router.get('/api/information', controller.user.getUserInformation); // 获取用户信息
  router.post('/api/information', controller.user.updateUserInformation); // 更新用户信息
  router.post('/api/avatar/upload', controller.user.uploadAvatar); // 上传用户头像
  router.get('/indexView', controller.home.urlToView); //
  router.get('/api/:id/password', controller.user.updateUserPassword); // 修改用户密码


};
