# TW Exchange

>Get the current exchange rate from each taiwan bank. 

## Install

If you haven't already got Node.js, then [go get it](http://nodejs.org/).

```
npm install tw-exchange
```

## Features

#### Support Bank List are listed below :


Code Name        | Bank Name           |
--------------------|------------------
cathaybk|cathay| 
fubonbk|fubon| 
megabk|mega| 
twbk|taiwan| 
chbbk|chb| 
esunbk|esun| 
taishinbk|taishin| 
hncbbk|hncb| 
tcbbk |tcb|
ctbcbk|ctbc|
feibbk|feib|
sinopacbk|sinopac|
kgibk|kgi|
tcbk|tc|
entiebk|entie|
scbk|sc|
scsbbk|scsb|
dbsbk|dbs|
netbk|net|
hsbcbk|hsbc|
firstbk|first|

## Introduction

### How to use

#### Require module

```
var currentEx = require('tw-exchange');
```

#### Use bank code to access exchange rate

```
currentEx.getCurrentExChange("cathaybk",function(json){
	console.log("cathay bank rate =>" + JSON.stringify(json));
})

```
#### Output example

```
cathay bank rate => {"USD":{"bkbuy":"30.3100","bksell":"30.5100","cashbuy":"30.1100","cashsell":"30.6900"},"CNY":{"bkbuy":"4.4380","bksell":"4.5380","cashbuy":"4.3680","cashsell":"4.5580"},"HKD":{"bkbuy":"3.8350","bksell":"3.9550","cashbuy":"3.7850","cashsell":"3.9950"},"GBP":{"bkbuy":"39.3400","bksell":"40.1400"},"CHF":{"bkbuy":"31.2800","bksell":"31.8000"},"AUD":{"bkbuy":"23.5800","bksell":"24.0200"},"SGD":{"bkbuy":"22.0000","bksell":"22.4000"},"CAD":{"bkbuy":"23.7600","bksell":"24.1600"},"SEK":{"bkbuy":"3.5700","bksell":"3.7300"},"ZAR":{"bkbuy":"2.2320","bksell":"2.4360"},"JPY":{"bkbuy":"0.2667","bksell":"0.2747","cashbuy":"0.2647","cashsell":"0.2767"},"DKK":{"bkbuy":"4.6100","bksell":"4.7700"},"THB":{"bkbuy":"0.8610","bksell":"0.9410"},"NZD":{"bkbuy":"22.1300","bksell":"22.5700"},"EUR":{"bkbuy":"34.4500","bksell":"35.2500","cashbuy":"34.1000","cashsell":"35.6000"},"time":"2017-07-15T12:54:23+08:00"}
```


## Authors

* **Felix Lin** - [Github](https://github.com/FelixLinBH)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

