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

        socket.on('new-question-posted', function(data) {
            log.event('new-question-posted', data);
            socket.broadcast.emit('new-question-posted', data);
        });

        socket.on('consumer-started-typing', function(data) {
            log.event('consumer-started-typing', data);
            socket.broadcast.emit('consumer-started-typing', data);
        });

        socket.on('consumer-pressed-key', function(data) {
            log.event('consumer-pressed-key', data);
            socket.broadcast.emit('consumer-pressed-key', data);
        });

        socket.on('new-advisor-answer', function(data) {
            log.event('new-advisor-answer', data);
            //TODO:Add some advisor info matchign the advisorid to the data which is required to be shown on the home page
            //Muthu- Anton to help here. Think we can get better filtered in lodash
            //var selectedAdvisor = null;
            //_.find(advisorList,function(item){
            //    if (item.id === data.advisorId){
            //        log.info('Matching advisor : ' +item.id);
            //        selectedAdvisor = item;
            //    }
            //});

            data.profileImageUrl = "http://i.keen.com/ad-products.cdn.memberphotos/14123273-2128725806.jpg";
            data.advisorName= "Psychic Answers By Candy";
            data.postedDate= "March 10, 2015";
            data.starRating= "4";

            log.event('new-advisor-answer(modified-data)', data);
            socket.broadcast.emit('new-advisor-answer', data);
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

//Sample advisors data
var advisorList = [{
    id: 101,
    profileImageUrl: "http://i.keen.com/ad-products.cdn.member75x75/22472422-1240184748.jpg",
    advisorName: "Love Expert Sara",
    postedDate: "March 10, 2015",
    starRating: "5"
}, {
    id: 102,
    profileImageUrl: "http://i.keen.com/ad-products.cdn.memberphotos/14123273-2128725806.jpg",
    advisorName: "Psychic Answers By Candy",
    postedDate: "March 10, 2015",
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