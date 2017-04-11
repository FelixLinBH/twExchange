
'use strict';

function ExFormat (type,data) {
    var self = this;
    self.init(type,data);
}

var functionExFormat = { cathaybk:cathayFormat};

function cathayFormat(json) {
    // console.log("test");
    var newJson = {};
    // var keyword = ["(USD","(CNY","(HKD","(JPY","(EUR","(GBP)","(CHF)","(AUD)","(SGD)","(CAD)","(SEK)","(ZAR)","(DKK)","(THB)","(NZD)"];
    // console.log(json);
    for (var prop in json) {
      if (json.hasOwnProperty(prop)) {
        var match = prop.match(/([a-zA-Z]+)/g);
        // console.log(match);
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
    // console.log(newJson);
    return newJson;
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