var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
var argv = require('minimist')(process.argv.slice(2));
var chalk = require('chalk');

var logger = require('./logger');
logger.setOptions({
    apiLatency: argv.latency,
    groupRequestsMadeInBetween: argv.grouping,
    logBody: argv.logBody
});

var router = require('./hack-router');

var port = 31337;

var corsSettings = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-EpcApi-ID');
    next();
};

app.use(bodyParser.json()); //to parse json from incoming requests to req.body
app.use(logger); //custom logger to log all requests made to console
app.use(corsSettings); //allowing cross-domain requests
app.use(router);

//logging syntax sugar
var log = console.log.bind(console);

var apiLatency = argv.latency || 0;
var grouping = argv.grouping || 200;

server.listen(port, function() {
    if (apiLatency > 0) {
        log(chalk.green('Running API Server with artificial latency ')
        +  chalk.grey(apiLatency + 'ms')
        + ' at '
        + chalk.yellow('localhost:' + port + '...'));
    } else {
        log(chalk.green('Running API Server at ')
        + chalk.yellow('localhost:' + port + '...'));
    }

    if (grouping > 0) {
        log(chalk.grey(' grouping requests happened in-between ')
        + chalk.white(grouping + 'ms'));
    }

});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

router.post('/:eventName', function(req, res) {
    var eventName = req.params.eventName;

    io.emit(eventName, ';D');
    res.send();
});


