var school_service = require('../services/school-service');

function listAll(req, res, next) {
    school_service.listAll(function (err, resout) {
        if (err) {
            res.json("{}");
        } else {
            console.log("=====success");
            console.log(resout);
            res.json(resout);
        }
    });
}

function saveSchool(req, res, next) {
    var school = {
        name: '中原工学院',
        name_en: 'zut',
        code: 'zut',
        apiPerfix: '',
        homePage: 'http://www.zut.edu.cn/',
        province: '河南',
        city: '郑州',
        active: false
    };
    school_service.save(school, function (err, resout) {
        res.json(resout);
    });
}


module.exports = {
    list: listAll,
    save: saveSchool
}