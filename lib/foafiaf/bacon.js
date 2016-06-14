var models = require('../../models');
var Tags = models.Tags;
var Tag = models.Tag;
var Entity = models.Entity;
var Person = models.Person;
var Group = models.Group;
var fs = require('fs');
var path = require('path');
var jsonld = require('jsonld');



function convertCSVFile() {
  //Converter Class 
  var Converter = require("csvtojson").Converter;
  var converter = new Converter({});
  
  //read from file 
  var folder = path.join(__dirname, '../../public/js/.');
  var file = 'contacts.csv';
  var filepath = path.join(folder, file);
  require("fs").createReadStream(filepath).pipe(converter);
  
  //end_parsed will be emitted once parsing finished 
  converter.on("end_parsed", function (jsonArray) {
     //console.log('jsonArray: ', jsonArray); //here is your result jsonarray 
     
     // now convert to jsonld
     toJSONLD(jsonArray);
     
  });
 
  function toJSONLD(jsonArray) {
    
    var myJSONLD = { "@graph": [] };
    var myGraphs = [];
    
    for (var j = 0; j < jsonArray.length; j++) {
        var myRow = jsonArray[j];
        //console.log(j, myRow)
        
        var myEntity = { "@id": "", "@type": "", "label": "", "name": "", "positions": [] };
        var myPerson = { "@id": "", "@type": "", "label": "", "name": "", "title": "", "email": "" , "entity": "" };
        var myPosition =  { "@id": "", "title": "", "name": "" };
        var myPositions = [];
        
        // process entity
        var myNetworkRanking = myRow['Network Ranking'] || null; 
        myEntity['@id'] = "_entity_" + j;
        myEntity['@type'] = "ttp://dbpedia.org/ontology/city";
        myEntity['name'] = myNetworkRanking;
        
        // process contact 1
        var myContactPerson1 = myRow['Contact Person'] || null; 
        var myTitle1 = myRow['Title'] || null; 
        var myEmailAddress1 = myRow['Email Address'] || null; 
        if (myContactPerson1) {
              var myPerson1 = { "@id": "", "@type": "", "label": "", "name": "", "title": "", "email": "" , "entity": "" };
              myPerson1['@id'] = "_person_" + j + "_" + "1";
              myPerson1['@type'] = "foaf:Person";
              myPerson1['label'] = "Person: " + myContactPerson1 ;
              myPerson1['name'] = myContactPerson1;
              myPerson1['title'] = myTitle1;
              myPerson1['entity'] = myEntity['@id'];
              myPerson1['email'] = myEmailAddress1;
              //add person to graph
              //console.log('myPerson1: ', myPerson1)
              //myJSONLD['@graph'].push(myPerson1);
              myGraphs.push(myPerson1);
              
              //console.log('myGraphs: ', myGraphs.length)
              // add person to list of positions
              var myPosition1 = { "@id": "", "title": "", "name": "" };
              myPosition1['@id'] = myPerson1['@id'];
              myPosition1.title = myPerson1['title'];
              myPosition1.name = myPerson1['name'];
              //console.log('myPosition1 ',myPosition1)
              myEntity.positions.push(myPosition1);
        }
        
        // process contact 2
        var myContactPerson2 = myRow['Contact Person 2'] || null; 
        var myTitle2 = myRow['Title 2'] || null; 
        var myEmailAddress2 = myRow['Email Address 2'] || null; 
        if (myContactPerson2) {
              var myPerson2 = { "@id": "", "@type": "", "label": "", "name": "", "title": "", "email": "" , "entity": "" };
              myPerson2['@id'] = "_person_" + j + "_" + "2";
              myPerson2['@type'] = "foaf:Person";
              myPerson2['label'] = "Person: " + myContactPerson2 ;
              myPerson2['name'] = myContactPerson2;
              myPerson2['title'] = myTitle2;
              myPerson2['entity'] = myEntity['@id'];
              myPerson2['email'] = myEmailAddress2;
              //add person to graph
              //console.log('myPerson2: ', myPerson2)
              //myJSONLD['@graph'].push(myPerson2);
              myGraphs.push(myPerson2);
              
              //console.log('myGraphs: ', myGraphs.length)
              // add person to list of positions
              var myPosition2 = { "@id": "", "title": "", "name": "" };
              myPosition2['@id'] = myPerson2['@id'];
              myPosition2.title = myPerson2['title'];
              myPosition2.name = myPerson2['name'];
              //console.log('myPosition2 ',myPosition2)
              myEntity.positions.push(myPosition2);
        }
        
        
        //process contact 3
        var myContactPerson3 = myRow['Contact Person 3'] || null; 
        var myTitle3 = myRow['Title 3'] || null; 
        var myEmailAddress3 = myRow['Email Address 3'] || null; 
        if (myContactPerson3) {
              var myPerson3 = { "@id": "", "@type": "", "label": "", "name": "", "title": "", "email": "" , "entity": "" };
              myPerson3['@id'] = "_person_" + j + "_" + "3";
              myPerson3['@type'] = "foaf:Person";
              myPerson3['label'] = "Person: " + myContactPerson3 ;
              myPerson3['name'] = myContactPerson3;
              myPerson3['title'] = myTitle3;
              myPerson3['entity'] = myEntity['@id'];
              myPerson3['email'] = myEmailAddress3;
              //add person to graph
              //console.log('myPerson3: ', myPerson3)
              //myJSONLD['@graph'].push(myPerson3);
              myGraphs.push(myPerson3);
              
              // add person to list of positions
              var myPosition3 = { "@id": "", "title": "", "name": "" };
              myPosition3['@id'] = myPerson3['@id'];
              myPosition3.title = myPerson3['title'];
              myPosition3.name = myPerson3['name'];
              //console.log('myPosition3 ',myPosition3)
              myEntity.positions.push(myPosition3);
        }  
        
        
        // process contact 4
        var myContactPerson4 = myRow['Contact Person 4'] || null; 
        var myTitle4 = myRow['Title 4'] || null; 
        var myEmailAddress4 = myRow['Email Address 4'] || null; 
        if (myContactPerson4) {
              var myPerson4 = { "@id": "", "@type": "", "label": "", "name": "", "title": "", "email": "" , "entity": "" };
              myPerson4['@id'] = "_person_" + j + "_" + "4";
              myPerson4['@type'] = "foaf:Person";
              myPerson4['label'] = "Person: " + myContactPerson4 ;
              myPerson4['name'] = myContactPerson4;
              myPerson4['title'] = myTitle4;
              myPerson4['entity'] = myEntity['@id'];
              myPerson4['email'] = myEmailAddress4;
              //add person to graph
              //console.log('myPerson4: ', myPerson4)
              //myJSONLD['@graph'].push(myPerson4);
              myGraphs.push(myPerson4);
              
              // add person to list of positions
              var myPosition4 = { "@id": "", "title": "", "name": "" };
              myPosition4['@id'] = myPerson4['@id'];
              myPosition4.title = myPerson4['title'];
              myPosition4.name = myPerson4['name'];
              //console.log('myPosition4 ',myPosition4)
              myEntity.positions.push(myPosition4);
        }  
        
       
      
      myJSONLD['@graph'].push(myEntity); 
    }
    
    myJSONLD['@graph'].push(myGraphs);
    console.log('myJSONLD: ', JSON.stringify(myJSONLD));
  }

  //console.log('saveLinkedDataFile:', JSON.stringify(content))
  //cb(null);
}

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
 
 // test csv
 //
 var csv = convertCSVFile();
 
 
 
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
                
                //console.log('data', data)
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
              //console.log(objId);
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


