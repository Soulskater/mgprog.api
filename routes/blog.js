var express = require('express');
var cradle = require('cradle');
var dbConnector = require('../connectors/database');
var uuid = require('uuid');
const cors = require('cors');

function _registerRoutes(router) {
    router.route("/blog").get(cors({
        origin: 'https://localhost:44302',
        optionsSuccessStatus: 200
    }), function (req, res, next) {
        var connection = dbConnector.getConnection();
        var db = connection.database('blog');

        db.view('blog/all', function (err, result) {
            if (err) {
                res.json({error: err});
            } else {
                res.json(result.toArray());
            }
        });
    });
}

module.exports = _registerRoutes;
