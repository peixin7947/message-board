const path = require('path');
module.exports = appinfo => {
    const config = exports = {};

    config.keys = `${appinfo.name}<此处改为你自己的 Cookie 安全字符串>`;

    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        },
    };

    config.mongoose = {
        client: {
            url: 'mongodb://127.0.0.1/messageboard',
            options: {
                useNewUrlParser: true,
            },
        }
    };

    config.static = {
        prefix: '/',
        dir: [
            path.join(appinfo.baseDir, 'app/public')
        ]
    }


    config.middleware= [    ];
  
    config.security= {
      useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      csrf: {
        enable: true,
      },
    };

    return config;

}