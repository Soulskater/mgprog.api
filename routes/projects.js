const projectService = require('../services/projectService');

exports.index = function (req, res, next) {
    var promise = projectService.getProjects();
    promise.then(function (projects) {
        res.json(projects);
    }).catch(function (err) {
        res.json(err);
    });
};
