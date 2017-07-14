
'use strict';

var moment = require('moment');

function Pattern (type,data) {
    var self = this;
    self.init(type,data);
}

var functionPattern = {
    cathaybk:cathayPattern,
    fubonbk:fubonPattern,

};

var resultJson = [];
var tmpKey;
var tmpValue = {};
var updateTime;

function cathayPattern($) {    
    $(".rate_list ul").children().children('dd').children().each(function (index) {
        var $this = $(this);
        if (index % 5 == 0) {
            if (tmpKey != undefined) {
                resultJson[tmpKey] = tmpValue;
            }
            tmpKey = ($this).text();
            tmpValue = {};
        }else if (index % 5 == 2){
            tmpValue.buy = ($this).text();
        }else if (index % 5 == 4){
            tmpValue.sell = ($this).text();
        } 

       
    });
    resultJson['time'] = moment().format();
    return resultJson;
}

function fubonPattern($) {
    $('table tr').each(function (index) {
        if (index == 0) {
            var timeString = $(this).text().trim();
            var time = timeString.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
            updateTime = time;
        }
        if (index >= 3 && index < 17) {
            
            var result = $(this).text().trim().split("\n");
            var priceObj = {};
            priceObj.bkbuy = result[1];
            priceObj.bksell = result[2];
            priceObj.cashbuy = result[3];
            priceObj.cashsell = result[4];
            
            resultJson[result[0]] = priceObj;
        } 
       
    });
    resultJson['time'] = updateTime;
    return resultJson;
}
Pattern.prototype.init = function init (type,data) {
    var self = this;
    if (functionPattern[type] == undefined) {
        throw new Error("type is undefined");
    }
    var func = functionPattern[type];
    self.json = func(data);
};

Pattern.prototype.exportJson = function _exportJson(){
    var self = this;
    return self.json;
}

module.exports = Pattern;