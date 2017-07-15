
'use strict';

var moment = require('moment');

function Pattern (type,data) {
    var self = this;
    self.init(type,data);
}

var functionPattern = {
    cathaybk:cathayPattern,
    fubonbk:fubonPattern,
    megabk:megabkPattern,
    twbk:twbkPattern,
    chbbk:chbbkPattern,
    esunbk:esunbkPattern,
    taishinbk:taishinbkPattern,
    hncbbk:hncbbkPattern,
    tcbbk:tcbbkPattern,
    ctbcbk:ctbcbkPattern,
    feibbk:feibbkPattern,
    sinopacbk:sinopacbkPattern,
    kgibk:kgibkPattern,
    tcbk:tcbkPattern,
    entiebk:entiebkPattern,
    scbk:scbkPattern,
    scsbbk:scsbbkPattern,
    dbsbk:dbsbkPattern,
    netbk:netbkPattern,
    hsbcbk:hsbcbkPattern,
    firstbk:firstbkPattern,
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

function megabkPattern($) {
    $('tbody tr').each(function (index) {
        if (index == 0) {
            var timeString = $(this).text().trim().split("\n");
            var time = timeString[1] + " " + timeString[3];
            updateTime = time;
        }
        if (index >= 1) {
            
            var result = $(this).text().trim().split("\n");
            var priceObj = {};
            priceObj.bkbuy = result[1];
            priceObj.bksell = result[3];
            priceObj.cashbuy = result[2];
            priceObj.cashsell = result[4];
            
            resultJson[result[0]] = priceObj;
        } 
       
    });
    resultJson['time'] = updateTime;
    return resultJson;
}

function twbkPattern($){
    $('tbody tr').each(function (index) {
         var result = $(this).text().trim().split("\n");
         var priceObj = {};
         var key = result[0].trim();
        priceObj.bkbuy = result[9].trim();
        priceObj.bksell = result[10].trim();
        priceObj.cashbuy = result[7].trim();
        priceObj.cashsell = result[8].trim();
        resultJson[key] = priceObj;

       
    });
    updateTime = $('.time').text();
    resultJson['time'] = updateTime;
    return resultJson;
}

function chbbkPattern($){
    $('tbody tr').each(function (index) {
        if (index >= 1) {   
            var result = $(this).text().trim().split("\n");
            var priceObj = {};
            var key = result[0].trim();
            priceObj.buy = result[1].trim();
            priceObj.sell = result[2].trim();
            resultJson[key] = priceObj;
        } 
    });

    updateTime = $('thead').text();
    var time = updateTime.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    updateTime = time;
    resultJson['time'] = updateTime;
    return resultJson;
}

function esunbkPattern($){
    $('table tr').each(function (index) {
        if (index >= 2) {
            
            var result = $(this).text().trim().split("\n");
            var priceObj = {};
            var key = result[0].trim();                  
            priceObj.bkbuy = result[1].trim();
            priceObj.bksell = result[2].trim();
            priceObj.cashbuy = (result[4] != undefined)? result[4].trim() : "-";
            priceObj.cashsell = (result[5] != undefined)? result[5].trim() : "-";
            resultJson[key] = priceObj;
        }            
    });

    updateTime = $('#LbQuoteTime').text();
    resultJson['time'] = updateTime;
    return resultJson;
}

function taishinbkPattern($){
    $('.table01 tr').each(function (index) {
        if (index >= 1) {
            
            var result = $(this).text().trim().split("      ");
            var priceObj = {};
            var key = result[0].trim();                  
            priceObj.bkbuy = result[1].trim();
            priceObj.bksell = result[2].trim();
            priceObj.cashbuy =  result[3].trim();
            priceObj.cashsell = result[4].trim();
            resultJson[key] = priceObj;
        }            
    });
    var time = $('.content').eq(0).text();
    updateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    resultJson['time'] = updateTime;
    return resultJson;
}

function hncbbkPattern($){
    $('.formtable_infotext12gy').each(function (index) {
        if (index >= 1) {       
            var result = $(this).text().trim().split("       ");
            var priceObj = {};
            var key = result[0].trim(); 


            priceObj.buy = result[1].trim();
            priceObj.sell = result[2].trim();
            resultJson[key] = priceObj;
        }            
    });
    var time = $('.formtable_subject15rb').text();
    
    updateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    resultJson['time'] = updateTime;
    return resultJson;
}

function tcbbkPattern($){
    var priceObj,key;
    $('#ctl00_PlaceHolderEmptyMain_PlaceHolderMain_fecurrentid_gvResult tr').each(function (index) {
    
        if (index >= 1) {           
            var result = $(this).text().trim().split("\r\n");
            if (index % 2 == 0) {
                key = result[0].trim()
                priceObj.bksell = (result[4] != undefined)? result[4].trim() : "-";
                priceObj.cashsell = (result[6] != undefined)? result[6].trim() : "-";
                resultJson[key] = priceObj;
            }else{
                priceObj = {};
                priceObj.bkbuy = (result[4] != undefined)? result[4].trim() : "-";
                priceObj.cashbuy = (result[6] != undefined)? result[6].trim() : "-";
            }
            
            
            
        }            
    });
    var time = $('#ctl00_PlaceHolderEmptyMain_PlaceHolderMain_fecurrentid_lblDate').text();
    var timeDate = time.match(/(\d+)(-|\/)(\d+)(-|\/)(\d+)/g);
    var timeTime = time.match(/(\d+)(-|\:)(\d+)(-|\:)(\d+)/g)
    updateTime = timeDate + " " + timeTime;
    resultJson['time'] = updateTime;
    return resultJson;
}

function ctbcbkPattern($){
    $('#mainTable tr').each(function (index) {
        if (index >= 1) {       
            var result = $(this).text().trim().split("\r\n");
            var priceObj = {};
            var key = result[1].trim().replace(/\/ /g, ""); 
            priceObj.bkbuy = result[6].trim();
            priceObj.bksell = result[7].trim();
            priceObj.cashbuy =  result[4].trim();
            priceObj.cashsell = result[5].trim();
            resultJson[key] = priceObj;
        }   
                 
    });
    var time = $('.answer').text();
    var timeArray = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    updateTime = timeArray[0];
    resultJson['time'] = updateTime;
    return resultJson;
}

function feibbkPattern($){
    $('.mainText tr').each(function (index) {
        if (index >= 1 && index < 14) {       
            var result = $(this).text().trim().split("\r\n").clean();
            var priceObj = {};
            // console.log(result);
            var key = result[0].trim();

            priceObj.bkbuy = result[1].trim();
            priceObj.bksell = result[2].trim();
            priceObj.cashbuy =  result[3].trim();
            priceObj.cashsell = result[4].trim();
            resultJson[key] = priceObj;
        }   
                 
    });
    return resultJson;
}

function sinopacbkPattern($){
    $('table table tr').each(function (index) {
        if (index >= 3) {       
            var result = $(this).text().trim().split("     ");
            var priceObj = {};
            var key = result[0].trim();

            priceObj.bkbuy = result[1].trim();
            priceObj.bksell = result[2].trim();
            priceObj.cashbuy = (result[3] != undefined)? result[3].trim() : "-";
            priceObj.cashsell = (result[4] != undefined)? result[4].trim() : "-";
            resultJson[key] = priceObj;
        }   
                 
    });
    var time = $('table').text();
    updateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    resultJson['time'] = updateTime;
    return resultJson;
}

function kgibkPattern($){
    $('.tb_05 tr').each(function (index) {
        if (index == 0) { 
            var time = $(this).text();
            updateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
  
        }
        if (index >= 2) {       

            var result = $(this).text().trim().split("\n");
            var priceObj = {};
            var key = $(this).find('td').eq(0).text();

            priceObj.bkbuy = $(this).find('td').eq(2).text();
            priceObj.bksell = $(this).find('td').eq(3).text();
            priceObj.cashbuy = $(this).find('td').eq(4).text();
            priceObj.cashsell = $(this).find('td').eq(5).text();
            resultJson[key] = priceObj;
        }   
                 
    });
    resultJson['time'] = updateTime;
    return resultJson;
}

function tcbkPattern($){
    $('.table_typle3 tr').each(function (index) {         
        if (index >= 1) {       

            var result = $(this).text().trim().split("\n");
            var priceObj = {};
            var key = $(this).find('td').eq(1).text();

            priceObj.bkbuy = $(this).find('td').eq(4).text();
            priceObj.bksell = $(this).find('td').eq(5).text();
            priceObj.cashbuy = $(this).find('td').eq(2).text();
            priceObj.cashsell = $(this).find('td').eq(3).text();
            resultJson[key] = priceObj;
        }   
                 
    });
    updateTime = $(".updateDate").text().trim();
    resultJson['time'] = updateTime;
    return resultJson;
}

function entiebkPattern($){
    $("table[summary='外幣匯率'] tr").each(function (index) { 
        if (index >= 1) {       

            var result = $(this).text().trim().split("\n");
            var priceObj = {};
            var key = $(this).find('td').eq(0).text();

            priceObj.bkbuy = $(this).find('td').eq(1).text();
            priceObj.bksell = $(this).find('td').eq(2).text();
            priceObj.cashbuy = $(this).find('td').eq(3).text();
            priceObj.cashsell = $(this).find('td').eq(4).text();
            resultJson[key] = priceObj;
        }   
                 
    });
   
    var time = $("table[summary='更新日期時間']").text().trim();
    updateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    resultJson['time'] = updateTime;
    return resultJson;
}

function scbkPattern($){
    $("table tr").each(function (index) {
        if (index >= 3) {       
            var priceObj = {};
            var key = $(this).find('td').eq(0).text();
            priceObj.bkbuy = $(this).find('td').eq(3).text();
            priceObj.bksell = $(this).find('td').eq(4).text();
            priceObj.cashbuy = $(this).find('td').eq(1).text();
            priceObj.cashsell = $(this).find('td').eq(2).text();
            resultJson[key] = priceObj;
        }   
                 
    });
   
    var time = $("body").text().trim();
    updateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    resultJson['time'] = updateTime;
    return resultJson;
}

function scsbbkPattern($){
    $(".tb2 tr").each(function (index) {
        if (index >= 4) {       
            var priceObj = {};
            var key = $(this).find('td').eq(0).text().trim();
            if (key != "") {
                priceObj.buy = $(this).find('td').eq(2).text().trim();
                priceObj.sell = $(this).find('td').eq(3).text().trim();
                resultJson[key] = priceObj;
            }
            
        }   
                 
    });
   
    var time = $(".txt07").text().trim();
    var timeDate = time.match(/(\d+)*( 年 )(\d+)*( 月 )(\d+)*( 日)/g);
    var timeTime = time.match(/(\d+)(-|\:)(\d+)(-|\:)(\d+)/g);
    updateTime = timeDate[0] + " " + timeTime[0];
    resultJson['time'] = updateTime;
    return resultJson;
}

function dbsbkPattern($){
    $(".table-bordered tr").each(function (index) {
        if (index >= 2) {       
            var priceObj = {};
            var key = $(this).find('td').eq(1).text().trim();
            if (key != "") {
                priceObj.bkbuy = $(this).find('td').eq(3).text();
                priceObj.bksell = $(this).find('td').eq(2).text();
                priceObj.cashbuy = $(this).find('td').eq(5).text();
                priceObj.cashsell = $(this).find('td').eq(4).text();
                resultJson[key] = priceObj;
            }
            
        }   
                 
    });
   
    var time = $(".rates-date-datetime").text().trim();
    updateTime = time;
    resultJson['time'] = updateTime;
    return resultJson;
}

function netbkPattern($){
    $(".TitleForRate").siblings().each(function (index) {       
            var priceObj = {};
            var key = $(this).find('td').eq(0).text().trim();
            if (key != "") {
                priceObj.bkbuy = $(this).find('td').eq(1).text();
                priceObj.bksell = $(this).find('td').eq(2).text();
                priceObj.cashbuy = $(this).find('td').eq(3).text();
                priceObj.cashsell = $(this).find('td').eq(4).text();
                resultJson[key] = priceObj;
            }         
    });
    var time = $("b").text().trim();
    var timeDate = time.match(/(\d+)(-|\/)(\d+)(-|\/)(\d+)/g);
    var timeTime = time.match(/(\d+)(-|\:)(\d+)(-|\:)(\d+)/g);
    var timePM = time.match(/(下午)/g);
  
    if (timePM != undefined) {
        updateTime = timeDate + " PM " + timeTime;
    }else{
        updateTime = timeDate + " AM " + timeTime;
    }
    resultJson['time'] = updateTime;
    return resultJson;
}

function hsbcbkPattern($){
    $(".hsbcTableStyleForRates02 tr").each(function (index) {
        if (index > 2 && index < 16) {
            var priceObj = {};
            var key = $(this).find('td').eq(0).text().trim();
            if (key != "") {
                priceObj.bkbuy = $(this).find('td').eq(1).text();
                priceObj.bksell = $(this).find('td').eq(2).text();
                priceObj.cashbuy = $(this).find('td').eq(3).text();
                priceObj.cashsell = $(this).find('td').eq(4).text();
                resultJson[key] = priceObj;
            } 
        }
                    
    });
    var time = $(".ForTime01").text().trim();
    updateTime = time.match(/(\d+)(-|\/)(\d+)(-|\/)(\d+)/g);
    resultJson['time'] = updateTime;
    return resultJson;
}

function firstbkPattern($){
    var priceObj,key;
    $("#table1 tr").each(function (index) {
        if (index > 0) {                              
            var type = $(this).find('td').eq(1).text();
            if (key == undefined || key != $(this).find('td').eq(0).text().trim()) {
                key = $(this).find('td').eq(0).text().trim();
                priceObj = {};
            }
            
            if (type == "Cash") {
                priceObj.cashbuy = $(this).find('td').eq(2).text().trim();
                priceObj.cashsell = $(this).find('td').eq(3).text().trim();
            }else{
                
                priceObj.bkbuy = $(this).find('td').eq(2).text().trim();
                priceObj.bksell = $(this).find('td').eq(3).text().trim();
            }                    
            resultJson[key] = priceObj;
            
        }
                    
    });
    var time = $(".locator2").text().trim();
    updateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    resultJson['time'] = updateTime;
    return resultJson;
}
//Common
//Array Clean
Array.prototype.clean = function() {
  for (var i = 0; i < this.length; i++) {

    if (this[i].trim().length == 0) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};


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