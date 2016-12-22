const express = require("express");
const config = require("../configuration/configuration");
const authService = require("../services/authService");
const cors = require('cors');
const user = require('./user');
const projects = require('./projects');
const blog = require('./blog');


exports.registerRoutes = function (api) {
    var corsHandler = cors({
        origin: config.websiteUrl,
        optionsSuccessStatus: 200
    });
    var authorizeHandler = function (req, res, next) {
        authService.authorize(req.headers['x-access-token'])
            .then(function () {
                req.decoded = decoded;
                next();
            })
            .catch(function (err) {
                return res.status(403).send({
                    message: 'Unauthorized',
                    details: err || "Missing token"
                });
            });
    };

    api.all("/blog*", authorizeHandler);
    api.post('/user/register', user.register);
    api.post('/user/auth', user.auth);
    api.get('/blog', corsHandler, blog.index);
    api.get('/project', corsHandler, projects.index);
};