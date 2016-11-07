const express = require('express');
const cradle = require('cradle');
const jwt = require("jsonwebtoken");
const config = require("../configuration/configuration");
const userService = require('../services/userService');

function _registerRoute(router) {
    router.post('/user/register', function (req, res) {
        const newUser = {
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        };
        userService.registerUser(newUser, function (err, result) {
            if (err) {
                res.status(500).send({error: err});
            } else {
                res.status(200).send("User created!");
            }
        });
    });

    router.post('/user/auth', function (req, res) {
        userService.findUser(req.body.userName, function (err, user) {
            if (err) {
                res.status(403).send({error: err});
            } else {
                const tokenInfo = userService.createToken(user);
                res.json(tokenInfo);
            }
        });
    });

    //Token validator interceptor
    /*router.use(function (req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.status(403).send({
                        message: 'Unauthorized'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            return res.status(403).send({
                message: 'Unauthorized'
            });

        }
    });*/
}

module.exports = _registerRoute;