import io from 'socket.io-client'

console.log('Socket JS loaded')

const VOTE = {
  wxOpenId:'',
  voteDetail:null,
  voteCount:0,
  votePeople:0,
  socket:null

  init:function(){
    this.socket = io.connect('wss://vote.clschina.com')

    this.socket.emit('login', {wxOpenId:this.wxOpenId})

    this.socket.on('voteChange', function(obj){
      VOTE.voteCount = obj.voteCount
      VOTE.votePeople = obj.votePeople
    })

    this.socket.on('loginChange', function(obj)){
      // do nothing
    }
  }

  logout:function(){
    this.socket.disconnect()
  }
}

export default VOTE
