import io from 'socket.io-client'
import CommonUtil from '../util/util.js'

const {nodeServer} = require('../config.js')
const VOTE = {
  voteCount: 0,
  votePeople: 0,
  onlineCount: 0,
  voteDetail: [{num: 0}, {num: 0}, {num: 0}, {num: 0}, {num: 0}],
  socket: null,
  con: null,
  showRank: true,

  init: function (con) {
    if(this.socket != null){
      return
    }
    this.con = con
    this.socket = io.connect('ws://' + nodeServer)

    this.socket.emit('loginVote', {UUID: localStorage.UUID})
    //  心跳包Heartbeat，30s左右无数据浏览器会断开连接
    setInterval(() => {
      this.socket.emit('heartbeat', 1)
    }, 10000)
    this.socket.on('heartbeat', function(){
      //do nothing
    })

    this.socket.on('hasVote', function (obj) {
      con.$store.state.voteProList = obj.uniqueVote
    })

    this.socket.on('voteInfo', function (obj) {
      VOTE.votePeople = obj.votePeople
      // 动画效果
      countUp(0, obj.voteDetail, 1500, VOTE.voteDetail)
      VOTE.voteCount = 0
      for (var i = obj.voteDetail.length - 1; i >= 0; i--) {
        VOTE.voteCount += obj.voteDetail[i].num
      }
    })

    this.socket.on('voteChange', function (obj) {
      VOTE.votePeople = obj.votePeople
      VOTE.voteCount = 0
      for (var i = obj.voteDetail.length - 1; i >= 0; i--) {
        VOTE.voteCount += obj.voteDetail[i].num
        VOTE.voteDetail[i].num = obj.voteDetail[i].num
      }
    })

    this.socket.on('loginChange', function (obj) {
      VOTE.onlineCount = obj.onlineCount
    })

    this.socket.on('voteError', function (obj) {
      CommonUtil.showToast(obj.message)
    })

    this.socket.on('goChat', function () {
      VOTE.con.$router.push('/chatInfo')
    })
    this.socket.on('hideRank', function () {
      VOTE.showRank = !VOTE.showRank
      if(VOTE.showRank){
        VOTE.getVoteInfo()
      }else{
        VOTE.voteDetail = [{num: 0}, {num: 0}, {num: 0}, {num: 0}, {num: 0}]
      }
    })
  },

  getVoteInfo: function () {
    this.socket.emit('getVoteInfo', null)
  },

  vote: function (proId) {
    this.socket.emit('vote', {proId: proId})
  }
}

// 投票柱形图的动画效果
function countUp (startVal, endValList, duration, voteCount) {
  var startTime = 0
  var progress, value
  function startCount (timestamp) {
    if (!startTime) {
      startTime = timestamp
    }
    progress = timestamp - startTime
    for (var i = 0; i < endValList.length; i++) {
      value = startVal + (endValList[i].num - startVal) * (progress / duration)
      value = (value > endValList[i].num) ? endValList[i].num : value
      voteCount[i].num = value.toFixed(0)
    }
    progress < duration && window.requestAnimationFrame(startCount)
  }
  window.requestAnimationFrame(startCount)
}

export default VOTE
