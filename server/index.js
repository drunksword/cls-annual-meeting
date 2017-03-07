var app = require('express')();
// var https = require('https').Server(options,app);
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});

//投票详情
var voteDetail = [{num: 21}, {num: 78}, {num: 90}, {num: 40}, {num: 56}]; // test data
//已投票人数
var votePeople = 80; // test data
//在线人数
var onlineCount = 0;
//在线用户
var onlineUsers = {};
// var onlineUUID = {};
//具体个人的投票情况
var votePersonDetail = {};

io.on('connection', function(socket){
	console.log('a user connected');
	
	//监听新用户加入
	socket.on('login', function(obj){
		//将新加入用户的唯一标识当作socket的名称，后面会用到
		socket.name = obj.UUID;
		// if(!onlineUUID.hasOwnProperty(obj.UUID)){
		// 	//在线人数+1
		// 	onlineCount++;
		// 	onlineUUID[obj.UUID] = 1;
		// }
		//向所有客户端广播在线人数
		io.emit('loginChange', {onlineCount: onlineCount});
		console.log(obj.UUID+'进入了直播间');

		if(!votePersonDetail.hasOwnProperty(socket.name)) {
			votePersonDetail[socket.name] = [0, 0, 0, 0, 0]
		}
		var uniqueVote = votePersonDetail[socket.name]
		socket.emit('hasVote', {uniqueVote: uniqueVote}); //回复已投票情况
	});

	socket.on('getVoteInfo', function(){
		socket.emit('voteInfo', {voteDetail: voteDetail, onlineCount: onlineCount, votePeople: votePeople});
	})

	//监听用户退出
	// socket.on('disconnect', function(){
	// 	// if(onlineUUID.hasOwnProperty(socket.name)){
	// 	// 	onlineCount--;
	// 	// 	delete onlineUUID[socket.name]
	// 	// }
	// 	//向所有客户端广播在线人数
	// 	io.emit('loginChange', {onlineCount: onlineCount});
	// 	console.log(socket.name+'退出了直播间');
	// })

	//监听用户投票/取消投票
	socket.on('vote', function(obj){
		var proId = obj.proId
		var voteArray = votePersonDetail[socket.name]
		var voteCount = 0
		for(var i=0;i<voteArray.length;i++){
			voteCount += voteArray[i]
		}
		if(voteCount >= 3 && voteArray[proId-1] == 0){ // 投票数已达到3票,且仍要投票
			socket.emit('voteError', {message: '您只能投最多3票。'})
			return
		}
		if(voteCount == 1 && voteArray[proId-1] == 1){  // 仅投了一票且还要取消该票
			votePeople--
		}
		if(voteCount == 0){
			votePeople++
		}
		voteArray[proId-1] = (voteArray[proId-1]+1)%2

		voteDetail[proId-1].num += (votePersonDetail[socket.name][proId-1] == 1) ? 1: -1
		io.emit('voteChange', {votePeople: votePeople, voteDetail: voteDetail})
	})

	//监听新用户加入
	socket.on('Login', function(obj){
		//将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
		socket.name = obj.userid;

		//检查在线列表，如果不在里面就加入
		if(!onlineUsers.hasOwnProperty(obj.userid)) {
			onlineUsers[obj.userid] = obj;
			//在线人数+1
			onlineCount++;
		}

		//向所有客户端广播用户加入
		io.emit('Login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj,login:true});
		console.log(obj.username+'加入了聊天室');
	});

	//监听用户退出
	socket.on('disconnect', function(){
		//将退出的用户从在线列表中删除
		if(onlineUsers.hasOwnProperty(socket.name)) {
			//退出用户的信息
			var obj = {userid:socket.name, username:onlineUsers[socket.name]};

			//删除
			delete onlineUsers[socket.name];
			//在线人数-1
			onlineCount--;

			//向所有客户端广播用户退出
			io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj,logout:true});
			console.log(obj.username+'退出了聊天室');
			io.emit('loginChange', {onlineCount: onlineCount});
			console.log(socket.name+'退出了直播间');
		}
	});

	//监听更改信息
	socket.on('changeInfo', function(obj){
		//向所有客户端广播发布的消息
		io.emit('changeInfo', obj);
		console.log(obj.username+'更改了信息');
	});
	//监听用户发布聊天内容
	socket.on('message', function(obj){
		//向所有客户端广播发布的消息
		io.emit('message', obj);
		console.log(obj.username+'说：'+obj.msg);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
// https.createServer(options).listen(3000, function () {
//     console.log('Https server listening on port ' + 3000);
// });
// https.createServer(options,function(req,res){
// 	res.writeHead(200);
// 	res.end('hello world\n');
// }).listen(3000,'127.0.0.1');