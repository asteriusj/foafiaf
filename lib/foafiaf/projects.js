var models = require('../../models');
var Tags = models.Tags;
var StrategyMap = models.StrategyMap
var Initiative = models.StrategyInitiative
var fs = require('fs');
var path = require('path');
var jsonld = require('jsonld');


exports.sample_projects = function (id, cb) {
//exports.foaf_map = function (id, cb) {

    var bEntity = true;
    var filter = null;
    
    var edges = []
    var nodes = []
    var manifest = {}

    // booleans that show or hide elements
    var showRelationships = true;
    var showProperties = true;
    var showTags = true;
    var showLocations = true;
    
    var folder = path.join(__dirname, '../../public/things/jsonld/.');
    //var file = 'foaf_sample.jsonld';
    //var file = 'project_sample.jsonld';
    var file = 'twits.jsonld';
    var filepath = path.join(folder, file);
 
 
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
    getFileContent(filepath, function (err, fileContent) {
          if (err) {
              console.log('error', err);
              cb(err);
          }

          //console.log(fileContent)
          var objContent = JSON.parse(fileContent);
          //console.log(objContent)
          /*
          saveLinkedDataFile('', objContent, 'toRDF', function (err) {
            if (err) {
                console.log('error', err);
                cb(err);
            }
          });
          */
          
           
          if (objContent != undefined) {

            var jsonld = objContent
            var objId = jsonld['@id'];
            //console.log(objId);
            var objGraph = jsonld['@graph'];
            //console.log('objGraph', objGraph)

            // loop across objects in @graph
            for (var j = 0; j < objGraph.length; j++) {

                var myGraph = objGraph[j];
                var graphId = myGraph['@id'];
                //console.log('graphId', graphId)
                  
                // prep nodes for main graph elements
                var addNode = false;
                var myNode = {};
                  
                // if graph element has @type then process and add nodes / edges
                if (myGraph['@type']) {

                  myNode.typeOf = myGraph['@type'];
                  //console.log('@type', myNode.typeOf)
                  switch (myNode.typeOf) {
                      case 'foaf:PersonalProfileDocument':
                         console.log("case 'foaf:PersonalProfileDocument'")
                         manifest.label = myGraph['label'] || null;
                         manifest.maker = myGraph['maker'] || null;
                         manifest.primaryTopic = myGraph['primaryTopic'] || null;
                         break;
                       case 'foaf:Person':
                         console.log("case 'foaf:Person'")
                          myNode.id = graphId;
                          myNode.label = myGraph['name'];
                          myNode.title = myGraph['@type'] + ': ' + myGraph['name'] || '';
                          myNode.name = myGraph['name'] || null;
                          myNode.group = 'person';
                          addNode = true;
                          break;
                       case 'foaf:Group':
                         console.log("case 'foaf:Group'")
                          myNode.id = graphId;
                          myNode.label = myGraph['name'];
                          myNode.title = myGraph['@type'] + ': ' + myGraph['name'] || '';
                          myNode.name = myGraph['name'] || null;
                          myNode.group = 'group';
                          addNode = true;
                          break;
                      case 'foaf:Organization':
                        console.log("case 'foaf:Organization'")
                          myNode.id = graphId;
                          myNode.label = myGraph['name'];
                          myNode.title = myGraph['@type'] + ': ' + myGraph['name'] || '';
                          myNode.name = myGraph['name'] || null;
                          myNode.group = 'organization';
                          addNode = true;
                          break;
                      case 'foaf:city':
                        console.log("case 'foaf:city'")
                        if (showLocations) {
                          myNode.id = graphId;
                          myNode.label = myGraph['name'];
                          myNode.title = myGraph['@type'] + ': ' + myGraph['name'] || '';
                          myNode.name = myGraph['name'] || null;
                          myNode.group = 'marker';
                          addNode = true;
                        }
                          break;
                      case 'foaf:state':
                        console.log("case 'foaf:state'")
                        if (showLocations) {
                          myNode.id = graphId;
                          myNode.label = myGraph['name'];
                          myNode.title = myGraph['@type'] + ': ' + myGraph['name'] || '';
                          myNode.name = myGraph['name'] || null;
                          myNode.group = 'globe';
                          addNode = true;
                        }
                          break;
                      case 'schema:Twits':
                         console.log("case 'schema:Twits'")
                          myNode.id = graphId;
                          myNode.label = "Twits";
                          myNode.group = 'documents';
                          addNode = true;
                          break;
                       case 'schema:Twit':
                         console.log("case 'schema:Twit'")
                          myNode.id = graphId;
                          myNode.label = myGraph['title'];
                          myNode.title = myGraph['@type'] + ': ' + myGraph['title'] || '';
                          myNode.name = myGraph['summary'] || null;
                          myNode.group = 'project';
                          addNode = true;
                          break;
                      case 'schema:Projects':
                         console.log("case 'schema:Projects'")
                          myNode.id = graphId;
                          myNode.label = "Projects";
                          myNode.group = 'projects';
                          addNode = true;
                          break;
                       case 'pmbok:Project':
                         console.log("case 'pmbok:Project'")
                          myNode.id = graphId;
                          myNode.label = myGraph['shortname'];
                          myNode.title = myGraph['@type'] + ': ' + myGraph['project'] || '';
                          myNode.name = myGraph['description'] || null;
                          myNode.group = 'project';
                          addNode = true;
                          break;
                       case 'foaf:topic':
                          console.log("case 'foaf:topic'")
                        if (showTags) {
                          myNode.id = graphId;
                          myNode.label = myGraph['label'] || '';
                          myNode.name = myGraph['name'] || '';
                          myNode.group = 'tags';
                          addNode = true;
                        }
                          break;
                       case 'sioc:topic':
                          console.log("case 'sioc:topic'")
                        if (showTags) {
                          myNode.id = graphId;
                          myNode.label = myGraph['label'] || '';
                          myNode.name = myGraph['name'] || '';
                          myNode.group = 'tag';
                          addNode = true;
                        }
                          break;
                       case 'movie:film':
                          console.log("case 'movie:film'")
                          myNode.id = graphId;
                          myNode.name = myGraph['name'] || '';
                          myNode.title = myGraph['title'] || '';
                          myNode.label = myGraph['label'] || '';
                          myNode.group = 'film';
                          addNode = true;
                          break;
                       case '':
                          console.log('case: ')
                          myNode.id = graphId;
                          myNode.type = myGraph['@type'] || '';
                          if (myNode.type.length > 0) {
                              myNode.type = myNode.type[0] + ' more...';
                          }
                          myNode.name = myGraph['name'] || null;
                          if (myNode.name.length > 0) {
                              myNode.name = myNode.name[0] + ' more...';
                          }
                          myNode.label = myGraph['label'] || null;
                          if (myNode.label.length > 0) {
                              myNode.label = myNode.label[0] + ' more...';
                          }
                          myNode.title = myGraph['title'] || null;
                          if (myNode.title.length > 0) {
                              myNode.title = myNode.title[0] + ' more...';
                          }
                          addNode = true;
                        default:
                          console.log('default case')
                          addNode = false;
                  } // end switch
                  
                } // if myGraph has @type


                // if node with appropriate @type was found
                // then boolean true so process and push node in nodes and add edges
                if (addNode) {
                    console.log('addNode', addNode)
                    //console.log('myNode', myNode)
                    
                    if (objectPropInArray(nodes, 'id', myNode.id)) { 
                      console.log('myNode exists', myNode.id) 
                    } else {
                      //console.log('new myNode', myNode)
                      nodes.push(myNode)
                    };

                    // check for properties and collections to process
                    if (showProperties) {
                      // // if key 'name' exists
                      // // if key 'title' exists
                      // // if key 'motto' exists
                      // // if key 'label' exists
                      // // if key 'enddate' exists
                      // // if key 'status' exists
                      // // if key 'language' exists
                      // // if key 'birthDate' exists
                      // // if key 'birthYear' exists
                      // // if key 'depiction' exists
                      // // if key 'homepage' exists
                      // // if key 'workplaceHomepage' exists
                      // // if key 'family_name' exists
                      // // if key 'givenname' exists
                      // // if key 'nick' exists
                      // // if key 'phone' exists
                      // // if key 'email' exists
                      // // if key 'mbox_sha1sum' exists
                      // // if key 'state' exists
                      // // if key 'region' exists
                      // // if key 'geometry' exists
                      // // if key 'geo:lat' exists
                      // var key = 'geo:lat';
                      // // if key 'geo:long' exists
                      // var key = 'geo:long';
                      for (var key in myGraph) {
                        if (myGraph.hasOwnProperty(key)) {
                        
                          //console.log(key);
                          //if (myGraph[key]) {
                          var myNode = {};
                          //myNode.id = graphId + '_' + myGraph[key];
                          myNode.id = '_' + myGraph[key];
                          myNode.typeOf = 'http://schema.org/' + key;
                          myNode.title = key + ': ' + myGraph[key];
                          myNode.label = myGraph[key];
                          myNode.group = 'property';
                          if (objectPropInArray(nodes, 'id', myNode.id)) { 
                              //console.log('myNode exists', myNode.id) 
                          } else {
                              nodes.push(myNode)
                          };
                          var myEdge = {};
                          myEdge.from = graphId   //id of current graph item
                          myEdge.to = myNode.id;
                          myEdge.arrows = { to : true };
                          myEdge.label = key;
                          edges.push(myEdge);
                        
                        } // end hasOwnProperty 
                      } // end for key
                    } // end if show Properties  
                    
                    
                    if (showRelationships) {
                      // // Edges
                      // // process collections of nodes to make edges to
                      //   // // if key 'knows' exists loop over items    
                      //   // // if key 'member' exists loop over items
                      //   // // if key 'interest' exists loop over items
                      //   // // if key 'skill' exists loop over items
                      //   // // if key 'employedBy' exists loop over items
                      //   // // if key 'employerOf' exists loop over items
                      //   // // if key 'owner' exists loop over items
                      //   // // if key 'stakeholder' exists loop over items
                      //   // // if key 'container_of' exists loop over items
                      //   // // if key 'has_container' exists loop over items
                      //   // // if key 'based_near' exists loop over items
                      //   // // if key 'birthPlace' exists loop over items
                      console.log('myGraph', myGraph)
                      for (var key in myGraph) {

                        var myElement = myGraph[key];
                        //console.log('myElement', myElement)
 
                        if (myElement instanceof Array) {
                          console.log('isArray is true')

                          for (var idx in myElement) {
                          
                            var myProp = myElement[idx];
                            //console.log('myProp', myProp)
                            var myEdge = {};
                            myEdge.from = graphId   //id of current graph item
                            myEdge.to = myProp;
                            myEdge.arrows = { to : true };
                            myEdge.label = ' < ' + key +' >';
                            edges.push(myEdge);
                            
                          } // end for idx
                        
                        } // end if array
                        
                      } // end for 
                      
                    } // end if show Relationships
 
                } // end if addNode
                  
            } // end for objGraph.length
              
          } // end of if objContent
 
           
          //...when async operation is complete call
          cursorTaskComplete()
    }); //end getFileContent
   
    
};


