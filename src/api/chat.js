import io from 'socket.io-client'
import $ from 'jquery'

const {nodeServer} = require('../config.js')
const CHAT = {
  msgObj: document.getElementsByClassName('body-wrapper')[0],
  username: null,
  UUID: null,
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
        UUID: this.UUID,
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
  //  更新系统消息，本例中在用户加入、退出的时候调用
  updateSysMsg: function (o) {
    //  当前在线用户列表
    this.onlineUsers = o.onlineUsers
    //  当前在线人数
    this.onlineCount = o.onlineCount
  },
  changeInfo () {
    this.UUID = localStorage.getItem('UUID')
    this.username = localStorage.getItem('name')
    this.color = localStorage.getItem('color')
    this.photo = localStorage.getItem('photo')
    this.socket.emit('changeInfo', {UUID: this.UUID, username: this.username, color: this.color, photo: this.photo})
  },
  init: function () {
    this.UUID = localStorage.getItem('UUID')
    this.username = localStorage.getItem('name')
    this.color = localStorage.getItem('color')
    this.photo = localStorage.getItem('photo')
    if (!this.UUID) { 
      return 
    }

    try{
      this.socket = io.connect('ws://' + nodeServer)
      localStorage.setItem('hasLogined', true)
    }catch(e){
      alert('登录失败：' + e.message)
      return
    }

    //  告诉服务器端有用户登录
    this.socket.emit('Login', {UUID: this.UUID, username: this.username, color: this.color})
    //  心跳包，30s左右无数据浏览器会断开连接Heartbeat
    setInterval(() => {
      this.socket.emit('heartbeat', 1)
    }, 10000)
    //  监听新用户登录
    this.socket.on('Login', function (obj) {
      CHAT.updateSysMsg(obj)
      CHAT.msgArr.push(obj)
    })

    this.socket.on('changeInfo', function (o) {
      CHAT.onlineUsers[o.UUID] = o
    })
    //  监听用户退出
    this.socket.on('logout', function (o) {
      CHAT.updateSysMsg(o)
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
