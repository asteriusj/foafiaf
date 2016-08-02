var FOAFIAF_MapRoutes = require('./foafiaf_map')
var BACON_MapRoutes = require('./bacon_map')
var PROJECTS_MapRoutes = require('./projects_map')

/** Homepage *///
exports.index = function(req, res) {
  var viewData = {
    title: 'FOAFIAF',
    description: 'Friend Of A Friend Is A Friend - A community network mapping capability leveraging RDF Datasets for Social Graph visualization and analysis '
   //authenticated: req.session.oauth_access_token ? true : false
  };
  res.render('index', viewData);
};

// foafiaf_map maps to  
exports.foafiaf_map=  FOAFIAF_MapRoutes.foafiaf_map;

exports.bacon_map=  BACON_MapRoutes.bacon_map;

exports.projects_map=  PROJECTS_MapRoutes.projects_map;

exports.combine_JSONLDfiles=  PROJECTS_MapRoutes.combine_JSONLDfiles;
