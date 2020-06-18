'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async login() {
    await this.ctx.render('auth/login.tpl');
  }

  async register() {
    await this.ctx.render('auth/register.tpl');
  }

  async urlToView() {
    const { ctx } = this;
    const { url } = ctx.query;
    ctx.body = {
      status: 0, data: {
        type: 'form',
        panelClassName: 'panel-primary',
        mode: 'horizontal',
        name: 'informationForm',
        title: '',
        submitText: '',
        initApi: 'get:/api/information',
        silentPolling: 'true',
        actions: [
          {
            type: 'button',
            actionType: 'dialog',
            label: '修改个人信息',
            level: 'info',
            reload: 'informationForm', // 刷新个人信息的内容
            dialog: {
              title: '',
              body: {
                type: 'form',
                mode: 'horizontal',
                // 'horizontal': {
                //   'leftFixed': 'xs'
                // },
                api: {
                  url: '/api/information',
                  method: 'post',
                  data: {
                    all: '$$',
                  },
                },
                actions: [
                  {
                    type: 'submit',
                    label: '提交',
                    primary: true,
                  },
                ],
                controls: [
                  {
                    type: 'divider',
                  },
                  {
                    type: 'text',
                    label: '昵称',
                    name: 'nickname',
                    required: true,
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'image',
                    label: '头像',
                    name: 'avatar',
                    autoUpload: false,
                    reciever: 'post:/api/avatar/upload',
                    multiple: false,
                    // 'maxSize ': '16MB',
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'select',
                    label: '性别',
                    name: 'sex',
                    options: [
                      {
                        label: '男',
                        value: 1,
                      },
                      {
                        label: '女',
                        value: 0,
                      },
                    ],
                    value: '${sex}',
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'email',
                    label: '邮箱',
                    name: 'email',
                    validateOnChange: true,
                    validations: {
                      isEmail: true,
                    },
                    validationErrors: {
                      isEmail: '请输入正确的邮箱地址',
                    },
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'text',
                    label: '年龄',
                    name: 'age',
                    validations: {
                      isInt: true,
                      minimum: 0,
                      maximum: 120,
                    },
                    validationErrors: {
                      isInt: '必须输入数字',
                      minimum: '小伙伴，年龄必须在0到120之间',
                      maximum: '小伙伴，年龄必须在0到120之间',
                    },
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'text',
                    label: '个人签名',
                    name: 'intro',
                  },
                  {
                    type: 'divider',
                  },
                ],
              },
            },
          },
        ],
        controls: [
          {
            type: 'static-tpl',
            label: '用户名',
            tpl: '${username}',
          },
          {
            type: 'divider',
          },
          {
            type: 'static-tpl',
            label: '昵称',
            tpl: '${nickname| default: 暂无}',
          },
          {
            type: 'divider',
          },
          {
            type: 'static-image',
            label: '头像',
            name: 'image',
            src: '${avatar}',
            popOver: {
              title: '查看大图',
              body: '<div class="w-xxl"><img class="w-full" src="${avatar}"/></div>',
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'tpl',
            label: '性别',
            tpl: '${sex|isEquals:1:\'男\':\'女\' | default:暂无}',
          },
          {
            type: 'divider',
          },
          {
            type: 'static-tpl',
            label: '邮箱',
            tpl: '${email | default: 暂无}',
          },
          {
            type: 'divider',
          },
          {
            type: 'static-tpl',
            label: '年龄',
            tpl: '${age | default: 暂无}',
          },
          {
            type: 'divider',
          },
          {
            type: 'static-tpl',
            label: '个人签名',
            tpl: '${intro | default: 暂无}',
          },
          {
            type: 'divider',
          },
          {
            type: 'static-tpl',
            label: '创建日期',
            tpl: "<%= formatDate(data.createTime, 'YYYY-MM-DD') %>",
          },
        ],
      },
    };
  }

}

module.exports = HomeController;
