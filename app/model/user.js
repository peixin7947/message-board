'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    nickname: {
      type: String,
    },
    createTime: { type: Date, default: Date.now },
    email: {
      type: String,
      default: '无',
    },
    sex: {
      type: Number,
    },
    avatar: {
      type: String,
      default: '/static/images/avatar.png',
    },
    intro: {
      type: String,
      default: '无',
    },
    age: { type: Number, min: 0, max: 120 },
  });
  return mongoose.model('User', UserSchema, 'user');
};
