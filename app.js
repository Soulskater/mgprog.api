const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();

app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', routes);
app.options('*', cors({
    origin: 'https://localhost:44302',
    optionsSuccessStatus: 200
}));

module.exports = app;
