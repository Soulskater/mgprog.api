const dbConnector = require('../connectors/database');

exports.getProjects = function () {
    return new Promise(function (resolve, reject) {
        var connection = dbConnector.getConnection();
        var db = connection.database('projects');

        db.view('projects/all', function (err, result) {
            if (err) {
                reject({error: err});
            } else {
                resolve(result.toArray());
            }
        });
    });
};
