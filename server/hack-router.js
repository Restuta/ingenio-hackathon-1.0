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


        var events = {
            consumer: [
                {name: 'new-question-posted', broadcast: true },
                {name: 'consumer-started-typing', broadcast: true },
                {name: 'consumer-pressed-key', broadcast: true }
            ],
            advisor: [

            ]
        };

        _.each(events.consumer, function(event){
            socket.on(event.name, function(data){
                log.event(event.name, data);

                if (event.broadcast === true) {
                    socket.broadcast.emit(event.name, data);
                }
            });
        });

        //for debugging
        socket.on('test', function(data) {
            log.event('test', data);
            socket.emit('new-answer', {a:8});
        });


        socket.on('new-advisor-answer', function(data) {
            log.event('new-advisor-answer', data);

            attachAdvisorInfo(data);
            log.event('new-advisor-answer(merged-data)', data);

            //TODO - Muthu/Anton , the above find method is still not working need to fix it
            data.profileImageUrl = '/images/anton-advisor.jpg';
            data.advisorName= "Psychic Answers By Candy";
            data.postedDate= "March 10, 2015";
            data.starRating= "4";
            data.pricePerMinute= "1.99";

            log.event('new-advisor-answer(final-data)', data);
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
    advisorId: 101,
    profileImageUrl: "/images/muthuadvisor.jpg",
    advisorName: "Muthu advisor",
    postedDate: "March 13, 2015",
    starRating: "5",
    pricePerMinute: ".99"
}, {
    advisorId: 102,
    profileImageUrl: "/images/anton-advisor.jpg",
    advisorName: "Anton advisor",
    postedDate: "March 13, 2015",
    starRating: "5",
    pricePerMinute: "1.99"
},{
    advisorId: 103,
    profileImageUrl: "http://i.keen.com/ad-products.cdn.memberphotos/54165337-1629739034.jpg",
    advisorName: "Intuitive coach",
    postedDate: "March 13, 2015",
    starRating: "3",
    pricePerMinute: "4.99"
},{
    advisorId: 104,
    profileImageUrl: "http://i.keen.com/ad-products.cdn.member75x75/22472422-1240184748.jpg",
    advisorName: "Love Expert Sara",
    postedDate: "March 13, 2015",
    starRating: "4",
    pricePerMinute: "2.99"
},{
    advisorId: 105,
    profileImageUrl: "http://i.keen.com/ad-products.cdn.memberphotos/14123273-2128725806.jpg",
    advisorName: "Psychic Answers By Candy",
    postedDate: "March 13, 2015",
    starRating: "3",
    pricePerMinute: "3.99"
}];

var attachAdvisorInfo= function(data){
    //Ensure the incoming data has the key 'advisorId'
    var filteredAdvisor = _.find(advisorList, {'advisorId': data.advisorId});
    _.merge(data, filteredAdvisor);
}


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