var express = require('express');
var router = express.Router();
var _ = require('lodash');

router.get('/', function(req, res){
    res.send('hello hacking world');
});


module.exports = router;