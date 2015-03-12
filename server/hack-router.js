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

    router.get('/', function(req, res) {
        res.send('hello hacking world');
    });

    io.on('connection', function(socket) {
        log.info('client connected');
        socket.emit('connected-to-server', {msg: 'connected to server'});
    });

    io.on('consumer-started-typing', function(data) {
        log.json(data);
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
    json: function(object) {
        var json = util.inspect(object, {
            depth: 3,
            colors: true
        }).trim();

        if (json != '{}' && json != '' && json != 'undefined' && typeof json != 'undefined') {
            process.stdout.write(chalk.white(json) + '\n');
        }
    }
};