'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  /**
   * 删除者信息
   * @param {ObjectId} userId 删除留言的用户
   * @param {Date} delTime 删除留言的时间
   * @type {Schema}
   */
  const delSchema = new Schema({
    _id: false,
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    delTime: {
      type: Date,
      default: Date.now,
    },
  });

  /**
   * description 留言集合
   * @param {ObjectId} creator 发布留言的用户
   * @param {Boolean} idDel 留言是否被删除（逻辑删除）
   * @param {Date} createTime 留言时间
   * @param {Date} updateTime 留言更新（编辑）时间
   * @param {String} content 留言内容
   * @param {Array} reply 二级回复内容
   * @param {Object} doDel 删除者
   * @type {module:mongoose.Schema<any>}
   */
  const MessageSchema = new Schema({
    creator: {
      type: Schema.ObjectId,
      ref: 'User',
      index: true,
    },
    tag: {
      type: String,
      enum: [ '分享', '问答' ],
      default: '',
    },
    doDel: {
      type: delSchema,
      default: null,
    },
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: null },
    content: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  }, {
    collection: 'Message',
  });
  return mongoose.model('Message', MessageSchema, 'Message');
};
