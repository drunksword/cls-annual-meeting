var app = require('express')();
// var https = require('https').Server(options,app);
var http = require('http').Server(app);
var io = require('socket.io')(http);
const danmuOrder = require('./order.js')

app.get('/', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});

var voteDetail = [{num: 21}, {num: 78}, {num: 90}, {num: 40}, {num: 56}]; // test data
//已投票人数
var votePeople = 80; // test data
var onlineCount = 0;
var onlineUsers = {};
//具体个人的投票情况
var votePersonDetail = {};

io.on('connection', function(socket){
	//监听新用户加入
	socket.on('loginVote', function(obj){
		if(!obj.UUID){
			return
		}
		socket.voteId = obj.UUID;
		io.emit('loginChange', {onlineCount: onlineCount});

		if(!votePersonDetail.hasOwnProperty(obj.UUID)) {
			votePersonDetail[obj.UUID] = [0, 0, 0, 0, 0]
		}
		var uniqueVote = votePersonDetail[obj.UUID]
		socket.emit('hasVote', {uniqueVote: uniqueVote}); //回复已投票情况
	});

	socket.on('getVoteInfo', function(){
		socket.emit('voteInfo', {voteDetail: voteDetail, onlineCount: onlineCount, votePeople: votePeople});
	})

	//监听用户投票/取消投票
	socket.on('vote', function(obj){
		var proId = obj.proId
		var voteArray = votePersonDetail[socket.voteId]
		var voteCount = 0
		for(var i=0;i<voteArray.length;i++){
			voteCount += voteArray[i]
		}
		if(voteCount >= 3 && voteArray[proId] == 0){ // 投票数已达到3票,且仍要投票
			socket.emit('voteError', {message: '您只能投最多3票。'})
			return
		}
		if(voteCount == 1 && voteArray[proId] == 1){  // 仅投了一票且还要取消该票
			votePeople--
		}
		if(voteCount == 0){
			votePeople++
		}
		voteArray[proId] = (voteArray[proId]+1)%2

		voteDetail[proId].num += (votePersonDetail[socket.voteId][proId] == 1) ? 1: -1
		io.emit('voteChange', {votePeople: votePeople, voteDetail: voteDetail})
	})

	socket.on('heartbeat', function () {
		socket.emit('heartbeat', 1)
	})

	//监听新用户加入
	socket.on('loginChat', function(obj){
		if(!obj.UUID){
			return
		}
		console.log(obj.username+'加入了聊天室');
		//将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
		socket.chatId = obj.UUID;
		if(!onlineUsers.hasOwnProperty(obj.UUID)) {
			onlineUsers[obj.UUID] = obj;
			onlineCount++;
			//向所有客户端广播用户加入
			io.emit('loginChat', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj, login: true});
		}
	});

	//监听用户退出
	socket.on('disconnect', function(){
		//将退出的用户从在线列表中删除
		if(onlineUsers.hasOwnProperty(socket.chatId)) {
			//退出用户的信息
			var obj = {UUID:socket.chatId, username:onlineUsers[socket.chatId].username};

			//删除
			delete onlineUsers[socket.chatId];
			//在线人数-1
			onlineCount--;

			//向所有客户端广播用户退出
			io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj,logout: true});
			io.emit('loginChange', {onlineCount: onlineCount});
			console.log(obj.username+'断开了连接');
		}
	});

	//监听更改信息
	socket.on('changeInfo', function(obj){
		io.emit('changeInfo', obj);
		console.log(obj.username+'更改了信息');
	});
	//监听用户发布聊天内容
	socket.on('message', function(obj){
		console.log(obj.username+'说：'+obj.msg);
		if(danmuOrder.hasOwnProperty(obj.msg)){
			io.emit(danmuOrder[obj.msg], 1)
			return
		}
		io.emit('message', obj);
		
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
