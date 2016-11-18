var utils = require('./utilities.js');
var models = require('../../models');
var Tags = models.Tags;
var StrategyMap = models.StrategyMap
var Initiative = models.StrategyInitiative
var fs = require('fs');
var path = require('path');
var jsonld = require('jsonld');

exports.sample_megraph = function (id, cb) {
    console.log('sample_megraph')
    var bEntity = true;
    var filter = null;
    
    var edges = [];
    var nodes = [];
    var manifest = { graphName: '', defaultNode: null };

    try {
    
        var folder = path.join(__dirname, '../../public/things/jsonld/.');
        //var file = 'JeffreyAStewart.jsonld';
        //var file = 'jas.jsonld';
        var file = 'meGraph.jsonld';
        
        var filepath = path.join(folder, file);
        var graphFile = 'meGraph.json';
        var graphFilepath = path.join(folder, graphFile);
        var graphName = 'meGraph';
     
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
                    
                    utils.putFileContent(JSON.stringify(data), graphFilepath, function (err, fileContent) {
                      if (err) {
                          console.log('error', err);
                          cb(err);
                      }
                    });
                    //use file specified here for name of graph
                    data.manifest.graphName = graphName;
                    //console.log('data', data.manifest)
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
    
              //console.log('fileContent', fileContent)
              var objContent = JSON.parse(fileContent);
              //console.log(objContent)
    
              
              //Process JSONLD Content
              if (objContent != undefined) {
    
                /* convertJSONLDtoNodesEdges */
                utils.buildNodesEdges(objContent, function (err, data) {
                    if (err) {
                        console.log('error', err);
                        cb(err);
                    }
                    
                    //console.log('data', data)
                    manifest = data.manifest || manifest;
                    nodes = data.nodes || nodes;
                    edges = data.edges || edges;
                }); //end convert
    
       
              } // end of if objContent
     
               
              //...when async operation is complete call
              cursorTaskComplete()
        }); //end getFileContent
           
    } 
    catch(e) {
       //Will never get caught
       cb(null) 
    }
};