'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');

describe('测试/extend/helper.test.js', () => {
  describe('测试helper', () => {
    it('validateObj方法测试', async () => {
      const ctx = app.mockContext();
      assert(ctx.helper.validateObj('_id'));
      assert(ctx.helper.validateObj(null));
    });
  });
});
