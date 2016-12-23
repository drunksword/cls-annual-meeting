import io from 'socket.io-client'

console.log('Socket JS loaded')

const VOTE = {
  voteCount: 0,
  votePeople: 0,
  onlineCount: 0,
  voteDetail: null,
  socket: null,

  init: function () {
    this.socket = io.connect('ws://localhost:3000')
    if (!window.localStorage.UUID) {
      window.localStorage.UUID = guid()
    }

    this.socket.emit('login', {UUID: window.localStorage.UUID})

    this.socket.on('login', function (obj) {
      console.log('login:' + obj.voteDetail[0].num + ',votePeople:' + obj.votePeople)
      VOTE.voteCount = obj.voteCount
      VOTE.votePeople = obj.votePeople
      VOTE.voteDetail = obj.voteDetail
    })

    this.socket.on('voteChange', function (obj) {
      console.log('voteChange:' + obj.voteDetail + ',votePeople:' + obj.votePeople)
      VOTE.voteCount = obj.voteCount
      VOTE.votePeople = obj.votePeople
      VOTE.voteDetail = obj.voteDetail
    })

    this.socket.on('loginChange', function (obj) {
      console.log('loginChange:' + obj.onlineCount)
      VOTE.onlineCount = obj.onlineCount
    })
  },

  logout: function () {
    this.socket.disconnect()
  }
}

function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16).substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}

export default VOTE
