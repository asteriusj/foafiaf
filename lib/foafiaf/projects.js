var utils = require('./utilities.js');
var models = require('../../models');
var Tags = models.Tags;
var StrategyMap = models.StrategyMap
var Initiative = models.StrategyInitiative
var fs = require('fs');
var path = require('path');
var jsonld = require('jsonld');
var projects_map= require('./projects.js');


exports.combineJSONLDfiles = function () {
    console.log('combineJSONLDfiles')
    var cb = null;
    
    var folder = path.join(__dirname, '../../public/things/jsonld');
    var outfile = 'combinedOutfile.jsonld';
    var outfilepath = path.join(folder, outfile);
    
    var file1 = 'Persons.jsonld';
    var filepath1 = path.join(folder, file1);
    
    var file11 = 'Persons-SteeringCommitte.jsonld';
    var filepath11 = path.join(folder, file11);
    
    var file2 = 'Organizations.jsonld';
    var filepath2 = path.join(folder, file2);
    
    //var file21 = 'Organizations-Business.jsonld';
    //var filepath21 = path.join(folder, file21);
        
    var file22 = 'Organizations-Government.jsonld';
    var filepath22 = path.join(folder, file22);
        
    var file23 = 'Organizations-NonProfits.jsonld';
    var filepath23 = path.join(folder, file23);
        
    var file24 = 'Organizations-Faith.jsonld';
    var filepath24 = path.join(folder, file24);
    
    var file25 = 'Organizations-Roles.jsonld';
    var filepath25 = path.join(folder, file25);
    
    var file3 = 'Topics_Interests.jsonld';
    var filepath3 = path.join(folder, file3);
    
    var file4 = 'Topics_Values.jsonld';
    var filepath4 = path.join(folder, file4);
    
    var file5 = 'Topics_Segments.jsonld';
    var filepath5 = path.join(folder, file5);
    
    var file6 = 'Topics_Skills.jsonld';
    var filepath6 = path.join(folder, file6);
    
    var file7 = 'Topics_Sectors.jsonld';
    var filepath7 = path.join(folder, file7);
    
    var file8 = 'Places.jsonld';
    var filepath8 = path.join(folder, file8);
    
    var files = [];
    files.push(filepath1);
    files.push(filepath11);
    files.push(filepath2);
    //files.push(filepath21);
    files.push(filepath22);
    files.push(filepath23);
    files.push(filepath24);
    files.push(filepath25);
    files.push(filepath3);
    files.push(filepath4);
    files.push(filepath5);
    files.push(filepath6);
    files.push(filepath7);
    files.push(filepath8);

    var contentArray = [];
    
    var cursorTasks = files.length                         //files.length; // This will decrement for each file then callback
    function cursorTaskComplete() {
            cursorTasks--;
            //console.log(cursorTasks)
            if (cursorTasks <= 0) {
                
                var data = null;
                
                utils.combineDatasets(contentArray, function (err, data) {
                  if (err) {
                      console.log('error', err);
                      cb(err);
                  }
                  //console.log('data', data)
                  console.log('outfilepath:', outfilepath)
                  utils.putFileContent(JSON.stringify(data), outfilepath, function (err) {
                      if (err) {
                          console.log('error', err);
                          cb(err);
                      }
                  });
                  
                  if (cb) cb(null, data);
                })

                
            }
    } // end cursorTaskComplete 
    
    
    function doGetFiles(cb) {
        
        for (index = 0; index < files.length; ++index) {
            console.log(files[index]);
            utils.getFileContent(files[index], function (err, fileContent) {
                  if (err) {
                      console.log('error', err);
                      cb(err);
                  }
                  //console.log('fileContent', fileContent)
                  var objContent = JSON.parse(fileContent);
          
                  contentArray.push(objContent);
                  
                  //console.log('contentArray.length ', contentArray.length)
                  //...when async operation is complete call
                  cursorTaskComplete()
            }); //end getFileContent

        }; //end for loop
        
    }; 
    
    //call do stuff
    doGetFiles(cb)
    //if (cb) cb(null);
};

exports.sample_projects = function (id, cb) {

    var bEntity = true;
    var filter = null;
    
    var edges = []
    var nodes = []
    var manifest = {}

    //projects_map.combineJSONLDfiles(null, null);
    
    var folder = path.join(__dirname, '../../public/things/jsonld/.');
    //var file = 'foaf_sample.jsonld';
    //var file = 'project_sample.jsonld';
    //var file = 'strategy_sample.jsonld';
    var file = 'combinedOutfile.jsonld';
    var filepath = path.join(folder, file);
    var graphFile = 'nodesandedges.json';
    var graphFilepath = path.join(folder, graphFile);
 
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

          //console.log('fileContent', fileContent)
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
    utils.convertCSV2JSONLD(filepath, function (err, objContent) {
        if (err) {
              console.log('error', err);
              cb(err);
        }
        //console.log('objContent', objContent)
           
           
        if (objContent != undefined) {

            var file = 'generated.jsonld';
            var filePath = path.join(folder, file);
            var content = JSON.stringify(objContent);
            utils.putFileContent(content, filePath, function (err) {
                if (err) {
                    console.log('error', err);
                    cb(err);
                }
            });
             
            // saveLinkedDataFile('', objContent, 'toRDF', function (err) {
            //     if (err) {
            //         console.log('error', err);
            //         cb(err);
            //     }
            // });
            
            /* convertJSONLDtoNodesEdges */
            utils.convertJSONLDtoNodesEdges(objContent, function (err, data) {
                if (err) {
                    console.log('error', err);
                    cb(err);
                }
                
                //console.log(data)
                nodes = data.nodes;
                edges = data.edges;
            }); //end convert

        } // end of if objContent
                
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



 
           
          //...when async operation is complete call
          cursorTaskComplete()
    }); //end getFileContent
   
    

    
};





// function putFileContent(content, filePath, cb) {
    
//   try {
    
//     fs.writeFile(filePath, content, {encoding: 'utf-8'}, function(err,data){
        
//         if (err) {
//             console.log('error', err);
//             if (cb) cb(err);
// 		    return;
//         }
        
//         //console.log('putFileContent', filePath + ' <- ' + data);
//         if (cb) cb(null, data);
//     });
    
//   } catch(e) {
// 	  console.log(e);
//   }
// }


// function objectPropInArray(list, prop, val) {
//   if (list.length > 0 ) {
//     for (i in list) {
//       if (list[i][prop] === val) {
//         return true;
//       }
//     }
//   }
//   return false;  
// }