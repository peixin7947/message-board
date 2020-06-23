'use strict';

module.exports = () => {
  return async function responseHandler(ctx, next) {
    // 登录注册相关的放行
    if ([ '/', '/login/view', '/register/view', '/login', '/register' ].includes(ctx.request.originalUrl)) {
      return await next();
    }
    try {
      await next();
    } catch (err) {
      const res = {
        code: err.code || 1, // 0为正常业务逻辑，1为业务错误, 2为服务端出错
        msg: err.msg || err.message || '该错误无错误说明',
        data: err.data,
      };
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;

      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;
      // 从 error 对象上读出各个属性，设置到响应中
      res.msg = error;

      // 参数校验错误
      if (status === 422) {
        res.msg = err.errors;
      }

      ctx.status = status;
      ctx.response.body = res;
      return ctx.response.body;
    }


    if ([ 200, 204 ].includes(ctx.status)) {
      if (ctx.status === 204) ctx.status = 200;
      // 如果_pure字段为true，则不是渲染的数据，不需要添加字段
      ctx.response.body = {
        code: 0,
        msg: 'success',
        data: ctx.response.body,
      };
    }
  };
};
