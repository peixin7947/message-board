'use strict';

module.exports = options => {
  return async function login(ctx, next) {
    if ((ctx.session[options.LOGIN_FIELD]) || [ '/', '/login/view', '/register/view' ].includes(ctx.request.originalUrl)) {
      return await next();
    }

    ctx.throw(401, { msg: '未登录' });


  };
};
