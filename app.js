const express = require('express');
const routes = require('./routes');
const http = require('http');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function (req, res) {
    res.render('index', {title: 'Api', year: new Date().getFullYear()});
});


var api = express();
api.use(bodyParser.json({type: "application/json"}));
//api.use(bodyParser.urlencoded({extended: true}));
routes.registerRoutes(api);
app.use("/api", api);
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
