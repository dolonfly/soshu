'use strict';

var School = require("../models/school-model");
var Resout = require('../models/resout');


function saveSchool(school, callback) {
    School.create(school, function (err, res) {
        callback(err, res);
    });
}

function listAllSchools(callback) {
    //School.find().exec(callback);
    var resout = new Resout(200,School.support_schools);

    callback(null, resout.serialize());
}

module.exports = {
    save: saveSchool,
    listAll: listAllSchools
};

