"use strict";

var winston = require('winston');
var config = require("./soshu-config");
var fs = require("fs-extra");

var env = process.env.NODE_ENV || "dev";

winston.handleExceptions(new (winston.transports.Console)());

fs.ensureDirSync(config.logDir);

winston.level = config.logLevel || 'info';

var logger = new (winston.Logger)({
    exitOnError: false,
    transports: [
        new (winston.transports.Console)({level: "error"}),
        new (winston.transports.DailyRotateFile)({
            filename: "soshu-log.log",
            tailable: true,
            maxsize: 50 * 1024 * 1024, // 50M
            maxFiles: 500,
            showLevel: true,
            dirname: config.logDir
        })
    ]
});

module.exports = logger;