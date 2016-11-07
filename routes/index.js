const express = require('express');
const router = express.Router();
const cors = require('cors');

const registerUserRoute = require('./user');
const registerProjectsRoute = require('./projects');
const registerBlogRoute = require('./blog');

registerUserRoute(router);
registerProjectsRoute(router);
registerBlogRoute(router);

module.exports = router;
