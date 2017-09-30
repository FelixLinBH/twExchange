var currentEx = require('./lib/currentExchange.js');

var bank = [
"cathaybk",
"fubonbk",
"megabk",
"twbk",
"chbbk",
"esunbk",
"taishinbk",
"hncbbk",
"tcbbk",
"ctbcbk",
"feibbk",
"sinopacbk",
"kgibk",
"tcbk",
"entiebk",
// "scsbbk",
"dbsbk",
"netbk",
"hsbcbk",
"firstbk"];

var redis = require("redis");
var CronJob = require('cron').CronJob;
var Compress = require('lz-string');
var t = require('bluebird');
t.promisifyAll(redis.RedisClient.prototype);

var writeClient = redis.createClient({
    retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
});

var readClient = redis.createClient({
    retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
});


// broadcastJob
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var path = require("path");
app.use( bodyParser.json() );       // to support JSON-encoded bodies
//app.use(express.static(__dirname+'/public'));

//app.get('/', function(req, res){
//  res.sendFile(path.join(__dirname+'/public/index.html'));
//});

// app.post('/subscription', function(req, res){
// 	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
// 	console.log('ip=>'+ ip );
// 	console.log('body=>' + req.body.email);
//   res.send('<h1>subscription</h1>');

// });

var io = require('socket.io')(http);

http.listen(3000, function(){
  console.log('listening on *:3000');
});


// 變動時前端 socket 資料
var broadcastJob = new CronJob({
  cronTime: '* * * * * *',
  onTick: function() {
     broadcastRequest();
     getCurrentChangeAndWriteRedis();
  
  },
  onComplete: function(){
  	console.log("broadcastJob complete");
  	//need restart job
  	broadcastJob.start();
  },
  start: true,
  timeZone: 'Asia/Taipei'
})


//Function
function getCurrentChangeAndWriteRedis(){
	if (!isOpenTime()) {
		return;
	}
	bank.forEach(function(data,index){
		currentEx.getCurrentExChange(data,function(kbank,json){
			var jsonObj = JSON.stringify(json);
			var compressString = Compress.compressToUTF16(jsonObj);
			writeClient.mset(kbank, compressString );
		})
	})
}

function broadcastRequest(){
	var allData = {};
	var current = t.resolve();
	t.map(bank,function (item) {
		current = current.then(function () {
	        return readClient.getAsync(item).then(function(res) {
			    // var source = Compress.decompressFromUTF16(res);
				// allData[item] = source;
				// 前端解
				allData[item] = res;
			});
	    });
	    return current;
	}).then(function () {
		io.sockets.emit('message',  allData );
	}).then(function(){
		//時間內外才跑
		if (!isOpenTime()) {
			io.sockets.emit('event',  'end' );
		}
	}).catch(function (e) {
		console.log("broadcastRequest error!");
	    console.log(e);
	    readClient.quit();
	});
}

function isOpenTime(){
	now = new Date();
	days = now.getDay();
	hours = now.getHours();
	if (days == 0 || days == 6) {
		return false;
	}
	if (hours > 17) {
		return false;
	}
	if (hours < 9) {
		return false;
	}
	return true;
}






