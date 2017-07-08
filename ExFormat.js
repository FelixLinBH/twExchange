
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