exports.projects_map = function (id, cb) {

    // var bEntity = true;
    // var filter = null;
    
    var edges = []
    var nodes = []

    var folder = path.join(__dirname, '../../public/things/csv/.');
    var file = 'ExportInitiatives.csv';
    var filepath = path.join(folder, file);

 
    // when cursor rows / step task or function is done, comple processing
    var cursorTasks = 1                         // This will decrement for each item then callback
    function cursorTaskComplete() {
            cursorTasks--;
            console.log(cursorTasks)
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
    convertCSVFile(filepath, function (err, content) {
          if (err) {
              console.log('error', err);
              cb(err);
          }
          console.log(content)
          var objContent = JSON.parse(content);
          //console.log('objContent', objContent)
           
          if (objContent != undefined) {

            //var jsonld = objContent
            //var objId = jsonld['@id'];
               //console.log(objId);
            //var objGraph = jsonld['@graph'];
            //console.log('objGraph', objGraph)

            for (var j = 0; j < objContent.length; j++) {

                var myObj = objContent[j];
                
                //http://pszwed.ia.agh.edu.pl/ontologies/pmbok-event.owl#pmbok.Project
                //http://pszwed.ia.agh.edu.pl/ontologies/event.owl#starts
                //http://pszwed.ia.agh.edu.pl/ontologies/event.owl#finishes
                //http://pszwed.ia.agh.edu.pl/ontologies/event.owl#hasParticipant
                //http://pszwed.ia.agh.edu.pl/ontologies/pmbok-role.owl#pmbok.ProjectManager
                //http://pszwed.ia.agh.edu.pl/ontologies/pmbok-role.owl#Role
                //http://pszwed.ia.agh.edu.pl/ontologies/pmbok4.owl#pmbok.Deliverables
                //http://pszwed.ia.agh.edu.pl/ontologies/pmbok-ref.owl#pmbok.ProjectDeliverables
                //http://pszwed.ia.agh.edu.pl/ontologies/pmbok4.owl#pmbok.ProjectDocuments
                //http://pszwed.ia.agh.edu.pl/ontologies/pmbok-ref.owl#pmbok.ProjectStatus
                
                //hasDescription
                //hasValue
                
                //http://crschmidt.net/semweb/doapamatic/
                // <Project xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns="http://usefulinc.com/ns/doap#" xmlns:foaf="http://xmlns.com/foaf/0.1/" xmlns:admin="http://webns.net/mvcb/">
                // <name>Blue Zone Community Project</name>
                // <shortname>Blue Zones</shortname>
                // <shortdesc>Establish region as a Blue Zone</shortdesc>
                // <description>Community project to establish region as a Blue Zone</description>
                // <homepage rdf:resource="https://www.bluezones.com/"/>
                // <head/>
                // </Project>
                
                // http://ontology.it/itsmo/v1/itsmo.html#Project
                // <owl:Class rdf:ID="Project">
                // <rdfs:comment xml:lang="en">A temporary organization, with people and other assets, that is required to achieve anobjective or other outcome. Each project has a lifecycle that typically includes initiation,planning, execution, and closure. Projects are usually managed using a formalmethodology such as PRojects IN Controlled Environments (PRINCE2) or the ProjectManagement Body of Knowledge (PMBOK).</rdfs:comment>
                // <dcterms:conformsTo rdf:resource="http://www.itil-officialsite.com/InternationalActivities/ITILGlossaries_2.aspx#English_2011_Glossary"/>
                // <rdfs:label rdf:datatype="http://www.w3.org/2001/XMLSchema#string">Project</rdfs:label>
                // <rdfs:subClassOf>
                // <owl:Class rdf:about="#RunnableResource"/>
                // </rdfs:subClassOf>
                // <rdfs:subClassOf>
                // <owl:Restriction>
                // <owl:minCardinality rdf:datatype="http://www.w3.org/2001/XMLSchema#int">1</owl:minCardinality>
                // <owl:onProperty>
                // <owl:ObjectProperty rdf:ID="hasProjectOwner"/>
                // </owl:onProperty>
                // </owl:Restriction>
                // </rdfs:subClassOf>
                // </owl:Class>
                
                //http://ontology.it/itsmo/v1#hasDeliverable
                //http://ontology.it/itsmo/v1#requires
                //http://ontology.it/itsmo/v1#uses
                //http://ontology.it/itsmo/v1#strongDependency
                //http://ontology.it/itsmo/v1#weakDependency



                
                //http://ontology.it/itsmo/v1/itsmo.html#term_Policy
                
                
                //var gid = myGraph['@id'];
                //console.log('gid', gid)
 
                  var myNode = {};
                  myNode.id = myObj.Name;
                  myNode.typeOf = 'http://xmlns.com/foaf/spec/#term_Project';
                  myNode.label = 'Project';
                  myNode.title = myObj.name;
                  myNode.group = 'project';
                  //console.log('myNode', myNode)
                  //console.log(objectPropInArray(nodes, 'id', myNode.id))
                  // if (objectPropInArray(nodes, 'id', myNode.id)) { 
                  //   //console.log('myNode exists', myNode.id) 
                  // } else {
                  //   //console.log('new myNode', myNode)
                  //   nodes.push(myNode)
                  // };
                  nodes.push(myNode)
                  
          //         for (var i = 0; i < myGraph.starring.length; i++) {
          //           var myStarring = myGraph.starring[i];
          //           //console.log('myStarring', myStarring)
                    
          //           // set a node for the person
          //           var myNode = {};
          //           myNode.id = myStarring;
          //           myNode.typeOf = 'http://dbpedia.org/resource/';
          //           myNode.label = myStarring;
          //           //myNode.title = 'http://dbpedia.org/resource/' + myStarring;
          //           myNode.group = 'person';
          //           //console.log(objectPropInArray(nodes, 'id', myNode.id))
          //           if (objectPropInArray(nodes, 'id', myNode.id)) { 
          //             //console.log('myNode exists', myNode.id)
          //           } else {
          //             //console.log('new myNode', myNode)
          //             nodes.push(myNode)
          //           };
                    
          //           // set and edge for the relationship
          //           var myEdge = {};
          //           myEdge.from = gid   //id of currwent graph item
          //           myEdge.to = myStarring;
          //           myEdge.label = ' < starring >';
          //           myNode.typeOf = 'http://dbpedia.org/property/starring';
          //           //console.log('myEdge', myEdge)
          //           edges.push(myEdge);
    
          //         }
                        
              }
          }
 
           
          //...when async operation is complete call
          cursorTaskComplete()
    }); //end getFileContent
   
    

    
};


function saveLinkedDataFile(filePath, content, format, cb) {
    var jsonld = require('jsonld');
    
    var folder = path.join(__dirname, '../../public/things/jsonld/.');
    var file = 'LinkedDataFile.jsonld';
    var filepath = path.join(folder, file);
    
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
  
  console.log('filepath:', filepath)
  //putFileContent(filepath, JSON.stringify(content))
  //console.log('saveLinkedDataFile:', JSON.stringify(content))
  
  cb(null);
}

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

function putFileContent(content, filePath, cb) {
    
  try {
    
    fs.writeFile(filePath, content, {encoding: 'utf-8'}, function(err,data){
        
        if (err) {
            console.log('error', err);
            if (cb) cb(err);
		    return;
        }
        
        //console.log('putFileContent', filePath + ' <- ' + data);
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