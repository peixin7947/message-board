'use strict';

module.exports = options => {
  return async function login(ctx, next) {
    // 已登录，登录注册相关的放行
    if ((ctx.session[options.LOGIN_FIELD]) || [ '/', '/login/view', '/register/view', '/login', '/register' ].includes(ctx.request.originalUrl)) {
      return await next();
    }
    // 若未登录，则进行拦截
    ctx.throw(401, '未登录');

  };
};
