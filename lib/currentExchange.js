var Crawler = require('crawler');
var url = require('url');
var moment = require('moment');
var iconv = require('iconv-lite');
var Runner = require('./Runner.js');
var bankMappingWebsite = {
    "cathaybk":"https://www.cathaybk.com.tw/cathaybk/mobile/rate_01.asp",
    "fubonbk":"https://ebank.taipeifubon.com.tw/B2C/cfhqu/cfhqu009/CFHQU009_Home.faces",
    "megabk":"https://ebank.megabank.com.tw/global2/rs/rs02/PRS2001.faces",
    "twbk":"http://rate.bot.com.tw/xrt?Lang=zh-TW",
    //彰銀 本畫面每二分鐘更新一次，資料僅供參考
    "chbbk":"https://www.bankchb.com/chb_accessibility/G0100.jsp",
    "esunbk":"https://www.esunbank.com.tw/bank/personal/deposit/rate/forex/foreign-exchange-rates",
    "taishinbk":"https://www.taishinbank.com.tw/TS/TS06/TS0605/TS060502/index.htm?urlPath1=TS02&urlPath2=TS0202",
    "hncbbk":"https://ibank.hncb.com.tw/netbank/pages/jsp/ExtSel/RTExange.html",
    "tcbbk":"https://www.tcb-bank.com.tw/finance_info/Pages/foreign_spot_rate.aspx",
    "ctbcbk":"https://www.ctbcbank.com/CTCBPortalWeb/toPage?id=TW_RB_CM_ebank_018001",
    "feibbk":"https://www.feib.com.tw/financialinfo/exchangerate03.aspx",
    "sinopacbk":"https://mma.sinopac.com/WebATM/html/pages/jsp/mma/bank/CurrRemittance.jsp",
    "kgibk":"https://www.kgibank.com/T01/T0111/rate03.jsp",
    "tcbk":"http://www.tcbank.com.tw/tw/ExchangeRate/Current",
    "entiebk":"http://www.entiebank.com.tw/rate/page_host.asp",
    "scbk":"http://www.entiebank.com.tw/rate/page_host.asp",
    "scsbbk":"https://ibank.scsb.com.tw/netbank.portal?_nfpb=true&_pageLabel=page_other12&_nfls=false",
    "dbsbk":"http://www.dbs.com.tw/personal-zh/rates/foreign-exchange-rates.page",
    "netbk":"https://netbank.jihsunbank.com.tw/Rate/ExgRate.htm",
    "hsbcbk":"https://www.hsbc.com.tw/1/2/Misc/popup-tw/currency-calculator",
    "firstbk":"https://ibank.firstbank.com.tw/NetBank/7/0201.html?sh=none"
}


var OBJ = function() {

    var c = new Crawler({
        maxConnections : 21,
    });

    var getCurrentExChange = function(bank,completeBlock){
        c.queue([{
            uri: bankMappingWebsite[bank],

            callback: function (error, res, done) {
                if(error){
                    console.log(error);
                }else{
                    var runner = new Runner(bank,res.$);
                    completeBlock(bank,runner.exportJson());
                }
                done();
            }
        }]);
    }

    return {
        getCurrentExChange: getCurrentExChange
    };
}

module.exports =  (function() {  
    var instance;

    function factory() {
        return OBJ()
    }

    function getInstance() {
        if (instance === undefined) {
            instance = factory();
        }

        return instance;
    }

    return (function(){
        {
            if (instance === undefined) {
                instance = factory();
            }

            return instance;
        }
    })()
})();

