'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  config.keys = `${appInfo.name}asfqwgtwqgerherfrgbdb`;

  config.view = {
    defaultViewEngine: 'nunjucks',
    root: [
      path.join(appInfo.baseDir, 'app/public'),
      path.join(appInfo.baseDir, 'app/public/html'),
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/messageboard',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
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

  config.cors = {
    origin: '*',
    allowMethods: 'GET,POST,PUT,DELETE',
  };

  config.middleware = [ 'responseHandler', 'login' ];

  config.security = {
    csrf: {
      enable: false,
      // useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      ignore: [ '/api/time' ],
    },
    domainWhiteList: [ '127.0.0.1' ],
  };

  config.login = {
    LOGIN_FIELD: 'userInfo',
    ignore(ctx) {
      if ([ '/register', '/login' ].includes(ctx.request.path)) return true;
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

  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000 * 10, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true,
  };

  config.test = {
    cookie: [ 'EGG_SESS=XJpT4RG8dYqJNYFCqMTRsHrudjVxfs1iDJihtPITYTDuXAzuzwKIzQJo09T8XyE7iODfUhRrTDhAbHrMWvG4_-FAullMTh1axHvDldEAtKWECcfqohWSRYzZcUS5jqRZoNz6_fFYuma_NV1hu14HNJX8IUyJ8idmadMYIowntvgppOXh6_rCgY1oqLrRdcez0-dVizgbdc644Y8KmRsZI8x48xWm-RtKVVf4lv3QDQU6UZZ5yUhasJ22DpH2rQ1x99qe84M6TKnij2g64UgXv49zrGfe5JcwbnCUQvUwaHbsfVbCgehNCWHRbtlrGcVmiJYQMjpKaBRToNfYu0SSn29GK_Yl02QMDVacOLGiqYJdSid49vR1kHpW405uhybZRYZqkITb_1sd3dLu2m9HbmNA506pRKrZZHgB4RFdumMN3SgcEcUQWdEvM2duaGrRQ9x_jcjvw-AI8moP-Dty7mjjd8m1MNWPpfck5QZtogyfFN97HGimupIV6219WGp4YdgWuC3g8CYQodgTZIQjWHkVH2vdkt4COo4Drf_qpdbmUAwDs0c3mF675Ag-zvI_MM09aZC2HeG5g3VqC5JBthEAP6Yh6tE9eYmvVIRcLr--e_feDueUcS6QZVPDkpNWNOTxfk-brOSEbMheyRFG-PotA5WuQPwNzU8JPmNeOxE=' ],
  };
  return config;

};
