var express = require('express');
var router = express.Router();
var _ = require('lodash');
var chalk = require('chalk');
var util = require('util'); //node utils
var request = require('request-promise');
var moment = require('moment');

var advisorList = [];

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

        var events = {
            consumer: [
                {name: 'new-question-posted', broadcast: true},
                {name: 'consumer-started-typing', broadcast: true},
                {name: 'consumer-pressed-key', broadcast: true}
            ],
            advisor: [
                //{name: 'new-advisor-answer', broadcast: true},
                {name: 'advisor-pressed-key', broadcast: true}
            ]
        };

        //logging and broadcasting above events
        _.each(events.consumer, function(event) {
            socket.on(event.name, function(data) {
                log.event(event.name, data);

                if (event.broadcast === true) {
                    socket.broadcast.emit(event.name, data);
                }
            });
        });

        //for debugging
        socket.on('test', function(data) {
            log.event('test', data);
        });

        socket.on('advisor-pressed-key', function(data) {
            log.event('advisor-pressed-key', data);
            socket.broadcast.emit('advisor-pressed-key', data);
        });

        socket.on('new-advisor-answer', function(data) {
            log.event('new-advisor-answer(incoming)', data);
            attachAdvisorInfo(data);
            log.event('new-advisor-answer(outgoing)', data);
            socket.broadcast.emit('new-advisor-answer', data);
        });

        socket.on('advisor-name-set', function(data) {
            log.event('advisor-name-set', data);

            createRandomAdvisor(data.advisorName)
                .then(function(advisor) {
                    log.debug(advisor);

                    advisorList.push(advisor);

                    log.debug(advisor.advisorId);

                    socket.emit('advisor-assigned', advisor);
                });
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
        console.log(chalk.green('EVENT ') + chalk.yellow(name) + ' ' + toJson(data));
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

function createRandomAdvisor(name) {
    var createAdvisor = function(user) {
        return {
            advisorId: Math.floor((Math.random() * 100000000000) + 1),
            profileImageUrl: user.picture.large,
            advisorName: name || (user.name.first + ' ' + user.name.last),
            postedDate: moment().format('MMMM Do, h:mm:ss a'), //March 8th 2015
            starRating: Math.floor((Math.random() * 5) + 1),
            pricePerMinute: (Math.floor((Math.random() * 5) + 1) + 0.99).toFixed(2)
        }
    };

    return request('http://api.randomuser.me/')
        .then(function(body) {
            return JSON.parse(body).results[0].user;
        })
        .then(createAdvisor);
}


var attachAdvisorInfo = function(data) {
    //Ensure the incoming data has the key 'advisorId'
    var advisorId = _.parseInt(data.advisorId);
    var filteredAdvisor = _.find(advisorList, {'advisorId': advisorId});
    _.merge(data, filteredAdvisor);
};

//Keeping it simple by having questions at  user level and its corresponding answers to be used on chat page.
// In ideal situation we will be having questionid generated and handled (but not for now)
var questionAndAnswers = [
    //Sample data just to denote the structure. When the eventHandler which handles emitting new answer is written,
    // it should add the info here as and when the new answer arrives
    {
        userId: 1,
        question: 'Sample Question',
        answers: [
            {
                advisorId: 999,
                answer: 'Sample answer 999'
            },
            {
                advisorId: 888,
                answer: 'Sample answer from 888'
            }
        ]
    }
];