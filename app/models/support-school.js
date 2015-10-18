"use strict"

var schoolJson = require('./school');

function activeCodes() {
    var codes = [];
    for (var a in schoolJson) {
        var schools = schoolJson[a].schools;
        for (var b in schools) {
            var active = schools[b].active;
            if (active) {
                codes.push(schools[b].code);
            }
        }
    }
    return codes;
}

module.exports = {
    schoolArray: activeCodes()
};