var PROJECTS_MAP = require('../lib/foafiaf/projects.js');

exports.projects_map = function (req, res) {
    console.log("projects_map");
    //console.log(req.params);
    var tagText = req.params.text || null;
    tagText = 'entity';
    
    //PROJECTS_MAP.projects_map(tagText, function (err, data) {
    PROJECTS_MAP.sample_projects(tagText, function (err, data) {
    //PROJECTS_MAP.combineJSONLDfiles(tagText, function (err, data) {
        if (err) {
            console.log('error', err);
            return res.send(err);
        }
        //console.log('nodes[] edges[]: ', data);
        var viewData = {
            title: ' and...',
            data: data
        };

        return res.render('projects_map', viewData);
        //return
    });
};


exports.combine_JSONLDfiles = function (req, res) {
    console.log("combine_JSONLD");
    //console.log(req.params);
    var tagText = req.params.text || null;
    tagText = 'entity';
    
    PROJECTS_MAP.combineJSONLDfiles( function (err) {
        if (err) {
            console.log('error', err);
            return res.send(err);
        }
        //console.log('nodes[] edges[]: ', data);
        // var viewData = {
        //     title: ' and...',
        //     data: data
        // };

        return res.render('filecontent');
        //return
    });
};    
    
    