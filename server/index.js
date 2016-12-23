var app = require('express')();
// var https = require('https').Server(options,app);
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});

//在线用户
var voteDetail = [{num: 21}, {num: 78}, {num: 90}, {num: 40}, {num: 56}]; // test data
//当前在线人数
var onlineCount = 0;
//具体个人的投票情况
var votePersonDetail = new Object();
//已投票人数
var votePeople = 0;

io.on('connection', function(socket){
	console.log('a user connected');
	
	//监听新用户加入
	socket.on('login', function(obj){
		//将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
		socket.name = obj.UUID;
		//在线人数+1
		onlineCount++;
		if(votePersonDetail.hasOwnProperty(obj.UUID)) {//检查投票详情，如果投过票回复投票情况
			//向当前客户端发送投票情况
			socket.emit('uniqueVote', {uniqueVote: votePersonDetail[obj.UUID]})
		}
		socket.emit('login', {voteDetail: voteDetail, onlineCount: onlineCount,
		 votePeople: votePeople});

		//向所有客户端广播用户加入
		io.emit('loginChange', {onlineCount: onlineCount});
		console.log(obj.UUID+'进入了直播间');
	});

	//监听用户投票
	// socket.on('')
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