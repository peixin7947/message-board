'use strict';
const Joi = require('joi');
const JOI = Symbol('Context#Joi');
const _ = require('lodash');

module.exports = {
  validate(schema, valueObj = Object.assign(this.request.body, this.query, this.params)) {
    const { error, value } = Joi.validate(valueObj, schema);
    if (!error) return value;
    error.errors = error.message;
    this.throw(422, error);
  },
  get Joi() {
    if (!this[JOI]) this[JOI] = Joi;
    return this[JOI];
  },

  get _() {
    return _;
  },
};
