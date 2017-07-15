
'use strict';

var ExFormat = require('./ExFormat.js');
var Pattern = require('./Pattern.js');

function Runner (type,data) {
    var self = this;
    self.init(type,data);
}

function run(type,body) {    
    var pattern = new Pattern(type,body);
    var exformat = new ExFormat(type,pattern.exportJson());
    return exformat.exportJson();
}

Runner.prototype.init = function init (type,body) {
    var self = this;
    if (type == undefined) {
        throw new Error("type is undefined");
    }
    self.json = run(type,body);
};

Runner.prototype.exportJson = function _exportJson(){
    var self = this;
    return self.json;
}

module.exports = Runner;