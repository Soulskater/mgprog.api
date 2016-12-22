const jwt = require("jsonwebtoken");
const config = require("../configuration/configuration");

exports.authorize = function (token) {
    return new Promise(function (resolve, reject) {
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        } else {
            reject();
        }
    });
};
