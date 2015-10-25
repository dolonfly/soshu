var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require("./app/soshu-config");
var SoshuLogger = require("./app/soshu-logger");
var cronJob = require('cron').CronJob;
var spawn = require('child_process').spawn;
var supportSchools = require('./app/models/support-school');

var apiRoutes = require('./app/routes/api-routes');
var webRoutes = require('./app/routes/web-routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
    var school = req.query.school;
    if (!school) {
        res.status(400).json({
            message: "school code required"
        });
    } else if (supportSchools.schoolArray.indexOf(school) < 0) {
        res.status(400).json({
            message: "valid code required"
        });
    } else {
        next();
    }

});

app.use('/api/v1', apiRoutes);
app.use('/', webRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


require("./app/models/soshu-mongo").init(config.db);
SoshuLogger.info("Load config as: " + JSON.stringify(config));

var job = new cronJob(config.autoUpdate, function () {
    console.log("定时任务开启");
    var autoUpdateBooks = spawn(process.execPath, [path.resolve(__dirname, 'app/task/top-dangdang')]);
    autoUpdateBooks.stdout.pipe(process.stdout);
    autoUpdateBooks.stderr.pipe(process.stderr);
    autoUpdateBooks.on('close', function (code) {
        console.log('更新任务结束，代码=%d', code);
    });
});
job.start();


module.exports = app;
