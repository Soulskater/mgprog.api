const userService = require('../services/userService');

exports.register = function (req, res) {
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
};

exports.auth = function (req, res) {
    userService.findUser(req.body.userName, function (err, user) {
        if (err) {
            res.status(403).send(err);
        } else {
            const tokenInfo = userService.createToken(user);
            res.json(tokenInfo);
        }
    });
};