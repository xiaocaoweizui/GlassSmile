var express = require('express');
var app = express();

//app.use(express.static(__dirname + '/public'));
var routes = require('../router')(app);

app.listen(8080);