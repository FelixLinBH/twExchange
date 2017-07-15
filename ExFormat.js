
'use strict';

function ExFormat (type,data) {
    var self = this;
    self.init(type,data);
}

var functionExFormat = {
    cathaybk:cathayFormat,
    fubonbk:fubonFormat,
    megabk:normalFormat,
    twbk:normalFormat,
    chbbk:chbFormat,
    esunbk:normalFormat,
    hncbbk:hncbFormat,
    feibbk:normalFormat,
    sinopacbk:normalFormat,
    entiebk:normalFormat,
    scbk:normalFormat,
    netbk:netbkFormat,
    hsbcbk:normalFormat,
    firstbk:firstbkFormat,
    scsbbk:scsbbkFormat,
    taishinbk:normalFormat,
    tcbk:normalFormat,
    dbsbk:normalFormat,
    ctbcbk:normalFormat,
    kgibk:normalFormat,
    tcbbk:normalFormat,
};

var mapping = {
    '美金':'USD',
    '美金現金':'USD',
    '美元':'USD',
    '港幣':'HKD',
    '港幣現金':'HKD',
    '英鎊':'GBP',
    '紐西蘭幣':'NZD',
    '紐幣':'NZD',
    '澳幣':'AUD',
    '新加坡幣':'SGD',
    '瑞士法郎':'CHF',
    '加幣':'CAD',
    '日幣':'JPY',
    '日圓':'JPY',
    '日元':'JPY',
    '日幣現金':'JPY',
    '瑞典幣':'SEK',
    '南非幣':'ZAR',
    '泰國銖':'THB',
    '歐元':'EUR',
    '歐元現金':'EUR',
    '人民幣':'CNY',
    '韓元':'KRW',
    '加拿大幣':'CAD',
    '丹麥幣':'DDK',
    '泰銖':'THB',
    '美金小額':'USD',
    '美金大額':'USD-L',
    '離岸人民幣':'CNY',
    '在岸人民幣':'CNY-IN',
    '人民幣現鈔':'CNY'
}

var engmapping = {
    'U.S. Dollar(USD)':'USD',
    'British Pound(GBP)':'GBP',
    'Hong Kong Dollar(HKD)':'HKD',
    'Australian Dollar(AUD)':'AUD',
    'Singapore Dollar(SGD)':'SDG',
    'Confederation Helvetica Franc(CHF)':'CHF',
    'Canadian Dollar(CAD)':'CAD',
    'Japanese Yen (JPY)':'JPY',
    'South African Rand(ZAR)':'ZAR',
    'Swedish Krona(SEK)':'SEK',
    'Thailand Baht(THB)':'THB',
    'New Zealand Dollar(NZD)':'NZD',
    'Euro(EUR)':'EUR',
    'Turkish Lira(TRY)':'TRY',
    'large amounts of US Dollars (USD)':'USD-L',
    'CNY':'CNY'
}

function cathayFormat(json) {
    var newJson = {};
    for (var prop in json) {
      if (json.hasOwnProperty(prop)) {
        var match = prop.match(/([a-zA-Z]+)/g);
        if (match.length == 1 && match[0] != 'time') {
            var obj = (newJson[match[0]] != undefined)?newJson[match[0]]:{};
            obj['bkbuy'] = json[prop]['buy'];
            obj['bksell'] = json[prop]['sell'];
            newJson[match[0]] = obj;
        }else if (match.length == 2) {
            var obj = (newJson[match[0]] != undefined)?newJson[match[0]]:{};
            obj['cashbuy'] = json[prop]['buy'];
            obj['cashsell'] = json[prop]['sell'];
            newJson[match[0]] = obj;
        }else{
            newJson[match[0]] = json[prop];
        }

      }
    }
    return newJson;
}

function fubonFormat(json) {
    var newJson = {};
    for (var prop in json) {
      if (json.hasOwnProperty(prop)) {
        var match = prop.match(/([a-zA-Z]+)/g);
        if (match[0] != 'time') {
            var obj = (newJson[match[0]] != undefined)?newJson[match[0]]:{};
            obj['bkbuy'] = json[prop]['bkbuy'];
            obj['bksell'] = json[prop]['bksell'];
            if (!isNaN(json[prop]['cashbuy'])) {
                obj['cashbuy'] = json[prop]['cashbuy'];
                obj['cashsell'] = json[prop]['cashsell'];
            }
            newJson[match[0]] = obj;
        }else{
            newJson[match[0]] = json[prop];
        }

      }
    }
    return newJson;
}

