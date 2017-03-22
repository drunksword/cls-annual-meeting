# 概述

> 为公司年会写的小项目，主要功能为弹幕、聊天室和节目投票。前端使用Vue框架，聊天室功能基于websocket，后台由nodeJs实现。

## 使用方法

首先确保你已安装npm和nodeJs，安装方法自行google

下载项目，从命令行进入项目目录
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

打开另一个命令行窗口，同样进入项目目录
``` bash
# start server
node server/index.js
```

## 主要界面图示
<br/>
<img height='300px' width='auto' style='display:inline' src='https://github.com/soggotheslitherer/cls-annual-meeting/blob/master/static/danmu.png'/>
<img height='300px' width='auto' style='display:inline' src='https://github.com/soggotheslitherer/cls-annual-meeting/blob/master/static/chat.png'/>
<img height='300px' width='auto' style='display:inline' src='https://github.com/soggotheslitherer/cls-annual-meeting/blob/master/static/vote.png'/>

## 总结

由于一些其他原因没在年会上正式使用，也没经过系统的测试，所以距离完善还有一定差距。但功能总算是完成了，自己从中也学到不少东西，日后类似功能就可以以此为基础构建。希望能对你有帮助吧。
