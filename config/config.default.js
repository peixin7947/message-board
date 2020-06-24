'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  config.keys = `${appInfo.name}asfqwgtwqgerherfrgbdb`;

  config.view = {
    defaultViewEngine: 'nunjucks',
    root: [
      path.join(appInfo.baseDir, 'app/public'),
      // path.join(appInfo.baseDir, 'app/public/html'),
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/messageboard',
      options: {
        useNewUrlParser: true,
      },
    },
  };

  config.static = {
    // 访问静态化的url前缀
    prefix: '/',
    // 需要设置静态化的目录
    dir: [
      path.join(appInfo.baseDir, 'app/public'),
    ],
    // 设置缓存时间，开发时设置为0防止不生效
    maxAge: 0,
  };


  config.middleware = [ 'responseHandler', 'login' ];

  config.security = {
    csrf: {
      enable: false,
      useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    },
  };

  config.login = {
    LOGIN_FIELD: 'userInfo',
    ignore(ctx) {
      if ([ '/login/view', '/register/view', '/register', '/login' ].includes(ctx.request.path)) return true;
      if (ctx.request.path.startsWith('/static/')) return true;
    },
  };

  config.multipart = {
    mode: 'stream',
    whitelist: [ // 允许上传的格式
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
    ],
    fileSize: '5mb', // 最大5mb
  };

  return config;

};
