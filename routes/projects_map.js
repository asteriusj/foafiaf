var PROJECTS_MAP = require('../lib/foafiaf/projects.js');

exports.projects_map = function (req, res) {
    console.log("projects_map");
    //console.log(req.params);
    var tagText = req.params.text || null;
    tagText = 'entity';
    
    // PROJECTS_MAP.projects_map(tagText, function (err, data) {
    PROJECTS_MAP.sample_projects(tagText, function (err, data) {
        if (err) {
            console.log('error', err);
            return res.send(err);
        }
        //console.log('nodes[] edges[]: ', data);
        var viewData = {
            title: 'Projects / Initiatives and...',
            data: data
        };

        return res.render('projects_map', viewData);
        //return
    });
};