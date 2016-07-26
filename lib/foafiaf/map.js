var utils = require('./utilities.js');
var models = require('../../models');
var Tags = models.Tags;
var Tag = models.Tag;
var Entity = models.Entity;
var Person = models.Person;
var Group = models.Group;
var fs = require('fs');
var path = require('path');
var jsonld = require('jsonld');


exports.foaf_map = function (id, cb) {

    var bEntity = true;
    var filter = null;


    // booleans that show or hide elements
    var showRelationships = true;
    var showProperties = false;
    var showTags = true;
    var showLocations = true;
    
    var folder = path.join(__dirname, '../../public/things/jsonld/.');
    var file = 'foaf_sample.jsonld';
    var filepath = path.join(folder, file);
    
    var edges = []
    var nodes = []
    var manifest = {} 
 
    var cursorTasks = 1                         //files.length; // This will decrement for each file then callback
    function cursorTaskComplete() {
            cursorTasks--;
            //console.log(cursorTasks)
            if (cursorTasks <= 0) {
                
                //var nodes;
                //var edges;
                var data = { 
                    'manifest': manifest,
                    'nodes' : nodes,
                    'edges' : edges,
                }
                
                //console.log('data', data)
                cb(null, data);
            }
    } // end cursorTaskComplete 
    
    
    console.log(filepath)
    // get file content of JSON-LD and convert to nodes and edges
    utils.getFileContent(filepath, function (err, fileContent) {
          if (err) {
              console.log('error', err);
              cb(err);
          }

          //console.log(fileContent)
          var objContent = JSON.parse(fileContent);
          //console.log(objContent)
           
          //Process JSONLD Content
          if (objContent != undefined) {

            /* convertJSONLDtoNodesEdges */
            utils.convertJSONLDtoNodesEdges(objContent, function (err, data) {
                if (err) {
                    console.log('error', err);
                    cb(err);
                }
                
                //console.log('data', data)
                nodes = data.nodes;
                edges = data.edges;
            }); //end convert

   
          } // end of if objContent
 
           
          //...when async operation is complete call
          cursorTaskComplete()
    }); //end getFileContent
   
    
};


function objectPropInArray(list, prop, val) {
  if (list.length > 0 ) {
    for (i in list) {
      if (list[i][prop] === val) {
        return true;
      }
    }
  }
  return false;  
}