function normalFormat(json) {
    var newJson = {};
    for (var prop in json) {
      if (json.hasOwnProperty(prop)) {
        var match = prop.match(/([a-zA-Z]+)/g);
        if (match[0] != 'time') {
            var obj = (newJson[match[0]] != undefined)?newJson[match[0]]:{};
            if (!isNaN(json[prop]['bkbuy'])) {
                obj['bkbuy'] = json[prop]['bkbuy'];
                obj['bksell'] = json[prop]['bksell'];
            }
            if (!isNaN(json[prop]['cashbuy'])) {
                obj['cashbuy'] = json[prop]['cashbuy'];
                obj['cashsell'] = json[prop]['cashsell'];
            }
            newJson[match[0]] = obj;
        }else{
            newJson[match[0]] = json[prop];
        }

      }
    }
    return newJson;
}

function chbFormat(json) {
    var newJson = {};
    for (var prop in json) {
      if (json.hasOwnProperty(prop)) {
        var data = json[prop];
        prop = fullToHalf(prop);
        var match = prop.match(/([a-zA-Z]+)/g);
        if (match[0] != 'time') {
            var obj = (newJson[match[0]] != undefined)?newJson[match[0]]:{};
            if (prop.match(/(-C)/)) {
                obj['cashbuy'] = data['buy'];
                obj['cashsell'] = data['sell'];
            }else{
                obj['bkbuy'] = data['buy'];
                obj['bksell'] = data['sell'];
            }
            newJson[match[0]] = obj;
        }else{
            newJson['time'] = data[0];
        }

      }
    }
    return newJson;
}

function hncbFormat(json) {
    var newJson = {};
    for (var prop in json) {
      if (json.hasOwnProperty(prop)) {
        if (prop.match(/([0-9]+)/g)) {
            continue;
        }
        var searchKey = prop.replace("現鈔", "");
        var key = mapping[searchKey];
        var data = json[prop];
        if (prop != 'time') {
            var obj = (newJson[key] != undefined)?newJson[key]:{};
            if (prop.match(/(現鈔)/)) {
                obj['cashbuy'] = data['buy'];
                obj['cashsell'] = data['sell'];
            }else{
                obj['bkbuy'] = data['buy'];
                obj['bksell'] = data['sell'];
            }
            newJson[key] = obj;
        }else{
            newJson['time'] = data[0];
        }

      }
    }
    return newJson;
}

function netbkFormat(json) {
    var newJson = {};
    for (var prop in json) {
        if (prop != 'time') {
            if (mapping[prop] === undefined) {
                continue;
            }
            newJson[mapping[prop]] = json[prop];
        }else{
            newJson['time'] = json[prop];
        }
    }
    return newJson;
}

function firstbkFormat(json) {
    var newJson = {};
    for (var prop in json) {
        if (prop != 'time') {
            if (engmapping[prop] === undefined) {
                continue;
            }
            newJson[engmapping[prop]] = json[prop];
        }else{
            newJson['time'] = json[prop];
        }
    }
    return newJson;
}

function scsbbkFormat(json) {
    var newJson = {};
    for (var prop in json) {
        if (prop == 'time') {
            newJson['time'] = json[prop];
        }else{
            var searchKey = prop.replace(/　/g, "");

            var key = mapping[searchKey];
            if (key === undefined) {
                continue;
            }
            var obj = (newJson[key] != undefined)?newJson[key]:{};
            var data = json[prop];
            if (searchKey.match(/(現金)/) || searchKey.match(/(現鈔)/)) {
                obj['cashbuy'] = data['buy'];
                obj['cashsell'] = data['sell'];
            }else{
                obj['bkbuy'] = data['buy'];
                obj['bksell'] = data['sell'];
            }
            newJson[key] = obj;
        }
    }
    return newJson;
}


//Common function
function fullToHalf(val) {
  var value = val || "";
  var result = "";
  if (value) {
    for (var i = 0; i <= value.length; i++) {
      if (value.charCodeAt(i) == 12288) {
        result += " ";
      } else {
        if (value.charCodeAt(i) > 65280 && value.charCodeAt(i) < 65375) {
          result += String.fromCharCode(value.charCodeAt(i) - 65248);
        } else {
          result += String.fromCharCode(value.charCodeAt(i));
        }
      }
    }
  } 
  return result;
}

ExFormat.prototype.init = function init (type,data) {
    var self = this;
    if (functionExFormat[type] == undefined) {
        throw new Error("type is undefined");
    }
    var formater = functionExFormat[type];
    self.json = formater(data);
};

ExFormat.prototype.exportJson = function _exportJson(){
    var self = this;
    return self.json;
}

module.exports = ExFormat;