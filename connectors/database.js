const cradle = require("cradle");
const config = require("../configuration/configuration");

module.exports = {
    getConnection: function () {
        return new cradle.Connection(config.db.address, config.db.port, {
            cache: true,
            auth: config.connections.dbReader.auth
        });
    }
};
