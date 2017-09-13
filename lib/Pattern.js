
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

// var resultJson = [];
// var tmpKey;
// var tmpValue = {};
// var updateTime;

function cathayPattern($,instance) {   

    $(".rate_list ul").children().children('dd').children().each(function (index) {
        var $this = $(this);
        if (index % 5 == 0) {
            if (instance.tmpKey != undefined && instance.tmpKey != "") {
                instance.resultJson[instance.tmpKey] = instance.tmpValue;
            }
            instance.tmpKey = parseFloat(($this).text()).toFixed(5);
            instance.tmpValue = {};
        }else if (index % 5 == 2){
            instance.tmpValue.buy = parseFloat(($this).text()).toFixed(5);
        }else if (index % 5 == 4){
            instance.tmpValue.sell = parseFloat(($this).text()).toFixed(5);
        } 

       
    });
    instance.resultJson['time'] = moment().format();
    return instance.resultJson;
}

function fubonPattern($,instance) {
    $('table tr').each(function (index) {
        if (index == 0) {
            var timeString = $(this).text().trim();
            var time = timeString.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
            instance.updateTime = time;
        }
        if (index >= 3 && index < 17) {
            
            var result = $(this).text().trim().split("\n");
            var priceObj = {};
            priceObj.bkbuy = parseFloat(result[1]).toFixed(5);
            priceObj.bksell = parseFloat(result[2]).toFixed(5);
            priceObj.cashbuy = parseFloat(result[3]).toFixed(5);
            priceObj.cashsell = parseFloat(result[4]).toFixed(5);
            
            instance.resultJson[result[0]] = priceObj;
        } 
       
    });
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function megabkPattern($,instance) {
    $('tbody tr').each(function (index) {
        if (index == 0) {
            var timeString = $(this).text().trim().split("\n");
            var time = timeString[1] + " " + timeString[3];
            instance.updateTime = time;
        }
        if (index >= 1) {
            
            var result = $(this).text().trim().split("\n");
            var priceObj = {};
            priceObj.bkbuy = parseFloat(result[1]).toFixed(5);
            priceObj.bksell = parseFloat(result[3]).toFixed(5);
            priceObj.cashbuy = parseFloat(result[2]).toFixed(5);
            priceObj.cashsell = parseFloat(result[4]).toFixed(5);
            
            instance.resultJson[result[0]] = priceObj;
        } 
       
    });
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function twbkPattern($,instance){
    $('tbody tr').each(function (index) {
         var result = $(this).text().trim().split("\n");
         var priceObj = {};
         var key = result[0].trim();
        priceObj.bkbuy = parseFloat(result[9].trim()).toFixed(5);
        priceObj.bksell = parseFloat(result[10].trim()).toFixed(5);
        priceObj.cashbuy = parseFloat(result[7].trim()).toFixed(5);
        priceObj.cashsell = parseFloat(result[8].trim()).toFixed(5);
        instance.resultJson[key] = priceObj;

       
    });
    instance.updateTime = $('.time').text();
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function chbbkPattern($,instance){
    $('tbody tr').each(function (index) {
        if (index >= 1) {   
            var result = $(this).text().trim().split("\n");
            var priceObj = {};
            var key = result[0].trim();
            priceObj.buy = parseFloat(result[1].trim()).toFixed(5);
            priceObj.sell = parseFloat(result[2].trim()).toFixed(5);
            instance.resultJson[key] = priceObj;
        } 
    });

    instance.updateTime = $('thead').text();
    var time = instance.updateTime.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    instance.updateTime = time;
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function esunbkPattern($,instance){
    $('table tr').each(function (index) {
        if (index >= 2) {
            
            var result = $(this).text().trim().split("\n");
            var priceObj = {};
            var key = result[0].trim();                  
            priceObj.bkbuy = parseFloat(result[1].trim()).toFixed(5);
            priceObj.bksell = parseFloat(result[2].trim()).toFixed(5);
            priceObj.cashbuy = (result[4] != undefined)? parseFloat(result[4].trim()).toFixed(4) : "-";
            priceObj.cashsell = (result[5] != undefined)? parseFloat(result[5].trim()).toFixed(4) : "-";
            instance.resultJson[key] = priceObj;
        }            
    });

    instance.updateTime = $('#LbQuoteTime').text();
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function taishinbkPattern($,instance){
    $('.table01 tr').each(function (index) {
        if (index >= 1) {
            
            var result = $(this).text().trim().split("      ");
            var priceObj = {};
            var key = result[0].trim();                  
            priceObj.bkbuy = parseFloat(result[1].trim()).toFixed(5);
            priceObj.bksell = parseFloat(result[2].trim()).toFixed(5);
            priceObj.cashbuy =  parseFloat(result[3].trim()).toFixed(5);
            priceObj.cashsell = parseFloat(result[4].trim()).toFixed(5);
            instance.resultJson[key] = priceObj;
        }            
    });
    var time = $('.content').eq(0).text();
    instance.updateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function hncbbkPattern($,instance){
    $('.formtable_infotext12gy').each(function (index) {
        if (index >= 1) {       
            var result = $(this).text().trim().split("       ");
            var priceObj = {};
            var key = result[0].trim(); 


            priceObj.buy = parseFloat(result[1].trim()).toFixed(5);
            priceObj.sell = parseFloat(result[2].trim()).toFixed(5);
            instance.resultJson[key] = priceObj;
        }            
    });
    var time = $('.formtable_subject15rb').text();
    
    instance.updateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function tcbbkPattern($,instance){
    var priceObj,key;
    $('#ctl00_PlaceHolderEmptyMain_PlaceHolderMain_fecurrentid_gvResult tr').each(function (index) {
    
        if (index >= 1) {           
            var result = $(this).text().trim().split("\r\n");
            if (index % 2 == 0) {
                key = result[0].trim()
                priceObj.bksell = (result[4] != undefined)? parseFloat(result[4].trim()).toFixed(4) : "-";
                priceObj.cashsell = (result[6] != undefined)? parseFloat(result[6].trim()).toFixed(4) : "-";
                instance.resultJson[key] = priceObj;
            }else{
                priceObj = {};
                priceObj.bkbuy = (result[4] != undefined)? parseFloat(result[4].trim()).toFixed(4) : "-";
                priceObj.cashbuy = (result[6] != undefined)? parseFloat(result[6].trim()).toFixed(4) : "-";
            }
            
            
            
        }            
    });
    var time = $('#ctl00_PlaceHolderEmptyMain_PlaceHolderMain_fecurrentid_lblDate').text();
    var timeDate = time.match(/(\d+)(-|\/)(\d+)(-|\/)(\d+)/g);
    var timeTime = time.match(/(\d+)(-|\:)(\d+)(-|\:)(\d+)/g)
    instance.updateTime = timeDate + " " + timeTime;
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function ctbcbkPattern($,instance){
    $('#mainTable tr').each(function (index) {
        if (index >= 1) {       
            var result = $(this).text().trim().split("\r\n");
            var priceObj = {};
            var key = result[1].trim().replace(/\/ /g, ""); 
            priceObj.bkbuy = parseFloat(result[6].trim()).toFixed(5);
            priceObj.bksell = parseFloat(result[7].trim()).toFixed(5);
            priceObj.cashbuy =  parseFloat(result[4].trim()).toFixed(5);
            priceObj.cashsell = parseFloat(result[5].trim()).toFixed(5);
            instance.resultJson[key] = priceObj;
        }   
                 
    });
    var time = $('.answer').text();
    var timeArray = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    instance.updateTime = timeArray[0];
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function feibbkPattern($,instance){
    $('.mainText tr').each(function (index) {
        if (index >= 1 && index < 14) {       
            var result = $(this).text().trim().split("\r\n").clean();
            var priceObj = {};
            // console.log(result);
            var key = result[0].trim();

            priceObj.bkbuy = parseFloat(result[1].trim()).toFixed(5);
            priceObj.bksell = parseFloat(result[2].trim()).toFixed(5);
            priceObj.cashbuy =  parseFloat(result[3].trim()).toFixed(5);
            priceObj.cashsell = parseFloat(result[4].trim()).toFixed(5);
            instance.resultJson[key] = priceObj;
        }   
                 
    });
    return instance.resultJson;
}

function sinopacbkPattern($,instance){
    $('table table tr').each(function (index) {
        if (index >= 3) {       
            var result = $(this).text().trim().split("     ");
            var priceObj = {};
            var key = result[0].trim();

            priceObj.bkbuy = parseFloat(result[1].trim()).toFixed(5);
            priceObj.bksell = parseFloat(result[2].trim()).toFixed(5);
            priceObj.cashbuy = (result[3] != undefined)? parseFloat(result[3].trim()).toFixed(4) : "-";
            priceObj.cashsell = (result[4] != undefined)? parseFloat(result[4].trim()).toFixed(4) : "-";
            instance.resultJson[key] = priceObj;
        }   
                 
    });
    var time = $('table').text();
    instance.updateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function kgibkPattern($,instance){
    $('.tb_05 tr').each(function (index) {
        if (index == 0) { 
            var time = $(this).text();
            instance.updateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
  
        }
        if (index >= 2) {       

            var result = $(this).text().trim().split("\n");
            var priceObj = {};
            var key = $(this).find('td').eq(0).text();

            priceObj.bkbuy = parseFloat($(this).find('td').eq(2).text()).toFixed(5);
            priceObj.bksell = parseFloat($(this).find('td').eq(3).text()).toFixed(5);
            priceObj.cashbuy = parseFloat($(this).find('td').eq(4).text()).toFixed(5);
            priceObj.cashsell = parseFloat($(this).find('td').eq(5).text()).toFixed(5);
            instance.resultJson[key] = priceObj;
        }   
                 
    });
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function tcbkPattern($,instance){
    $('.table_typle3 tr').each(function (index) {         
        if (index >= 1) {       

            var result = $(this).text().trim().split("\n");
            var priceObj = {};
            var key = $(this).find('td').eq(1).text();

            priceObj.bkbuy = parseFloat($(this).find('td').eq(4).text()).toFixed(5);
            priceObj.bksell = parseFloat($(this).find('td').eq(5).text()).toFixed(5);
            priceObj.cashbuy = parseFloat($(this).find('td').eq(2).text()).toFixed(5);
            priceObj.cashsell = parseFloat($(this).find('td').eq(3).text()).toFixed(5);
            instance.resultJson[key] = priceObj;
        }   
                 
    });
    instance.updateTime = $(".updateDate").text().trim();
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function entiebkPattern($,instance){
    $("table[summary='外幣匯率'] tr").each(function (index) { 
        if (index >= 1) {       

            var result = $(this).text().trim().split("\n");
            var priceObj = {};
            var key = $(this).find('td').eq(0).text();

            priceObj.bkbuy = parseFloat($(this).find('td').eq(1).text()).toFixed(5);
            priceObj.bksell = parseFloat($(this).find('td').eq(2).text()).toFixed(5);
            priceObj.cashbuy = parseFloat($(this).find('td').eq(3).text()).toFixed(5);
            priceObj.cashsell = parseFloat($(this).find('td').eq(4).text()).toFixed(5);
            instance.resultJson[key] = priceObj;
        }   
                 
    });
   
    var time = $("table[summary='更新日期時間']").text().trim();
    instance.updateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function scbkPattern($,instance){
    $("table tr").each(function (index) {
        if (index >= 3) {       
            var priceObj = {};
            var key = $(this).find('td').eq(0).text();
            priceObj.bkbuy = parseFloat($(this).find('td').eq(3).text()).toFixed(5);
            priceObj.bksell = parseFloat($(this).find('td').eq(4).text()).toFixed(5);
            priceObj.cashbuy = parseFloat($(this).find('td').eq(1).text()).toFixed(5);
            priceObj.cashsell = parseFloat($(this).find('td').eq(2).text()).toFixed(5);
            instance.resultJson[key] = priceObj;
        }   
                 
    });
   
    var time = $("body").text().trim();
    instance.updateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function scsbbkPattern($,instance){
    $(".tb2 tr").each(function (index) {
        if (index >= 4) {       
            var priceObj = {};
            var key = $(this).find('td').eq(0).text().trim();
            if (key != "") {
                priceObj.buy = parseFloat($(this).find('td').eq(2).text().trim()).toFixed(5);
                priceObj.sell = parseFloat($(this).find('td').eq(3).text().trim()).toFixed(5);
                instance.resultJson[key] = priceObj;
            }
            
        }   
                 
    });
   
    var time = $(".txt07").text().trim();
    var timeDate = time.match(/(\d+)*( 年 )(\d+)*( 月 )(\d+)*( 日)/g);
    var timeTime = time.match(/(\d+)(-|\:)(\d+)(-|\:)(\d+)/g);
    instance.updateTime = timeDate[0] + " " + timeTime[0];
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function dbsbkPattern($,instance){
    $(".table-bordered tr").each(function (index) {
        if (index >= 2) {       
            var priceObj = {};
            var key = $(this).find('td').eq(1).text().trim();
            if (key != "") {
                priceObj.bkbuy = parseFloat($(this).find('td').eq(3).text()).toFixed(5);
                priceObj.bksell = parseFloat($(this).find('td').eq(2).text()).toFixed(5);
                priceObj.cashbuy = parseFloat($(this).find('td').eq(5).text()).toFixed(5);
                priceObj.cashsell = parseFloat($(this).find('td').eq(4).text()).toFixed(5);
                instance.resultJson[key] = priceObj;
            }
            
        }   
                 
    });
   
    var time = $(".rates-date-datetime").text().trim();
    instance.updateTime = time;
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function netbkPattern($,instance){
    $(".TitleForRate").siblings().each(function (index) {       
            var priceObj = {};
            var key = $(this).find('td').eq(0).text().trim();
            if (key != "") {
                priceObj.bkbuy = parseFloat($(this).find('td').eq(1).text()).toFixed(5);
                priceObj.bksell = parseFloat($(this).find('td').eq(2).text()).toFixed(5);
                var cashbuyTemp = $(this).find('td').eq(3).text();
                var cashsellTemp = $(this).find('td').eq(4).text();
                priceObj.cashbuy = (!isNaN(cashbuyTemp))?parseFloat(cashbuyTemp).toFixed(4):'-';
                priceObj.cashsell = (!isNaN(cashsellTemp))?parseFloat(cashsellTemp).toFixed(4):'-';
                instance.resultJson[key] = priceObj;
            }         
    });
    var time = $("b").text().trim();
    var timeDate = time.match(/(\d+)(-|\/)(\d+)(-|\/)(\d+)/g);
    var timeTime = time.match(/(\d+)(-|\:)(\d+)(-|\:)(\d+)/g);
    var timePM = time.match(/(下午)/g);
  
    if (timePM != undefined) {
        instance.updateTime = timeDate + " PM " + timeTime;
    }else{
        instance.updateTime = timeDate + " AM " + timeTime;
    }
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function hsbcbkPattern($,instance){
    $(".hsbcTableStyleForRates02 tr").each(function (index) {
        if (index > 2 && index < 16) {
            var priceObj = {};
            var key = $(this).find('td').eq(0).text().trim();
            if (key != "") {
                priceObj.bkbuy = parseFloat($(this).find('td').eq(1).text()).toFixed(5);
                priceObj.bksell = parseFloat($(this).find('td').eq(2).text()).toFixed(5);
                priceObj.cashbuy = parseFloat($(this).find('td').eq(3).text()).toFixed(5);
                priceObj.cashsell = parseFloat($(this).find('td').eq(4).text()).toFixed(5);
                instance.resultJson[key] = priceObj;
            } 
        }
                    
    });
    var time = $(".ForTime01").text().trim();
    instance.updateTime = time.match(/(\d+)(-|\/)(\d+)(-|\/)(\d+)/g);
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
}

function firstbkPattern($,instance){
    var priceObj,key;
    $("#table1 tr").each(function (index) {
        if (index > 0) {                              
            var type = $(this).find('td').eq(1).text();
            if (key == undefined || key != $(this).find('td').eq(0).text().trim()) {
                key = $(this).find('td').eq(0).text().trim();
                priceObj = {};
            }
            
            if (type == "Cash") {
                priceObj.cashbuy = parseFloat($(this).find('td').eq(2).text().trim()).toFixed(5);
                priceObj.cashsell = parseFloat($(this).find('td').eq(3).text().trim()).toFixed(5);
            }else{
                
                priceObj.bkbuy = parseFloat($(this).find('td').eq(2).text().trim()).toFixed(5);
                priceObj.bksell = parseFloat($(this).find('td').eq(3).text().trim()).toFixed(5);
            }                    
            instance.resultJson[key] = priceObj;
        }
                    
    });
    var time = $(".locator2").text().trim();
    instance.updateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
    instance.resultJson['time'] = instance.updateTime;
    return instance.resultJson;
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

    this.resultJson = [];
    this.tmpValue = {};
    this.tmpKey = "";
    this.updateTime = "";
    var func = functionPattern[type];
    self.json = func(data,this);
};

Pattern.prototype.exportJson = function _exportJson(){
    var self = this;
    return self.json;
}

module.exports = Pattern;
