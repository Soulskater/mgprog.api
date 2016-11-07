const uuid = require('uuid');
const cradle = require('cradle');
const jwt = require("jsonwebtoken");
const config = require("../configuration/configuration");
const cryptoService = require('../services/crypto');
const dbConnector = require('../connectors/database');

module.exports = {
    registerUser: function (newUser, callback) {
        const connection = dbConnector.getConnection();
        const salt = cryptoService.createSalt();
        var passHash = cryptoService.createHash(newUser.password, salt);

        var db = connection.database('users');
        db.save(uuid.v4(), {
            resource: "User",
            userName: newUser.userName,
            password: passHash,
            firstName: newUser.firstName,
            lastName: newUser.lastName
        }, callback);
    },
    findUser: function (userName, callback) {
        const connection = dbConnector.getConnection();
        const db = connection.database('users');

        db.view('users/findByName', {key: userName}, function (err, result) {
            callback(err, result.toArray()[0]);
        });
    },
    createToken: function (user) {
        const token = jwt.sign(user, config.secret, {
            expiresIn: config.tokenExpirationMin
        });
        return {
            token: token,
            expireIn: config.tokenExpirationMin
        };
    }
};
