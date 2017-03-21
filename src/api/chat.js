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
  con: null,
  scrollToBottom: function () {
    document.getElementById('body-wrapper').scrollTop = document.getElementById('body-wrapper').scrollHeight
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
    this.onlineUsers = o.onlineUsers
    this.onlineCount = o.onlineCount
  },
  changeInfo () {
    this.UUID = localStorage.getItem('UUID')
    this.username = localStorage.getItem('name')
    this.color = localStorage.getItem('color')
    this.photo = localStorage.getItem('photo')
    this.socket.emit('changeInfo', {UUID: this.UUID, username: this.username, color: this.color, photo: this.photo})
  },
  init: function (con) {
    if(this.socket != null){
      return
    }
    this.con = con
    this.UUID = localStorage.getItem('UUID')
    this.username = localStorage.getItem('name')
    this.color = localStorage.getItem('color')
    this.photo = localStorage.getItem('photo')
    if (!this.UUID) { 
      return 
    }

    this.socket = io.connect('ws://' + nodeServer)

    //  告诉服务器端有用户登录
    this.socket.emit('loginChat', {UUID: this.UUID, username: this.username, color: this.color})
    //  心跳包Heartbeat，30s左右无数据浏览器会断开连接
    setInterval(() => {
      this.socket.emit('heartbeat', 1)
    }, 10000)
    this.socket.on('heartbeat', function(){
      //do nothing
    })
    //  监听新用户登录
    this.socket.on('loginChat', function (obj) {
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
      var isMobile = (window.navigator.appVersion.match(/iphone/gi) || window.navigator.appVersion.match(/ipad/gi) || window.navigator.appVersion.match(/android/gi)) && !window.navigator.appVersion.match(/windows/gi)
      if (isMobile) {
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
    this.socket.on('goVote', function () {
      var isMobile = (window.navigator.appVersion.match(/iphone/gi) || window.navigator.appVersion.match(/ipad/gi) || window.navigator.appVersion.match(/android/gi)) && !window.navigator.appVersion.match(/windows/gi)
      if (isMobile) {
        CHAT.con.$router.push('/voteHome')
      }
    })
  }
}
export default CHAT
