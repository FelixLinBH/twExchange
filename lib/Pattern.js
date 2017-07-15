
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
            instance.tmpKey = ($this).text();
            instance.tmpValue = {};
        }else if (index % 5 == 2){
            instance.tmpValue.buy = ($this).text();
        }else if (index % 5 == 4){
            instance.tmpValue.sell = ($this).text();
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
            priceObj.bkbuy = result[1];
            priceObj.bksell = result[2];
            priceObj.cashbuy = result[3];
            priceObj.cashsell = result[4];
            
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
            priceObj.bkbuy = result[1];
            priceObj.bksell = result[3];
            priceObj.cashbuy = result[2];
            priceObj.cashsell = result[4];
            
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
        priceObj.bkbuy = result[9].trim();
        priceObj.bksell = result[10].trim();
        priceObj.cashbuy = result[7].trim();
        priceObj.cashsell = result[8].trim();
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
            priceObj.buy = result[1].trim();
            priceObj.sell = result[2].trim();
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
            priceObj.bkbuy = result[1].trim();
            priceObj.bksell = result[2].trim();
            priceObj.cashbuy = (result[4] != undefined)? result[4].trim() : "-";
            priceObj.cashsell = (result[5] != undefined)? result[5].trim() : "-";
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
            priceObj.bkbuy = result[1].trim();
            priceObj.bksell = result[2].trim();
            priceObj.cashbuy =  result[3].trim();
            priceObj.cashsell = result[4].trim();
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


            priceObj.buy = result[1].trim();
            priceObj.sell = result[2].trim();
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
                priceObj.bksell = (result[4] != undefined)? result[4].trim() : "-";
                priceObj.cashsell = (result[6] != undefined)? result[6].trim() : "-";
                instance.resultJson[key] = priceObj;
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
            priceObj.bkbuy = result[6].trim();
            priceObj.bksell = result[7].trim();
            priceObj.cashbuy =  result[4].trim();
            priceObj.cashsell = result[5].trim();
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

            priceObj.bkbuy = result[1].trim();
            priceObj.bksell = result[2].trim();
            priceObj.cashbuy =  result[3].trim();
            priceObj.cashsell = result[4].trim();
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

            priceObj.bkbuy = result[1].trim();
            priceObj.bksell = result[2].trim();
            priceObj.cashbuy = (result[3] != undefined)? result[3].trim() : "-";
            priceObj.cashsell = (result[4] != undefined)? result[4].trim() : "-";
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

            priceObj.bkbuy = $(this).find('td').eq(2).text();
            priceObj.bksell = $(this).find('td').eq(3).text();
            priceObj.cashbuy = $(this).find('td').eq(4).text();
            priceObj.cashsell = $(this).find('td').eq(5).text();
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

            priceObj.bkbuy = $(this).find('td').eq(4).text();
            priceObj.bksell = $(this).find('td').eq(5).text();
            priceObj.cashbuy = $(this).find('td').eq(2).text();
            priceObj.cashsell = $(this).find('td').eq(3).text();
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

            priceObj.bkbuy = $(this).find('td').eq(1).text();
            priceObj.bksell = $(this).find('td').eq(2).text();
            priceObj.cashbuy = $(this).find('td').eq(3).text();
            priceObj.cashsell = $(this).find('td').eq(4).text();
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
            priceObj.bkbuy = $(this).find('td').eq(3).text();
            priceObj.bksell = $(this).find('td').eq(4).text();
            priceObj.cashbuy = $(this).find('td').eq(1).text();
            priceObj.cashsell = $(this).find('td').eq(2).text();
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
                priceObj.buy = $(this).find('td').eq(2).text().trim();
                priceObj.sell = $(this).find('td').eq(3).text().trim();
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
                priceObj.bkbuy = $(this).find('td').eq(3).text();
                priceObj.bksell = $(this).find('td').eq(2).text();
                priceObj.cashbuy = $(this).find('td').eq(5).text();
                priceObj.cashsell = $(this).find('td').eq(4).text();
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
                priceObj.bkbuy = $(this).find('td').eq(1).text();
                priceObj.bksell = $(this).find('td').eq(2).text();
                priceObj.cashbuy = $(this).find('td').eq(3).text();
                priceObj.cashsell = $(this).find('td').eq(4).text();
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
                priceObj.bkbuy = $(this).find('td').eq(1).text();
                priceObj.bksell = $(this).find('td').eq(2).text();
                priceObj.cashbuy = $(this).find('td').eq(3).text();
                priceObj.cashsell = $(this).find('td').eq(4).text();
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
                priceObj.cashbuy = $(this).find('td').eq(2).text().trim();
                priceObj.cashsell = $(this).find('td').eq(3).text().trim();
            }else{
                
                priceObj.bkbuy = $(this).find('td').eq(2).text().trim();
                priceObj.bksell = $(this).find('td').eq(3).text().trim();
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