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
"scbk",
"scsbbk",
"dbsbk",
"netbk",
"hsbcbk",
"firstbk"];

var redis = require("redis");
var CronJob = require('cron').CronJob;
var Compress = require('lz-string');
var parser = require('cron-parser');
var t = require('bluebird');
t.promisifyAll(redis.RedisClient.prototype);


try {
  var currentInterval = parser.parseExpression('* * * * * *');
  var endInterval = parser.parseExpression('00 00 14 * * *');

  console.log('Date: ', currentInterval.next()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date: ', endInterval.next()); // Sat Dec 29 2012 00:44:00 GMT+0200 (EET)

  // console.log('Date: ', interval.prev().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date: ', interval.prev().toString()); // Sat Dec 29 2012 00:40:00 GMT+0200 (EET)
} catch (err) {
  console.log('Error: ' + err.message);
}

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
var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(client){
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});

server.listen(3000);


// 變動時前端 socket 資料
var broadcastJob = new CronJob({
  cronTime: '* * * * * 1-5',
  onTick: function() {
     broadcastRequest();
     console.log('broadcastJob ticked');
  },
  onComplete: function(){
  	console.log("broadcastJob complete");
  },
  start: false,
  timeZone: 'Asia/Taipei'
})
// broadcastJob.start(); // job 1 started

//變動時取得新資料
var dataJob = new CronJob({
  cronTime: '* * * * * 1-5',
  onTick: function() {
     getCurrentChangeAndWriteRedis();
     console.log('dataJob ticked');
  },
  onComplete: function(){
  	console.log("dataJob complete");
  },
  start: false,
  timeZone: 'Asia/Taipei'
})
// dataJob.start(); // job 1 started

//不變動期間資料
var notOpenBroadcastJob = new CronJob({
  cronTime: '* * * * * *',
  onTick: function() {
     // notOpenbroadcastRequest();
     console.log('notOpenBroadcastJob ticked');
  },
  onComplete: function(){
  	console.log("notOpenBroadcastJob complete");
  },
  start: false,
  timeZone: 'Asia/Taipei'
})
// notOpenBroadcastJob.start(); // job 1 started
// broadcastJob


//Time controller
var startTimerController = new CronJob({
	cronTime: '00 00 09 * * 1-5',
	onTick: function(){
		if (notOpenBroadcastJob.running) {
			notOpenBroadcastJob.stop();
		}
		
		broadcastJob.start();
		dataJob.start(); 
	},onComplete: function(){
		console.log("startTimerController complete");
	},
	start: true,
 	timeZone: 'Asia/Taipei'
})

var endTimerController = new CronJob({
	cronTime: '00 00 16 * * 1-5',
	onTick: function(){
		if (broadcastJob.running) {
			broadcastJob.stop();
		}
		if (dataJob.running) {
			dataJob.stop(); 
		}
		if (dataJob.running == undefined) {
			notOpenBroadcastJob.start();
		}
		
	},onComplete: function(){
		console.log("endTimerController complete");
	},
	start: true,
 	timeZone: 'Asia/Taipei'
})


//Function
function getCurrentChangeAndWriteRedis(){
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
		var currentInterval = parser.parseExpression('* * * * * *');
		var endInterval = parser.parseExpression('00 00 14 * * *');

		io.sockets.emit('event',  'end' );

	}).catch(function (e) {
		console.log("broadcastRequest error!");
	    console.log(e);
	    readClient.quit();
	});
}

// function broadcastRequest(){
// 	var allData = {};
// 	var current = t.resolve();
// 	t.map(bank,function (item) {
// 		current = current.then(function () {
// 	        return readClient.getAsync(item).then(function(res) {
// 			    // var source = Compress.decompressFromUTF16(res);
// 				// allData[item] = source;
// 				// 前端解
// 				allData[item] = res;
// 			});
// 	    });
// 	    return current;
// 	}).then(function () {
// 		 io.sockets.emit('message',  allData );
// 	}).catch(function (e) {
// 		console.log("broadcastRequest error!");
// 	    console.log(e);
// 	    readClient.quit();
// 	});
// }





// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

// client.on("error", function (err) {
//     console.log("Error " + err);
// });




// const { Pool, Client } = require('pg')

// const pool = new Pool({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'exrate',
//   password: 'tys55661',
//   port: 5432,
// })

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

// const client = new Client({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'exrate',
//   password: 'tys55661',
//   port: 5432,
// })
// client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })



