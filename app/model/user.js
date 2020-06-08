'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    nickname: { type: String },
    createTime: { type: Date, default: Date.now() },
    email: { type: String },
    avatar: { type: String },
    intro: { type: String },
    age: { type: Number, min: 0, max: 120 },
  });
  return mongoose.model('User', UserSchema, 'user');
};
