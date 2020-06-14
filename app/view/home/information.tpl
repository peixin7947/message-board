<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8"/>
    <title>AMIS Demo</title>
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
      "type": "page",
      "initApi": "",
      "title": "标题",
      "body": [
        {
          "type": "html",
          "html": "<style>body{background-image: url('/static/images/hero1.jpeg')}</style>"
        },
        {
          "type": "image",
          "value": "/static/images/logo.png"
        },
        {
          "type": "panel",
          "title": "简介",
          "body": [
            "Make you and your friends play games like in a LAN.",
            "This needs Games with LAN Mode"
          ]
        },
        {
          "type": "panel",
          "title": "Links",
          "body": "Online user: ${online}. More info refer to below links",
          "actions": [
            {
              "type": "button",
              "label": "Discord",
              "level": "info",
              "actionType": "link",
              "link": "https://discord.gg/zEMCu5n"
            },
            {
              "type": "button",
              "label": "LAN Play Client on Github",
              "level": "info",
              "actionType": "link",
              "link": "https://github.com/spacemeowx2/switch-lan-play"
            },
            {
              "type": "button",
              "label": "Status website",
              "level": "info",
              "actionType": "link",
              "link": "http://lan-play.com/"
            },
            {
              "type": "button",
              "level": "success",
              "label": "Login",
              "actionType": "link",
              "link": "login"
            }
          ]
        }
      ]
    });
  })();
</script>
</body>
</html>
