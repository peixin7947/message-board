'use strict';

module.exports = {
  validataObj(type) {
    const { ctx, app } = this;
    let obj = {};
    switch (type) {
      case '_id': {
        obj = ctx.Joi.string().regex(/^[a-e\d]{24}$/i);
        break;
      }
      case 'user': {
        break;
      }
    }
    return obj;
  },
};
