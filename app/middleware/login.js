'use strict';

module.exports = options => {
  return async function login(ctx, next) {
    // 已登录，登录注册相关的放行
    if ((ctx.session[options.LOGIN_FIELD]) || [ '/', '/api/time', '/login', '/register', '/api/resetPassword', '/index' ].includes(ctx.request.originalUrl)) {
      return await next();
    }
    // 若未登录，则进行拦截
    ctx.throw(400, '未登录,请先进行登录');
  };
};
