import io from 'socket.io-client'

console.log('Socket JS loaded')

var endPointURL = 'ws://' + window.location.host + '/nianhui2016/chat'
var voteClient = io.connect(endPointURL)

export default voteClient
