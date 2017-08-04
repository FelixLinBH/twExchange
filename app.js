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
var client = redis.createClient({
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

var CronJob = require('cron').CronJob;


try {
	var dataJob = new CronJob({
	  cronTime: '* * * * * *',
	  onTick: function() {
	    /*
	     * Runs every weekday (Monday through Friday)
	     * at 11:30:00 AM. It does not run on Saturday
	     * or Sunday.
	     */
	     getCurrentChangeAndWriteRedis();
	     //console.log('job 1 ticked');
	  },
	  onComplete: function(){
	  	console.log("cron complete");
	  	client.quit();
	  },
	  start: false,
	  timeZone: 'Asia/Taipei'
	})
} catch(ex) {
	console.log("cron pattern not valid");
}


dataJob.start(); // job 1 started

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

// client.on("error", function (err) {
//     console.log("Error " + err);
// });

// for (var itemBank in bank){
// 	client.hgetall(itemBank, function (err, obj) {
//     	console.log(obj);
// 	});
// }

// client.set("string key", "string val", redis.print);
// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.hkeys("hash key", function (err, replies) {
//     console.log(replies.length + " replies:");
//     replies.forEach(function (reply, i) {
//         console.log("    " + i + ": " + reply);
//     });
//     client.quit();
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


function getCurrentChangeAndWriteRedis(){
	bank.forEach(function(data,index){
		currentEx.getCurrentExChange(data,function(kbank,json){
			var jsonObj = JSON.stringify(json);
			for (var item in json){
				json[item] = JSON.stringify(json[item]);
			}
			client.hmset(kbank, json);
		})
	})
}


