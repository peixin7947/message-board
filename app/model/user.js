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
      default: '',
    },
    createTime: { type: Date, default: Date.now },
    email: {
      type: String,
      default: '',
    },
    sex: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default: '/static/uploadAvatar/avatar.jpg',
    },
    intro: {
      type: String,
      default: '',
    },
    age: { type: Number, min: 0, max: 120, default: 0 },
  });
  return mongoose.model('User', UserSchema, 'User');
};
