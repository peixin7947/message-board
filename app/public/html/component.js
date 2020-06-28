'use strict';

// 导航栏
const nav = {
  label: '导航栏',
  type: 'button',
  level: 'info',
  className: 'w',
  actionType: 'drawer',
  actions: null,
  closeOnEsc: true,
  drawer: {
    title: '导航栏',
    closeOnOutside: true,
    body: [
      {
        type: 'card',
        intiApi: '',
        header: {
          title: '${nickname}',
          subTitle: '${intro | default: 暂无}',
          description: 'description',
          avatarClassName: 'pull-left thumb-md avatar b-3x m-r',
          avatar: '${avatar}',
        },
        actions: [
          {
            type: 'button',
            label: '个人信息',
            level: 'info',
            actionType: 'url',
            blank: false,
            url: '/html/information.html',
          },
          {
            level: 'info',
            blank: false,
            label: '退出登录',
            type: 'button',
            actionType: 'ajax',
            confirmText: '确定退出登录？',
            api: '/api/logout',
            redirect: '/',
            messages: {
              success: '已退出登录',
            },
          },
        ],
      },
      {
        type: 'button-toolbar',
        buttons: [
          {
            type: 'button',
            level: 'info',
            label: '进入留言板',
            className: 'w',
            actionType: 'link',
            link: '/html/messageBoard.html',
          },
          {
            label: '管理留言',
            type: 'button',
            level: 'info',
            className: 'w',
            actionType: 'link',
            link: '/html/manageMessage.html',
          },
        ],
      },
    ],
  },
};

// 发布留言按钮，用于工具栏
const putMessageBtn = {
  type: 'button',
  actionType: 'dialog',
  label: '发布留言',
  level: 'info',
  reload: 'messageList', // 刷新内容
  dialog: {
    title: '写留言',
    body: {
      type: 'form',
      mode: 'horizontal',
      horizontal: {
        leftFixed: 'xs',
      },
      api: {
        url: '/api/message',
        method: 'post',
        data: {
          title: '$title',
          content: '$content',
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
          type: 'text',
          label: '标题',
          name: 'title',
          required: true,
          validations: {
            maxLength: 30,
            notEmptyString: true,
          },
          validationErrors: {
            maxLength: '标题不能超过30个字符哦',
            notEmptyString: '请勿输入空白内容',
          },
        },
        {
          type: 'textarea',
          label: '留言',
          name: 'content',
          required: true,
          validations: {
            maxLength: 1024,
            notEmptyString: true,
          },
          validationErrors: {
            maxLength: '不能超过1024个字符哦',
            notEmptyString: '请勿输入空白内容',
          },
        },
      ],
    },
  },
};

// 个人信息修改弹框
const updateInformationBtn = {
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
      horizontal: {
        leftFixed: 'xs',
      },
      api: {
        url: '/api/information',
        method: 'put',
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
          validations: {
            notEmptyString: true,
          },
          validationErrors: {
            notEmptyString: '请勿输入空字符',
          },
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
          type: 'textarea',
          label: '个人签名',
          name: 'intro',
          validations: {
            maxLength: 256,
          },
          validationErrors: {
            maxLength: '小伙伴，个人签名只能256个字符哦',
          },
        },
      ],
    },
  },
};

// 留言CRUD的内容标哥
const messageCrudFrom = {
  type: 'form',
  mode: '',
  title: '',
  submitText: '',
  controls: [
    {
      // 使用hbox，制作页面在列的分布  框架推荐使用group，但是实现起来效果不佳
      type: 'hbox',
      columns: [
        {
          columnClassName: 'w-xs',
          controls: [
            {
              type: 'card',
              className: ' wrapper-xs h-auto no-border',
              header: {
                className: 'wrapper-md',
                avatarClassName: 'pull-left thumb-xs avatar b-5x m-r',
                avatar: '${creator.avatar}',
              },
              body: '${creator.nickname}',
            },
          ],
        },
        {
          columnClassName: 'w-auto',
          controls: [
            {
              type: 'group',
              title: '',
              direction: 'vertical',
              className: 'w-auto',
              controls: [
                {
                  type: 'static-tpl',
                  // 如果是评论则没有标题
                  visibleOn: 'data.title !== undefined',
                  className: 'font-bold',
                  tpl: '${title}',
                },
                {
                  type: 'static-tpl',
                  // 如果是留言则没有回复
                  visibleOn: 'data.toUser !== undefined',
                  tpl: '<%if(data.toUser) {%>回复：<%= data.toUser.nickname%>&nbsp;&nbsp;&nbsp;&nbsp;<%}%>',
                },
                {
                  type: 'static-tpl',
                  tpl: '$content',
                  // 换行样式
                  className: 'word-break',
                },
                {
                  type: 'static-tpl',
                  className: 'pull-right',
                  tpl: '<%= formatDate(data.createTime, \'YYYY-MM-DD hh:mm:ss\') %>',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const updatePasswordBtn = {
  type: 'button',
  actionType: 'dialog',
  label: '修改密码',
  level: 'info',
  reload: 'informationForm', // 刷新个人信息的内容
  dialog: {
    title: '修改密码',
    body: {
      type: 'form',
      mode: 'horizontal',
      horizontal: {
        leftFixed: 'xs',
      },
      api: {
        url: '/api/information',
        method: 'put',
        data: {
          oldPassword: '$oldPassword',
          newPassword: '$newPassword',
          rePassword: '$rePassword',
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
          type: 'password',
          name: 'oldPassword',
          label: '原密码',
          required: true,
          placeholder: '请输入一个6到24个字符的密码',
          size: 'full',
          validations: {
            minLength: 6,
            maxLength: 24,
            notEmptyString: true,
          },
          validationErrors: {
            minLength: '密码最少为6个字符',
            maxLength: '密码最多为24个字符',
            notEmptyString: '请勿输入空字符',
          },
        },
        {
          type: 'password',
          name: 'newPassword',
          label: '新密码',
          required: true,
          placeholder: '请输入一个6到24个字符的密码',
          size: 'full',
          validations: {
            minLength: 6,
            maxLength: 24,
            notEmptyString: true,
          },
          validationErrors: {
            minLength: '密码最少为6个字符',
            maxLength: '密码最多为24个字符',
            notEmptyString: '请勿输入空字符',
          },
        },
        {
          type: 'password',
          name: 'rePassword',
          label: '确认密码',
          required: true,
          placeholder: '请再次输入密码',
          size: 'full',
          validations: {
            equalsField: 'password',
          },
          validationErrors: {
            equals: '两次输入的密码不一致',
          },
        },
      ],
    },
  },
};
