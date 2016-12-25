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
var onlineUUID = {};
//具体个人的投票情况
var votePersonDetail = {};

io.on('connection', function(socket){
	console.log('a user connected');
	
	//监听新用户加入
	socket.on('login', function(obj){
		//将新加入用户的唯一标识当作socket的名称，后面会用到
		socket.name = obj.UUID;
		if(!onlineUUID.hasOwnProperty(obj.UUID)){
			//在线人数+1
			onlineCount++;
			onlineUUID[obj.UUID] = 1;
		}
		//向所有客户端广播在线人数
		io.emit('loginChange', {onlineCount: onlineCount});
		console.log(obj.UUID+'进入了直播间');
	});

	socket.on('getVoteInfo', function(){
		var uniqueVote = null;
		if(votePersonDetail.hasOwnProperty(socket.name)) {//检查投票详情，如果投过票回复投票情况
			uniqueVote = votePersonDetail[socket.name]
		}
		socket.emit('voteInfo', {voteDetail: voteDetail, onlineCount: onlineCount,
		 votePeople: votePeople, uniqueVote: uniqueVote});
	})

	//监听用户退出
	socket.on('disconnect', function(){
		if(onlineUUID.hasOwnProperty(socket.name)){
			onlineCount--;
			delete onlineUUID[socket.name]
		}
		//向所有客户端广播在线人数
		io.emit('loginChange', {onlineCount: onlineCount});
		console.log(socket.name+'退出了直播间');
	})

	//监听用户投票
	socket.on('vote', function(obj){
		var voteProList = obj.voteProList
		var message = ''
		var succ = 0;
		if(voteProList.length < 1 || voteProList.length > 2){
			message = '您只能投最多2票。'
		}else{
			if(votePersonDetail.hasOwnProperty(socket.name)){
				var hasVoteList = votePersonDetail[socket.name]
				if(hasVoteList.length + voteProList.length > 2){
					message = '错误：投票总数超过2票。'
				}else{
					if(voteProList[0] == hasVoteList[0]){
						message = '您重复投了节目' + voteProList[0] + ',请重新投票。'
					}else{
						hasVoteList[1] = voteProList[0]
						succ = 1 
					}
				}
			}else{
				votePersonDetail[socket.name] = voteProList
				succ = 1
				votePeople++
			}
		}
		socket.emit('voteResult', {message: message, succ: succ})
		if(succ == 1){
			for (var i = 0; i < voteProList.length; i++) {
				voteDetail[voteProList[i] - 1].num++
				console.log('节目票数：' + voteDetail[voteProList[i] - 1].num)
			}
			io.emit('voteChange', {votePeople: votePeople, voteDetail: voteDetail})
		}
	})
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