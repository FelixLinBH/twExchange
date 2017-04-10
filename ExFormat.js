
'use strict';

function ExFormat (type,data) {
    var self = this;
    self.init(type,data);
}

var functionExFormat = { cathaybk:cathayFormat};

function cathayFormat(json) {
    // console.log("test");
    var newJson = {};
    // console.log(json);
    for (var prop in json) {
      if (json.hasOwnProperty(prop)) {
        
        if (prop.includes("(USD)")) {
            var obj = {};
            obj['bkbuy'] = json[prop]['buy'];
            obj['bksell'] = json[prop]['sell'];
            newJson['USD'] = obj;
        }
        if (prop.includes("(USD Cash)")) {
            var obj = (newJson['USD'] != undefined)?newJson['USD']:{};
            obj['cashbuy'] = json[prop]['buy'];
            obj['cashsell'] = json[prop]['sell'];
            newJson['USD'] = obj;
        }
        console.log(json[prop])

      }
    }
    console.log(newJson);
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