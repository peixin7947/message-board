'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
const Joi = require('joi');
const _ = require('lodash');

describe('测试/extend/context.test.js', () => {

  describe('测试context', () => {
    it('Joi对象测试', async () => {
      const ctx = app.mockContext({ });
      assert(ctx.Joi === Joi);
    });
    it('lodash对象测试', async () => {
      const ctx = app.mockContext({ });
      assert(ctx._ === _);
    });
  });
});
