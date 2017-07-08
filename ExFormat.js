
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
                            };

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
    // console.log(newJson);
    return newJson;
}

function fubonFormat(json) {
    var newJson = {};
    // console.log(json);
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
    // console.log(json);
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