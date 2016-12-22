var express = require('express');
var cradle = require('cradle');
var dbConnector = require('../connectors/database');
var uuid = require('uuid');

exports.index = function (req, res, next) {
    var connection = dbConnector.getConnection();
    var db = connection.database('blog');

    db.view('blog/all', function (err, result) {
        if (err) {
            res.json({error: err});
        } else {
            res.json(result.toArray());
        }
    });
};
