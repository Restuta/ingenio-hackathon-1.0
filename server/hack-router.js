var express = require('express');
var router = express.Router();
var _ = require('lodash');
var chalk = require('chalk');
var util = require('util'); //node utils



module.exports = function Router(socketIo) {
    if (!socketIo) {
        throw 'Socket.io object must be provided to the Router.'
    }

    var io = socketIo;
    var totalClients = 0;

    router.get('/', function(req, res) {
        res.send('hello hacking world');
    });

    io.on('connection', function(socket) {
        log.info('client connected, total clients: ' + ++totalClients + chalk.grey(' connectionId: ' + socket.client.conn.id));

        socket.emit('connected-to-server', {msg: 'connected to server'});

        socket.on('consumer-started-typing', function(data) {
            log.event('consumer-started-typing', data);
        });

        //for debugging
        socket.on('test', function(data) {
            log.event('test', data);
            socket.emit('new-answer', {a:8});
        });

        socket.on('disconnect', function() {
            log.info('client disconnected, clients: ' + --totalClients);
        });
    });


    router.post('/:eventName', function(req, res) {
        var eventName = req.params.eventName;

        io.emit(eventName, ';D');
        res.send();
    });

    return router;
};

var log = {
    info: function(msg) {
        console.log(chalk.cyan('INFO ') + msg);
    },
    debug: function(msg) {
        console.log(chalk.magenta('DEBUG ') + msg);
    },
    event: function(name, data) {
        console.log(chalk.green('EVENT ')  + chalk.yellow(name) + ' ' + toJson(data));
    }
};

var toJson = function(object) {
    if (!object) {
        return '';
    }

    var json = util.inspect(object, {
        depth: 3,
        colors: true
    }).trim();

    if (json != '{}' && json != '' && json != 'undefined' && typeof json != 'undefined') {
        return (chalk.white(json));
    } else {
        return '';
    }
};