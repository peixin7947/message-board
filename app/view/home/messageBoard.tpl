<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8"/>
    <title>留言板</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
    <link rel="stylesheet" href="/static/amis/sdk.css"/>
    <style>
        html,
        body,
        .app-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
<div id="root" class="app-wrapper"></div>
<script src="/static/amis/sdk.js"></script>
<script type="text/javascript">
  (function() {
    var amis = amisRequire('amis/embed');
    amis.embed('#root', {
      'type': 'page',
      'initApi': '/indexView?url=${url}',
      // 'title': '个人空间',
      'aside': [
        {
          'type': 'icon',
          'className': 'm-l-xxl padder-v-sm',
          'icon': 'space-shuttle',
        },
        {
          'type': 'plain',
          'className': 'text-lg',
          'text': '导航栏',
        },
        {
          'type': 'nav',
          'stacked': true,
          'className': 'h-full ',
          'links': [
            {
              'label': '个人信息',
              'to': '?url=information',
            },
            {
              'label': '留言板',
              'to': '?url=message',
              // "icon": "fa fa-user",
            },
            {
              'label': '设置',
              'to': '/',
            }
          ]
        } ],
      'body': [
        '${data}'
      ]
    });
  })();
</script>
</body>
</html>
