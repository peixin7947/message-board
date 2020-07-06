'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
const Joi = require('joi');
const _ = require('lodash');

describe('测试/extend/context.test.js', () => {

  describe('测试context', () => {
    it('Joi对象测试', async () => {
      const ctx = app.mockContext();
      assert(ctx.Joi === Joi);
    });
    it('lodash对象测试', async () => {
      const ctx = app.mockContext();
      assert(ctx._ === _);
    });
    it('validate方法测试', async () => {
      const ctx = app.mockContext();
      // 正确校验
      const test1 = ctx.validate({ username: ctx.Joi.string() }, { username: 'test' });
      assert(test1.username === 'test');
      // 校验失败
      return assert.rejects(async () => {
        // 测试代码
        await ctx.validate({ username: ctx.Joi.string() }, { username: 111 });
      }, /ValidationError:/);
    });
  });
});
