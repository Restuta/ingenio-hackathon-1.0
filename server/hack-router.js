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

    router.get('/', function (req, res) {
        res.send('hello hacking world');
    });

    io.on('connection', function (socket) {
        log.info('client connected, total clients: ' + ++totalClients + chalk.grey(' connectionId: ' + socket.client.conn.id));

        socket.emit('connected-to-server', {msg: 'connected to server'});

        socket.on('consumer-started-typing', function (data) {
            log.event('consumer-started-typing', data);
        });

        //for debugging
        socket.on('test', function (data) {
            log.event('test', data);
            socket.emit('new-answer', {a: 8});
        });

        socket.on('post-new-question', function (data) {
            log.event('post-new-question', data);
            //massage the data before emitting if required
            socket.emit('new-question-posted', data);
        });

        socket.on('disconnect', function () {
            log.info('client disconnected, clients: ' + --totalClients);
        });
    });


    router.post('/:eventName', function (req, res) {
        var eventName = req.params.eventName;

        io.emit(eventName, ';D');
        res.send();
    });

    return router;
};

var log = {
    info: function (msg) {
        console.log(chalk.cyan('INFO ') + msg);
    },
    debug: function (msg) {
        console.log(chalk.magenta('DEBUG ') + msg);
    },
    event: function (name, data) {
        console.log(chalk.green('EVENT ') + chalk.yellow(name) + ' ' + toJson(data));
    }
};

var toJson = function (object) {
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

//Sample advisors data
var advisorInfo = [{
    id: 1,
    profileImageUrl: "http://i.keen.com/ad-products.cdn.member75x75/22472422-1240184748.jpg",
    advisorId: 101,
    advisorName: "Love Expert Sara",
    postedDate: "March 10, 2015",
    messageText: "Excellent feature! I love it. We are defintiely going to rock it on this friday!. Excellent feature! I love it. We are defintiely going to rock it on this friday!Excellent feature! I love it. We are defintiely going to rock it on this friday!",
    starRating: "5"
}, {
    id: 2,
    profileImageUrl: "http://i.keen.com/ad-products.cdn.memberphotos/14123273-2128725806.jpg",
    advisorId: 103,
    advisorName: "Psychic Answers By Candy",
    postedDate: "March 10, 2015",
    messageText: "Can't say for sure, but I feel the presence of somebody important. It might be somebody from your past or nearest future. I need a little more info to tell for sure.",
    starRating: "4"
}];


//Keeping it simple by having questions at  user level and its corresponding answers to be used on chat page. In ideal situation we will be having questionid generated and handled (but not for now)
var questionAndAnswers = [
    //Sample data just to denote the structure. When the eventHandler which handles emitting new answer is written, it should add the info here as and when the new answer arrives
    {
        userId: 1,
        question: 'Sample Question',
        answers:[
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