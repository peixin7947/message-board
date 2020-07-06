'use strict';

module.exports = {
  validateObj(type) {
    const { ctx } = this;
    let obj = {};
    switch (type) {
      case '_id': {
        obj = ctx.Joi.string().regex(/^[a-f\d]{24}$/i);
        break;
      }
      default: break;
    }
    return obj;
  },
};
