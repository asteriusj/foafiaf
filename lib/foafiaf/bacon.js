var models = require('../../models');
var Tags = models.Tags;
var Tag = models.Tag;
var Entity = models.Entity;
var Person = models.Person;
var Group = models.Group;
var fs = require('fs');
var path = require('path');
var jsonld = require('jsonld');


function saveLinkedDataFile(filePath, content, format, cb) {
 var jsonld = require('jsonld');

  switch(format) {
    case 'compact':
        jsonld.compact(content, content, function(err, compacted) {
          if (err) {
                console.log('error', err);
                cb(err);
          }
          console.log('compacted', JSON.stringify(compacted, null, 2));
          content = compacted;
        });
        break;
    case 'flatten':
        jsonld.flatten(content, function(err, flattened) {
          if (err) {
                console.log('error', err);
                cb(err);
          }
          console.log('flattened', JSON.stringify(flattened))
          // all deep-level trees flattened to the top-level
          content = flattened;
        });
    case 'normalize':
        jsonld.normalize(content, { algorithm: 'URDNA2015', format: 'application/nquads' }, function(err, normalized) {
          if (err) {
                console.log('error', err);
                cb(err);
          }
          console.log('normalized', JSON.stringify(normalized))
          // normalized is a string that is a canonical representation of the document
          // that can be used for hashing, comparison, etc.
          content = normalized;
        });
        break;
    case 'toRDF':
        //jsonld.toRDF(content, {format: 'application/nquads'}, function(err, nquads) {
        jsonld.toRDF(content, '', function(err, nquads) {
          if (err) {
                console.log('error', err);
                cb(err);
          }
          console.log('nquads', JSON.stringify(nquads))
          // nquads is a string of nquads
          content = nquads;
        });
        break;
    case 'Turtle':
        
        break;
    default:
      content = jsonld;
  }
  
  //console.log('saveLinkedDataFile:', JSON.stringify(content))
  
  cb(null);
}


exports.bacon_map = function (id, cb) {

    var bEntity = true;
    var filter = null;
    
    var edges = []
    var nodes = []

    
    var folder = path.join(__dirname, '../../public/things/.');
    
    var file = 'Kevin_Bacon.jsonld';
    var filepath = path.join(folder, file);
 
 
    var cursorTasks = 1                         //files.length; // This will decrement for each file then callback
    function cursorTaskComplete() {
            cursorTasks--;
            //console.log(cursorTasks)
            if (cursorTasks <= 0) {
                
                //var nodes;
                //var edges;
                var data = { 
                    'nodes' : nodes,
                    'edges' : edges,
                }
                
                console.log('data', data)
                cb(null, data);
            }
    } // end cursorTaskComplete 
    
    
    console.log(filepath)
    // get file content of JSON-LD and convert to nodes and edges
    getFileContent(filepath, function (err, fileContent) {
          if (err) {
              console.log('error', err);
                    cb(err);
          }

          //console.log(fileContent)
          var objContent = JSON.parse(fileContent);
          //console.log(objContent)
           
          if (objContent != undefined) {

              var jsonld = objContent
              var objId = jsonld['@id'];
              console.log(objId);
              var objGraph = jsonld['@graph'];
              //console.log('objGraph', objGraph)

              for (var j = 0; j < objGraph.length; j++) {

                  var myGraph = objGraph[j];
                  var gid = myGraph['@id'];
                  //console.log('gid', gid)
                  
                  var myNode = {};
                  myNode.id = gid;
                  myNode.typeOf = 'http://dbpedia.org/resource/';
                  myNode.label = gid;
                  //myNode.title = 'http://dbpedia.org/resource/' + gid;
                  myNode.group = 'film';
                  //console.log('myNode', myNode)
                  //console.log(objectPropInArray(nodes, 'id', myNode.id))
                  if (objectPropInArray(nodes, 'id', myNode.id)) { 
                    //console.log('myNode exists', myNode.id) 
                  } else {
                    //console.log('new myNode', myNode)
                    nodes.push(myNode)
                  };
                  
                  for (var i = 0; i < myGraph.starring.length; i++) {
                    var myStarring = myGraph.starring[i];
                    //console.log('myStarring', myStarring)
                    
                    // set a node for the person
                    var myNode = {};
                    myNode.id = myStarring;
                    myNode.typeOf = 'http://dbpedia.org/resource/';
                    myNode.label = myStarring;
                    //myNode.title = 'http://dbpedia.org/resource/' + myStarring;
                    myNode.group = 'person';
                    //console.log(objectPropInArray(nodes, 'id', myNode.id))
                    if (objectPropInArray(nodes, 'id', myNode.id)) { 
                      //console.log('myNode exists', myNode.id)
                    } else {
                      //console.log('new myNode', myNode)
                      nodes.push(myNode)
                    };
                    
                    // set and edge for the relationship
                    var myEdge = {};
                    myEdge.from = gid   //id of currwent graph item
                    myEdge.to = myStarring;
                    myEdge.label = ' < starring >';
                    myNode.typeOf = 'http://dbpedia.org/property/starring';
                    //console.log('myEdge', myEdge)
                    edges.push(myEdge);
    
                  }
                        
              }
          }
 
           
          //...when async operation is complete call
          cursorTaskComplete()
    }); //end getFileContent
   
    
};





exports.files = function (archiveId, cb) {

    //var fldName = "../../public/";
    var folder = path.join(__dirname, '../../public/html/.');

    fs.readdir(folder, function (err, files) {
        if (err) {
            console.log('error', err);
            cb(err);
        }
        var twits = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            
            var twit = {
                "id": file,
                "title": file
            };
            twits[i] = twit;
        }
        //console.log(twits);
        cb(null, twits);
    });

};




function getFileContent(filePath, cb) {
    
  try {
    
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        
        if (err) {
            console.log('error', err);
            if (cb) cb(err);
		    return;
        }
        
        //console.log(data);
        if (cb) cb(null, data);
    });
    
  } catch(e) {
	  console.log(e);
  }
}


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


