const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  config.keys = `${appInfo.name}<此处改为你自己的 Cookie 安全字符串>`;

  config.view = {
    defaultViewEngine: 'nunjucks',
    root: [
      path.join(appInfo.baseDir, 'app/public/static'),
      path.join(appInfo.baseDir, 'app/public'),
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
    prefix: '/',
    dir: [
      path.join(appInfo.baseDir, 'app/public/static'),
    ],
  };


  config.middleware = [ 'login' ];

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
      if ([ '/static' ].includes(ctx.request.path)) return true;
    },
  };

  return config;

};
