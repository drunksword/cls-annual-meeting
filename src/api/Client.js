import io from 'socket.io-client'
import $ from 'jquery'

const CHAT = {
  msgObj: document.getElementsByClassName('body-wrapper')[0],
  username: null,
  userid: null,
  color: null,
  photo: null,
  socket: null,
  onlineCount: 0,
  onlineUsers: [],
  msgArr: [],
  scrollToBottom: function () {
    console.log(document.getElementById('body-wrapper').scrollHeight)
    document.getElementById('body-wrapper').scrollTop = document.getElementById('body-wrapper').scrollHeight
  },
  //  退出，本例只是一个简单的刷新
  logout: function () {
    this.socket.disconnect()
    // location.reload()
  },
  //  提交聊天消息内容
  submit: function (msg) {
    if (msg !== '') {
      let obj = {
        userid: this.userid,
        username: this.username,
        msg: msg,
        color: this.color,
        photo: this.photo
      }
      this.socket.emit('message', obj)
    } else {
      console.log('msg is null')
    }
    return false
  },
  genUid: function () {
    return new Date().getTime() + '' + Math.floor(Math.random() * 899 + 100)
  },
  //  更新系统消息，本例中在用户加入、退出的时候调用
  updateSysMsg: function (o, action) {
    //  当前在线用户列表
    this.onlineUsers = o.onlineUsers
    //  当前在线人数
    this.onlineCount = o.onlineCount
  },
  changeInfo () {
    this.userid = localStorage.getItem('userid')
    this.username = localStorage.getItem('name')
    this.color = localStorage.getItem('color')
    this.weichat = localStorage.getItem('weichat')
    this.photo = localStorage.getItem('photo')
    this.socket.emit('changeInfo', {userid: this.userid, username: this.username, color: this.color, weichat: this.weichat, photo: this.photo})
  },
  init: function () {
    /*
    客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
    实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
    */
    // this.userid = this.genUid()
    this.userid = localStorage.getItem('userid')
    this.username = localStorage.getItem('name')
    this.color = localStorage.getItem('color')
    this.weichat = localStorage.getItem('weichat')
    this.photo = localStorage.getItem('photo')

    if (!this.userid) { return }

    //  连接websocket后端服务器
    this.socket = io.connect('ws://shitao.clschina.com')

    //  告诉服务器端有用户登录
    this.socket.emit('Login', {userid: this.userid, username: this.username, color: this.color, weichat: this.weichat})
    //  心跳包，30s左右无数据浏览器会断开连接Heartbeat
    setInterval(() => {
      this.socket.emit('heartbeat', 1)
    }, 10000)
    //  监听新用户登录
    this.socket.on('Login', function (obj) {
      CHAT.updateSysMsg(obj, 'logout')
      CHAT.msgArr.push(obj)
    })

    this.socket.on('changeInfo', function (o) {
      CHAT.onlineUsers[o.userid] = o
      console.log(o)
    })
    //  监听用户退出
    this.socket.on('logout', function (o) {
      CHAT.updateSysMsg(o, 'logout')
    })
    //  监听消息发送
    this.socket.on('message', function (obj) {
      CHAT.msgArr.push(obj)
      if ((window.navigator.appVersion.match(/iphone/gi) || window.navigator.appVersion.match(/ipad/gi) || window.navigator.appVersion.match(/android/gi)) && !window.navigator.appVersion.match(/windows/gi)) {
        CHAT.scrollToBottom()
      } else {
        var item = {
          'img': obj.photo,
          'info': obj.msg,
          'href': 'javascript:;',
          'close': false,
          'speed': 10,
          'bottom': 0,
          'color': obj.color
        }
        $('body').barrager(item)
      }
    })
  }
}
export default CHAT
