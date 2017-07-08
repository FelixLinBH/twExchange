var Crawler = require('crawler');
var url = require('url');
var moment = require('moment');
var ExFormat = require('./ExFormat.js');
var iconv = require('iconv-lite');
//國泰
exports.cathaybk = function (completeBlock) {
    var cathaybkJson = [];
    var c = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                var tmpKey;
                var tmpValue = {};
                $(".rate_list ul").children().children('dd').children().each(function (index) {
                    var $this = $(this);
                    if (index % 5 == 0) {
                        if (tmpKey != undefined) {
                            cathaybkJson[tmpKey] = tmpValue;
                        }
                        tmpKey = ($this).text();
                        tmpValue = {};
                    }else if (index % 5 == 2){
                        tmpValue.buy = ($this).text();
                    }else if (index % 5 == 4){
                        tmpValue.sell = ($this).text();
                    } 

                   
                });
                cathaybkJson['time'] = moment().format();
                var exformat = new ExFormat("cathaybk",cathaybkJson);
                completeBlock(exformat.exportJson());
            }
            done();
        }
    });
    c.queue('https://www.cathaybk.com.tw/cathaybk/mobile/rate_01.asp');

}
//富邦
exports.fubonbk = function (completeBlock) {
    var fubonbkJson = [];
    var updateTime;
    var f = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                var tmpKey;
                var tmpValue = {};
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
                        
                        fubonbkJson[result[0]] = priceObj;
                    } 
                   
                });
                fubonbkJson['time'] = updateTime;

                var exformat = new ExFormat("fubonbk",fubonbkJson);
                completeBlock(exformat.exportJson());

                // completeBlock(fubonbkJson);
                // console.log(updateTime);
                // console.log(fubonbkJson);
            }
            done();
        }
    });

    f.queue('https://ebank.taipeifubon.com.tw/B2C/cfhqu/cfhqu009/CFHQU009_Home.faces');
};
//兆豐
exports.megabk = function (completeBlock) {
    var megabkJson = [];
    var mupdateTime;
    var m = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                
                var tmpKey;
                var tmpValue = {};
                $('tbody tr').each(function (index) {
                    if (index == 0) {
                        var timeString = $(this).text().trim().split("\n");
                        var time = timeString[1] + " " + timeString[3];
                        mupdateTime = time;
                    }
                    if (index >= 1) {
                        
                        var result = $(this).text().trim().split("\n");
                        var priceObj = {};
                        priceObj.bkbuy = result[1];
                        priceObj.bksell = result[3];
                        priceObj.cashbuy = result[2];
                        priceObj.cashsell = result[4];
                        
                        megabkJson[result[0]] = priceObj;
                    } 
                   
                });
                megabkJson['time'] = mupdateTime;
                var exformat = new ExFormat("megabk",megabkJson);
                completeBlock(exformat.exportJson());
                // completeBlock(megabkJson);
                // console.log(mupdateTime);
                // console.log(megabkJson);
            }
            done();
        }
    });

    m.queue('https://ebank.megabank.com.tw/global2/rs/rs02/PRS2001.faces');
}
//台銀
exports.twbk = function (completeBlock) {
    var twbkJson = [];
    var twupdateTime;
    var tw = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                var tmpKey;
                var tmpValue = {};
                $('tbody tr').each(function (index) {
                     var result = $(this).text().trim().split("\n");
                     var priceObj = {};
                     var key = result[0].trim();
                    priceObj.bkbuy = result[9].trim();
                    priceObj.bksell = result[10].trim();
                    priceObj.cashbuy = result[7].trim();
                    priceObj.cashsell = result[8].trim();
                    twbkJson[key] = priceObj;

                   
                });
                twupdateTime = $('.time').text();
                twbkJson['time'] = twupdateTime;
                var exformat = new ExFormat("twbk",twbkJson);
                completeBlock(exformat.exportJson());

                // completeBlock(twbkJson);
                // console.log(twupdateTime);
                // console.log(twbkJson);
            }
            done();
        }
    });

    tw.queue('http://rate.bot.com.tw/xrt?Lang=zh-TW');
}
//彰銀 本畫面每二分鐘更新一次，資料僅供參考
exports.chbbk = function (completeBlock) {
    var chbbkJson = [];
    var chbUpdateTime;
    var chb = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                var tmpKey;
                var tmpValue = {};
                $('tbody tr').each(function (index) {
                    if (index >= 1) {
                        
                        var result = $(this).text().trim().split("\n");
                        var priceObj = {};
                        var key = result[0].trim();
                        
                        priceObj.buy = result[1].trim();
                        priceObj.sell = result[2].trim();
                        // priceObj.cashbuy = result[2];
                        // priceObj.cashsell = result[4];
                        
                        chbbkJson[key] = priceObj;
                    } 
                     

                   
                });

                chbUpdateTime = $('thead').text();
                var time = chbUpdateTime.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
                chbUpdateTime = time;
                chbbkJson['time'] = chbUpdateTime;

                var exformat = new ExFormat("chbbk",chbbkJson);
                completeBlock(exformat.exportJson());

                // completeBlock(chbbkJson);
                // console.log(chbbkJson);
                // console.log(chbUpdateTime);
            }
            done();
        }
    });

    chb.queue('https://www.bankchb.com/chb_accessibility/G0100.jsp');
}
//玉山
exports.esunbk = function (completeBlock) {
    var esunbkJson = [];
    var esunUpdateTime;
    var esun = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                var tmpKey;
                var tmpValue = {};
                $('table tr').each(function (index) {
                    if (index >= 2) {
                        
                        var result = $(this).text().trim().split("\n");
                        var priceObj = {};
                        var key = result[0].trim();                  
                        priceObj.bkbuy = result[1].trim();
                        priceObj.bksell = result[2].trim();
                        priceObj.cashbuy = (result[4] != undefined)? result[4].trim() : "-";
                        priceObj.cashsell = (result[5] != undefined)? result[5].trim() : "-";
                        esunbkJson[key] = priceObj;
                    }            
                });

                chbUpdateTime = $('#LbQuoteTime').text();
                esunbkJson['time'] = chbUpdateTime;
                var exformat = new ExFormat("esunbk",esunbkJson);
                completeBlock(exformat.exportJson());
                // completeBlock(esunbkJson);
                // console.log(esunbkJson);
                // console.log(chbUpdateTime);
            }
            done();
        }
    });

    esun.queue('https://www.esunbank.com.tw/bank/personal/deposit/rate/forex/foreign-exchange-rates');
}
//台新
exports.taishinbk = function (completeBlock) {
    var taishinbkJson = [];
    var taishinUpdateTime;
    var taishin = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                var tmpKey;
                var tmpValue = {};
                $('.table01 tr').each(function (index) {
                    if (index >= 1) {
                        
                        var result = $(this).text().trim().split("      ");
                        var priceObj = {};
                        var key = result[0].trim();                  
                        priceObj.bkbuy = result[1].trim();
                        priceObj.bksell = result[2].trim();
                        priceObj.cashbuy =  result[3].trim();
                        priceObj.cashsell = result[4].trim();
                        taishinbkJson[key] = priceObj;
                    }            
                });
                var time = $('.content').eq(0).text();
                taishinUpdateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
                taishinbkJson['time'] = taishinUpdateTime;
                completeBlock(taishinbkJson);
                // console.log(taishinbkJson);
                // console.log(taishinUpdateTime);
            }
            done();
        }
    });

    taishin.queue('https://www.taishinbank.com.tw/TS/TS06/TS0605/TS060502/index.htm?urlPath1=TS02&urlPath2=TS0202');
}
//華南 
exports.hncbbk = function (completeBlock) {
    var hncbbkJson = [];
    var hncbUpdateTime;
    var hncb = new Crawler({
        maxConnections : 10,
       
        // This will be called for each crawled page
        callback : function (error, res, done) {
            var decodeBody = iconv.decode(new Buffer(res.body), "big5"); 
            res.body = iconv.encode(decodeBody, 'utf8');

            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                var tmpKey;
                var tmpValue = {};
                $('.formtable_infotext12gy').each(function (index) {
                    if (index >= 1) {       
                        var result = $(this).text().trim().split("       ");
                        var priceObj = {};
                        var key = result[0].trim(); 


                        priceObj.buy = result[1].trim();
                        priceObj.sell = result[2].trim();
                        hncbbkJson[key] = priceObj;
                    }            
                });
                var time = $('.formtable_subject15rb').text();
                
                hncbUpdateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
                hncbbkJson['time'] = hncbUpdateTime;
                var exformat = new ExFormat("hncbbk",hncbbkJson);
                completeBlock(exformat.exportJson());
                
            }
            done();
        }
    });

    hncb.queue('https://ibank.hncb.com.tw/netbank/pages/jsp/ExtSel/RTExange.html');
}
//合作金庫
exports.tcbbk = function (completeBlock) {
    var tcbbkJson = [];
    var tcbUpdateTime;
    var tcb = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                var priceObj,key;
                $('#ctl00_PlaceHolderEmptyMain_PlaceHolderMain_fecurrentid_gvResult tr').each(function (index) {
                
                    if (index >= 1) {           
                        var result = $(this).text().trim().split("\r\n");
                        if (index % 2 == 0) {
                            key = result[0].trim()
                            priceObj.bksell = (result[4] != undefined)? result[4].trim() : "-";
                            priceObj.cashsell = (result[6] != undefined)? result[6].trim() : "-";
                            tcbbkJson[key] = priceObj;
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
                tcbUpdateTime = timeDate + " " + timeTime;
                tcbbkJson['time'] = tcbUpdateTime;
                completeBlock(tcbbkJson);
                // console.log(tcbbkJson);
                // console.log(tcbUpdateTime);
            }
            done();
        }
    });

    tcb.queue('https://www.tcb-bank.com.tw/finance_info/Pages/foreign_spot_rate.aspx');
}
//中國信託
exports.ctbcbk = function (completeBlock) {
    var ctbcbkJson = [];
    var ctbcUpdateTime;
    var ctbc = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                $('#mainTable tr').each(function (index) {
                    if (index >= 1) {       
                        var result = $(this).text().trim().split("\r\n");
                        var priceObj = {};
                        var key = result[1].trim().replace(/\/ /g, ""); 
                        priceObj.bkbuy = result[6].trim();
                        priceObj.bksell = result[7].trim();
                        priceObj.cashbuy =  result[4].trim();
                        priceObj.cashsell = result[5].trim();
                        ctbcbkJson[key] = priceObj;
                    }   
                             
                });
                var time = $('.answer').text();
                var timeArray = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
                ctbcUpdateTime = timeArray[0];
                ctbcbkJson['time'] = ctbcUpdateTime;
                completeBlock(ctbcbkJson);
                // console.log(ctbcbkJson);
                // console.log(ctbcUpdateTime);
            }
            done();
        }
    });

    ctbc.queue('https://www.ctbcbank.com/CTCBPortalWeb/toPage?id=TW_RB_CM_ebank_018001');
}
//遠東
exports.feibbk = function (completeBlock) {
    var feibbkJson = [];
    var feibUpdateTime;
    var feib = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
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
                        feibbkJson[key] = priceObj;
                    }   
                             
                });
                var exformat = new ExFormat("feibbk",feibbkJson);
                completeBlock(exformat.exportJson());

                // completeBlock(feibbkJson);
                // console.log(feibbkJson);
            }
            done();
        }
    });

    feib.queue('https://www.feib.com.tw/financialinfo/exchangerate03.aspx');


    //Common
    //清除陣列裡的空字串
    Array.prototype.clean = function() {
      for (var i = 0; i < this.length; i++) {

        if (this[i].trim().length == 0) {         
          this.splice(i, 1);
          i--;
        }
      }
      return this;
    };
}
//永豐
exports.sinopacbk = function (completeBlock) {
    var sinopacbkJson = [];
    var sinopacUpdateTime;
    var sinopac = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                $('table table tr').each(function (index) {
                    if (index >= 3) {       
                        var result = $(this).text().trim().split("     ");
                        var priceObj = {};
                        var key = result[0].trim();

                        priceObj.bkbuy = result[1].trim();
                        priceObj.bksell = result[2].trim();
                        priceObj.cashbuy = (result[3] != undefined)? result[3].trim() : "-";
                        priceObj.cashsell = (result[4] != undefined)? result[4].trim() : "-";
                        sinopacbkJson[key] = priceObj;
                    }   
                             
                });
                var time = $('table').text();
                sinopacUpdateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
                sinopacbkJson['time'] = sinopacUpdateTime;

                var exformat = new ExFormat("sinopacbk",sinopacbkJson);
                completeBlock(exformat.exportJson());

                // completeBlock(sinopacbkJson);
                // console.log(sinopacUpdateTime);
                // console.log(sinopacbkJson);
            }
            done();
        }
    });

    sinopac.queue('https://mma.sinopac.com/WebATM/html/pages/jsp/mma/bank/CurrRemittance.jsp');
}
//凱基
exports.kgibk = function (completeBlock) {
    var kgibkJson = [];
    var kgiUpdateTime;
    var kgi = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                $('.tb_05 tr').each(function (index) {
                    if (index == 0) { 
                        var time = $(this).text();
                        kgiUpdateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
              
                    }
                    if (index >= 2) {       

                        var result = $(this).text().trim().split("\n");
                        var priceObj = {};
                        var key = $(this).find('td').eq(0).text();

                        priceObj.bkbuy = $(this).find('td').eq(2).text();
                        priceObj.bksell = $(this).find('td').eq(3).text();
                        priceObj.cashbuy = $(this).find('td').eq(4).text();
                        priceObj.cashsell = $(this).find('td').eq(5).text();
                        kgibkJson[key] = priceObj;
                    }   
                             
                });
                kgibkJson['time'] = kgiUpdateTime;
                completeBlock(kgibkJson);
                // console.log(kgiUpdateTime);
                // console.log(kgibkJson);
            }
            done();
        }
    });

    kgi.queue('https://www.kgibank.com/T01/T0111/rate03.jsp');
}
//大眾
exports.tcbk = function (completeBlock) {
    var tcbkJson = [];
    var tcUpdateTime;
    var tc = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                $('.table_typle3 tr').each(function (index) {
                    
                    if (index >= 1) {       

                        var result = $(this).text().trim().split("\n");
                        var priceObj = {};
                        var key = $(this).find('td').eq(1).text();

                        priceObj.bkbuy = $(this).find('td').eq(4).text();
                        priceObj.bksell = $(this).find('td').eq(5).text();
                        priceObj.cashbuy = $(this).find('td').eq(2).text();
                        priceObj.cashsell = $(this).find('td').eq(3).text();
                        tcbkJson[key] = priceObj;
                    }   
                             
                });
                tcUpdateTime = $(".updateDate").text().trim();
                tcbkJson['time'] = tcUpdateTime;
                completeBlock(tcbkJson);
                // console.log(tcUpdateTime);
                // console.log(tcbkJson);
            }
            done();
        }
    });

    tc.queue('http://www.tcbank.com.tw/tw/ExchangeRate/Current');
}
//安泰
exports.entiebk = function (completeBlock) {
    var entiebkJson = [];
    var entieUpdateTime;
    var entie = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
               $("table[summary='外幣匯率'] tr").each(function (index) {
                    
                    if (index >= 1) {       

                        var result = $(this).text().trim().split("\n");
                        var priceObj = {};
                        var key = $(this).find('td').eq(0).text();

                        priceObj.bkbuy = $(this).find('td').eq(1).text();
                        priceObj.bksell = $(this).find('td').eq(2).text();
                        priceObj.cashbuy = $(this).find('td').eq(3).text();
                        priceObj.cashsell = $(this).find('td').eq(4).text();
                        entiebkJson[key] = priceObj;
                    }   
                             
                });
               
                var time = $("table[summary='更新日期時間']").text().trim();
                entieUpdateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
                entiebkJson['time'] = entieUpdateTime;
                var exformat = new ExFormat("entiebk",entiebkJson);
                completeBlock(exformat.exportJson());


                // completeBlock(entiebkJson);
                // console.log(entieUpdateTime);
                // console.log(entiebkJson);
            }
            done();
        }
    });

    entie.queue('http://www.entiebank.com.tw/rate/page_host.asp');
}
//渣打
exports.scbk = function (completeBlock) {
    var scbkJson = [];
    var scUpdateTime;
    var sc = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
               $("table tr").each(function (index) {
                    if (index >= 3) {       
                        var priceObj = {};
                        var key = $(this).find('td').eq(0).text();
                        priceObj.bkbuy = $(this).find('td').eq(3).text();
                        priceObj.bksell = $(this).find('td').eq(4).text();
                        priceObj.cashbuy = $(this).find('td').eq(1).text();
                        priceObj.cashsell = $(this).find('td').eq(2).text();
                        scbkJson[key] = priceObj;
                    }   
                             
                });
               
                var time = $("body").text().trim();
                scUpdateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
                scbkJson['time'] = scUpdateTime;
                var exformat = new ExFormat("scbk",scbkJson);
                completeBlock(exformat.exportJson());
                // completeBlock(scbkJson);
                // console.log(scUpdateTime);
                // console.log(scbkJson);
            }
            done();
        }
    });

    sc.queue('http://www.entiebank.com.tw/rate/page_host.asp');
}
//上海
exports.scsbbk = function (completeBlock) {
    var scsbbkJson = [];
    var scsbUpdateTime;
    var scsb = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
               $(".tb2 tr").each(function (index) {
                    if (index >= 4) {       
                        var priceObj = {};
                        var key = $(this).find('td').eq(0).text().trim();
                        if (key != "") {
                            priceObj.buy = $(this).find('td').eq(2).text().trim();
                            priceObj.sell = $(this).find('td').eq(3).text().trim();
                            scsbbkJson[key] = priceObj;
                        }
                        
                    }   
                             
                });
               
                var time = $(".txt07").text().trim();
                var timeDate = time.match(/(\d+)*( 年 )(\d+)*( 月 )(\d+)*( 日)/g);
                var timeTime = time.match(/(\d+)(-|\:)(\d+)(-|\:)(\d+)/g);
                scsbUpdateTime = timeDate[0] + " " + timeTime[0];
                scsbbkJson['time'] = scsbUpdateTime;
                completeBlock(scsbbkJson);
                // console.log(scsbUpdateTime);
                // console.log(scsbbkJson);
            }
            done();
        }
    });

    scsb.queue('https://ibank.scsb.com.tw/netbank.portal?_nfpb=true&_pageLabel=page_other12&_nfls=false');
}
//星展
exports.dbsbk = function (completeBlock) {
    var dbsbkJson = [];
    var dbsUpdateTime;
    var dbs = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
               $(".table-bordered tr").each(function (index) {
                    if (index >= 2) {       
                        var priceObj = {};
                        var key = $(this).find('td').eq(1).text().trim();
                        if (key != "") {
                            priceObj.bkbuy = $(this).find('td').eq(3).text();
                            priceObj.bksell = $(this).find('td').eq(2).text();
                            priceObj.cashbuy = $(this).find('td').eq(5).text();
                            priceObj.cashsell = $(this).find('td').eq(4).text();
                            dbsbkJson[key] = priceObj;
                        }
                        
                    }   
                             
                });
               
                var time = $(".rates-date-datetime").text().trim();
                dbsUpdateTime = time;
                dbsbkJson['time'] = dbsUpdateTime;
                completeBlock(dbsbkJson);
                // console.log(dbsUpdateTime);
                // console.log(dbsbkJson);
            }
            done();
        }
    });

    dbs.queue('http://www.dbs.com.tw/personal-zh/rates/foreign-exchange-rates.page');
}
//日盛
exports.netbk = function (completeBlock) {
    var netbkJson = [];
    var netUpdateTime;
    var net = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                $(".TitleForRate").siblings().each(function (index) {
                        
                        var priceObj = {};
                        var key = $(this).find('td').eq(0).text().trim();
                        if (key != "") {
                            priceObj.bkbuy = $(this).find('td').eq(1).text();
                            priceObj.bksell = $(this).find('td').eq(2).text();
                            priceObj.cashbuy = $(this).find('td').eq(3).text();
                            priceObj.cashsell = $(this).find('td').eq(4).text();
                            netbkJson[key] = priceObj;
                        }         
                });
                var time = $("b").text().trim();
                var timeDate = time.match(/(\d+)(-|\/)(\d+)(-|\/)(\d+)/g);
                var timeTime = time.match(/(\d+)(-|\:)(\d+)(-|\:)(\d+)/g);
                var timePM = time.match(/(下午)/g);
              
                if (timePM != undefined) {
                    tcbUpdateTime = timeDate + " PM " + timeTime;
                }else{
                    tcbUpdateTime = timeDate + " AM " + timeTime;
                }
                netbkJson['time'] = tcbUpdateTime;

                var exformat = new ExFormat("netbk",netbkJson);
                completeBlock(exformat.exportJson());

                // completeBlock(netbkJson);
                // console.log(tcbUpdateTime);
                // console.log(netbkJson);
            }
            done();
        }
    });

    net.queue('https://netbank.jihsunbank.com.tw/Rate/ExgRate.htm');
}
//匯豐
exports.hsbcbk = function (completeBlock) {
    var hsbcbkJson = [];
    var hsbcUpdateTime;
    var hsbc = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                $(".hsbcTableStyleForRates02 tr").each(function (index) {
                    if (index > 2 && index < 16) {
                        var priceObj = {};
                        var key = $(this).find('td').eq(0).text().trim();
                        if (key != "") {
                            priceObj.bkbuy = $(this).find('td').eq(1).text();
                            priceObj.bksell = $(this).find('td').eq(2).text();
                            priceObj.cashbuy = $(this).find('td').eq(3).text();
                            priceObj.cashsell = $(this).find('td').eq(4).text();
                            hsbcbkJson[key] = priceObj;
                        } 
                    }
                                
                });
                var time = $(".ForTime01").text().trim();
                hsbcUpdateTime = time.match(/(\d+)(-|\/)(\d+)(-|\/)(\d+)/g);
                hsbcbkJson['time'] = hsbcUpdateTime;
                var exformat = new ExFormat("hsbcbk",hsbcbkJson);
                completeBlock(exformat.exportJson());

                // completeBlock(hsbcbkJson);
                // console.log(hsbcUpdateTime);
                // console.log(hsbcbkJson);
            }
            done();
        }
    });

    hsbc.queue('https://www.hsbc.com.tw/1/2/Misc/popup-tw/currency-calculator');
}
//第一
exports.firstbk = function (completeBlock) {
    var firstbkJson = [];
    var firstUpdateTime;
    var first = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
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
                        firstbkJson[key] = priceObj;
                        
                    }
                                
                });
                var time = $(".locator2").text().trim();
                firstUpdateTime = time.match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/g);
                firstbkJson['time'] = firstUpdateTime;
                var exformat = new ExFormat("firstbk",firstbkJson);
                completeBlock(exformat.exportJson());

                // completeBlock(firstbkJson);
                // console.log(firstUpdateTime);
                // console.log(firstbkJson);
            }
            done();
        }
    });

    first.queue('https://ibank.firstbank.com.tw/NetBank/7/0201.html?sh=none');
}