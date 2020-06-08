<!DOCTYPE html>
<html lang="zh-CN">

    <head>
        <title>注册页面</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!--图标-->
        <link rel="stylesheet" type="text/css" href="/css/font-awesome.min.css">

        <!--布局框架-->
        <link rel="stylesheet" type="text/css" href="/css/util.css">

        <!--主要样式-->
        <link rel="stylesheet" type="text/css" href="/css/main.css">
    </head>

    <body>

        <div class="login">
            <div class="container-login100">
                <div class="wrap-register100">
                    <div class="login100-pic js-tilt" data-tilt>
                        <img src="/img/img-01.png" alt="IMG">
                    </div>

                    <form method="POST" action="/register" class="login100-form validate-form">
                        <input type="hidden" name="_csrf" value="{{ ctx.csrf }}" />
                        <span class="login100-form-title">
                            注册留言板账号
                        </span>
                        <div>
                            <h5 style="text-align: center; color: #ff0000">{{message}}</h5>
                        </div>
                        <div class="wrap-input100 validate-input">
                            <input name="username" class="input100" type="text" placeholder="用户名(长度最少3位)">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div class="wrap-input100 validate-input">
                            <input name="password" class="input100" type="password" placeholder="密码(长度最少6位)">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div class="wrap-input100 validate-input">
                            <input name="rePassword" class="input100" type="password" placeholder="确认密码">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div class="container-login100-form-btn">
                            <button class="login100-form-btn" type="submit">
                                注册
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </body>

</html>
