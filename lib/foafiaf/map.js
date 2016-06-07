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

exports.foaf_sample = function (id, cb) {

    var hashTags = {};

    var bEntity = true;
    var filter = null;

    var folder = path.join(__dirname, '../../public/js/.');

    var nodes = {};
    var edges = {};
    var data = { 
        'nodes' : nodes,
        'edges' : edges,
    }
                
    data = 
    
{nodes:[{id:'#90',typeOf:'entity',label:'Illinois',title:' [#90] subject: < Illinois > predicate: <  typeOf  > object: < Region> ',group:'globe'},{id:'#92',typeOf:'entity',label:'Byron, IL',title:' [#92] subject: < Byron, IL > predicate: <  typeOf  > object: < Locale> ',group:'marker'},{id:'#93',typeOf:'entity',label:'Rockford, IL',title:' [#93] subject: < Rockford, IL > predicate: <  typeOf  > object: < Locale> ',group:'marker'},{id:'#94',typeOf:'entity',label:'Loves Park',title:' [#94] subject: < Loves Park > predicate: <  typeOf  > object: < Locale> ',group:'marker'},{id:'#488',typeOf:'foaf:group',label:'Transform Rockford',title:' [#488] subject: < Transform Rockford> predicate: <  typeOf  > object: < Group > ',group:'group'},{id:'#88',typeOf:'foaf:org',label:'Asterius Media LLC',title:' [#88] subject: < Asterius Media LLC> predicate: <  typeOf  > object: < Company > ',group:'company'},{id:'#87',typeOf:'foaf:org',label:'Danfoss',title:' [#88] subject: < Danfoss > predicate: <  typeOf  > object: < Company > ',group:'company'},{id:'#495',typeOf:'article',label:'Article ',title:' [#495] subject: < An introduction to Wardley (Value Chain) Mapping > predicate: <  is a  > object: < Article > ',group:'book'},{id:'#770',typeOf:'http://xmlns.com/foaf/0.1/primaryTopic',label:'Topics',title:'',group:'tags'},{id:'#777',typeOf:'http://xmlns.com/foaf/0.1/primaryTopic',label:'IT Management',title:'',group:'tag'},{id:'#778',typeOf:'http://xmlns.com/foaf/0.1/primaryTopic',label:'Software Development',title:'',group:'tag'},{id:'#779',typeOf:'http://xmlns.com/foaf/0.1/primaryTopic',label:'Cloud Computing',title:'',group:'tag'},{id:'#me',typeOf:'foaf:Person',label:'Jeffrey Stewart',title:' [#me] subject: < Jeffrey Stewart  > predicate: < typeOf > object: < Person > ',group:'person'},{id:'#490',typeOf:'foaf:Person',label:'Debra Stewart',title:' [#489] subject: < Debra Stewart  > predicate: < typeOf > object: < Person > ',group:'person'},{id:'#491',typeOf:'foaf:Person',label:'Mike Schablaske',title:' [#489] subject: < Mike Schablaske  > predicate: <  typeOf  > object: < Person > ',group:'person'},{id:'#492',typeOf:'foaf:Person',label:'Jake Wilson',title:' [#489] subject: < Jake Wilson  > predicate: < typeOf > object: < Person > ',group:'person'},{id:'#493',typeOf:'foaf:Person',label:'Dannette Holifield',title:' [#493] subject: < Dannette Holifield > predicate: < typeOf > object: < Person > ',group:'person'},],edges:[{from:'#777',to:'#770',label:''},{from:'#778',to:'#770',label:''},{from:'#779',to:'#770',label:''},{from:'#92',to:'#90',label:'< part of >'},{from:'#93',to:'#90',label:'< part of >'},{from:'#94',to:'#90',label:'< part of >'},{from:'#488',to:'#me',label:'< participant >'},{from:'#488',to:'#493',label:'< participant >'},{from:'#88',to:'#92',label:'< location >'},{from:'#me',to:'#92',label:'< lives in >'},{from:'#me',to:'#495',label:'< author of >'},{from:'#me',to:'#88',label:'< employed by >'},{from:'#me',to:'#490',label:'< spouse of>'},{from:'#490',to:'#92',label:'< lives in >'},{from:'#me',to:'#777',typeOf:'http://www.w3.org/2006/vcard/ns#skill',label:'< has skill >'},{from:'#me',to:'#778',typeOf:'http://www.w3.org/2006/vcard/ns#skill',label:'< has skill >'},{from:'#me',to:'#779',label:'< has skill >',typeOf:'http://www.w3.org/2006/vcard/ns#skill',},{from:'#me',to:'#492',label:'<knows>'},{from:'#me',to:'#491',label:'<knows>'},{from:'#493',to:'#me',label:'< Colleague Of >'},{from:'#493',to:'#93',label:'< lives in >'},{from:'#493',to:'#777',label:'< has skill >'},{from:'#me',to:'#493',label:'< Colleague Of >'},{from:'#491',to:'#488',label:'<employedby>'},{from:'#491',to:'#93',label:'< lives in >'},{from:'#492',to:'#488',label:'<employedby>'},{from:'#488',to:'#93',label:'< location >'},{from:'#492',to:'#491',label:'< work with >'},{from:'#491',to:'#492',label:'< employer of >'},{from:'#491',to:'#492',label:'< work with >'},{from:'#493',to:'#492',label:'< knows >'},{from:'#493',to:'#491',label:'< knows >'},{from:'#493',to:'#87',label:'< employed by >'},{from:'#87',to:'#94',label:'< location >'},]}
    
    console.log(data)
    cb(null, data);
};


exports.foaf_map = function (id, cb) {

    var bEntity = true;
    var filter = null;
    
    var edges = []
    var nodes = []
    var manifest = {}

    // booleans that show or hide elements
    var showProperties = true;
    var showTags = true;
    var showLocations = true;
    
    var folder = path.join(__dirname, '../../public/js/.');
    var file = 'person1.jsonld';
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
              console.log(objId);
              var objGraph = jsonld['@graph'];
              //console.log('objGraph', objGraph)

              for (var j = 0; j < objGraph.length; j++) {

                  var myGraph = objGraph[j];
                  var graphId = myGraph['@id'];
                  //console.log('graphId', graphId)
                  
                  // prep nodes for main graph elements
                  var addNode = false;
                  var myNode = {};
                  
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
                  } // if @type


                  // if node with appropriate @type was found
                  // then
                  if (addNode) {
                    console.log('addNode', addNode)
                    //console.log('myNode', myNode)
                    
                    if (objectPropInArray(nodes, 'id', myNode.id)) { 
                      //console.log('myNode exists', myNode.id) 
                    } else {
                      //console.log('new myNode', myNode)
                      nodes.push(myNode)
                    };
                    
                    
                  // check for properties and collections to process
                  //
                  if (showProperties) {
                    
                    // if key 'name' exists
                    var key = 'name';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://xmlns.com/foaf/0.1/' + key;
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
                      edges.push(myEdge);
                    }
                    // if key 'title' exists
                    var key = 'title';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://purl.org/dc/terms/title';
                      myNode.title = key + ': ' + myGraph[key];
                      myNode.label = myGraph[key];
                      myNode.group = 'property';
                      if (!(objectPropInArray(nodes, 'id', myNode.id))) { nodes.push(myNode) };
                      var myEdge = {};
                      myEdge.from = graphId   //id of current graph item
                      myEdge.to = myNode.id;
                      edges.push(myEdge);
                    }
                    // if key 'motto' exists
                    var key = 'motto';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://dbpedia.org/property/' + key;
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
                      edges.push(myEdge);
                    }
                    // if key 'label' exists
                    var key = 'label';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://dbpedia.org/property/' + key;
                      myNode.title = key + ': ' + myGraph[key];
                      myNode.label = myGraph[key];
                      myNode.group = 'property';
                      if (!(objectPropInArray(nodes, 'id', myNode.id))) { nodes.push(myNode) };
                      var myEdge = {};
                      myEdge.from = graphId   //id of current graph item
                      myEdge.to = myNode.id;
                      edges.push(myEdge);
                    }
                    // if key 'date' exists
                    var key = 'date';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://purl.org/dc/terms/' + key;
                      myNode.title = key + ': ' + myGraph[key];
                      myNode.label = myGraph[key];
                      myNode.group = 'property';
                      if (!(objectPropInArray(nodes, 'id', myNode.id))) { nodes.push(myNode) };
                      var myEdge = {};
                      myEdge.from = graphId   //id of current graph item
                      myEdge.to = myNode.id;
                      edges.push(myEdge);
                    }
                    // if key 'language' exists
                    var key = 'language';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://purl.org/dc/terms/' + key;
                      myNode.title = key + ': ' + myGraph[key];
                      myNode.label = myGraph[key];
                      myNode.group = 'property';
                      if (!(objectPropInArray(nodes, 'id', myNode.id))) { nodes.push(myNode) };
                      var myEdge = {};
                      myEdge.from = graphId   //id of current graph item
                      myEdge.to = myNode.id;
                      edges.push(myEdge);
                    }
                    // if key 'birthDate' exists
                    var key = 'birthDate';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://dbpedia.org/property/' + key;
                      myNode.title = key + ': ' + myGraph[key];
                      myNode.label = myGraph[key];
                      myNode.group = 'property';
                      if (!(objectPropInArray(nodes, 'id', myNode.id))) { nodes.push(myNode) };
                      var myEdge = {};
                      myEdge.from = graphId   //id of current graph item
                      myEdge.to = myNode.id;
                      edges.push(myEdge);
                    }
                    // if key 'birthYear' exists
                    var key = 'birthYear';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://dbpedia.org/ontology/' + key;
                      myNode.title = key + ': ' + myGraph[key];
                      myNode.label = myGraph[key];
                      myNode.group = 'property';
                      if (!(objectPropInArray(nodes, 'id', myNode.id))) { nodes.push(myNode) };
                      var myEdge = {};
                      myEdge.from = graphId   //id of current graph item
                      myEdge.to = myNode.id;
                      edges.push(myEdge);
                    }
                    
                    // if key 'depiction' exists
                    var key = 'depiction';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://dbpedia.org/ontology/' + key;
                      myNode.title = key + ': ' + myGraph[key];
                      myNode.label = myGraph[key];
                      myNode.group = 'property';
                      if (!(objectPropInArray(nodes, 'id', myNode.id))) { nodes.push(myNode) };
                      var myEdge = {};
                      myEdge.from = graphId   //id of current graph item
                      myEdge.to = myNode.id;
                      edges.push(myEdge);
                    }
                    // if key 'homepage' exists
                    var key = 'homepage';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://xmlns.com/foaf/0.1/' + key;
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
                      edges.push(myEdge);
                    }
                    // if key 'workplaceHomepage' exists
                    var key = 'workplaceHomepage';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://dbpedia.org/ontology/' + key;
                      myNode.title = key + ': ' + myGraph[key];
                      myNode.label = myGraph[key];
                      myNode.group = 'property';
                      if (!(objectPropInArray(nodes, 'id', myNode.id))) { nodes.push(myNode) };
                      var myEdge = {};
                      myEdge.from = graphId   //id of current graph item
                      myEdge.to = myNode.id;
                      edges.push(myEdge);
                    }
                    
                    // if key 'family_name' exists
                    var key = 'family_name';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://xmlns.com/foaf/0.1/' + key;
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
                      edges.push(myEdge);
                    }
                    
                    // if key 'givenname' exists
                    var key = 'givenname';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://xmlns.com/foaf/0.1/' + key;
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
                      edges.push(myEdge);
                    }
                    
                    // if key 'nick' exists
                    var key = 'nick';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://xmlns.com/foaf/0.1/' + key;
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
                      edges.push(myEdge);
                    }
                    
                    // if key 'phone' exists
                    var key = 'phone';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://xmlns.com/foaf/0.1/' + key;
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
                      edges.push(myEdge);
                    }
                    // if key 'email' exists
                    var key = 'email';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://dbpedia.org/property/' + key;
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
                      edges.push(myEdge);
                    }
                    
                    // if key 'mbox_sha1sum' exists
                    var key = 'mbox_sha1sum';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://xmlns.com/foaf/0.1/' + key;
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
                      edges.push(myEdge);
                    }
                    
                    // if key 'state' exists
                    var key = 'state';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://dbpedia.org/property/' + key;
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
                      edges.push(myEdge);
                    }
                    // if key 'region' exists
                    var key = 'region';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://dbpedia.org/property/' + key;
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
                      edges.push(myEdge);
                    }
                    // if key 'geometry' exists
                    var key = 'geometry';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://dbpedia.org/property/' + key;
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
                      edges.push(myEdge);
                    }
                    // if key 'geo:lat' exists
                    var key = 'geo:lat';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://dbpedia.org/property/' + key;
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
                      edges.push(myEdge);
                    }
                    // if key 'geo:long' exists
                    var key = 'geo:long';
                    if (myGraph[key]) {
                      var myNode = {};
                      myNode.id = graphId + '_' + myGraph[key];
                      myNode.typeOf = 'http://dbpedia.org/property/' + key;
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
                      edges.push(myEdge);
                    }
                  
                  } // end of if show Properties  
                    
                    
                    // Edges
                    // process collections of nodes to make edges to
                    // if key 'knows' exists loop over items
                    var key = 'knows';
                    if (myGraph[key]) {
                      console.log(myGraph[key] + ': ', myGraph[key])
                      for (var i = 0; i < myGraph[key].length; i++) {
                        var myId = myGraph[key][i];
                        // set and edge for the relationship
                        var myEdge = {};
                        myEdge.from = graphId   //id of current graph item
                        myEdge.to = myId;
                        myEdge.label = ' < knows >';
                        myNode.typeOf = 'http://xmlns.com/foaf/0.1/knows';
                        //console.log('myEdge', myEdge)
                        edges.push(myEdge);
                      }
                    }
                    // if key 'member' exists loop over items
                    var key = 'member';
                    if (myGraph[key]) {
                      console.log(myGraph[key] + ': ', myGraph[key])
                      for (var i = 0; i < myGraph[key].length; i++) {
                        var myId = myGraph[key][i];
                        // set and edge for the relationship
                        var myEdge = {};
                        myEdge.from = graphId   //id of current graph item
                        myEdge.to = myId;
                        myEdge.label = ' < ' + key + ' > ';
                        myNode.typeOf = 'http://xmlns.com/foaf/0.1/' + key;
                        //console.log('myEdge', myEdge)
                        edges.push(myEdge);
                      }
                    }
                    // if key 'interest' exists loop over items
                    var key = 'interest';
                    if (myGraph[key]) {
                      console.log(myGraph[key] + ': ', myGraph[key])
                      for (var i = 0; i < myGraph[key].length; i++) {
                        var myId = myGraph[key][i];
                        // set and edge for the relationship
                        var myEdge = {};
                        myEdge.from = graphId   //id of current graph item
                        myEdge.to = myId;
                        myEdge.label = ' < ' + key + ' > ';
                        myNode.typeOf = 'http://xmlns.com/foaf/0.1/' + key;
                        //console.log('myEdge', myEdge)
                        edges.push(myEdge);
                      }
                    }
                    // if key 'skill' exists loop over items
                    var key = 'skill';
                    if (myGraph[key]) {
                      console.log(myGraph[key] + ': ', myGraph[key])
                      for (var i = 0; i < myGraph[key].length; i++) {
                        var myId = myGraph[key][i];
                        // set and edge for the relationship
                        var myEdge = {};
                        myEdge.from = graphId   //id of current graph item
                        myEdge.to = myId;
                        myEdge.label = ' < ' + key + ' > ';
                        myNode.typeOf = 'http://purl.org/vocab/relationship/' + key;
                        //console.log('myEdge', myEdge)
                        edges.push(myEdge);
                      }
                    }
                    // if key 'employedBy' exists loop over items
                    var key = 'employedBy';
                    if (myGraph[key]) {
                      console.log(myGraph[key] + ': ', myGraph[key]) 
                      for (var i = 0; i < myGraph[key].length; i++) {
                        var myId = myGraph[key][i];
                        // set and edge for the relationship
                        var myEdge = {};
                        myEdge.from = graphId   //id of current graph item
                        myEdge.to = myId;
                        myEdge.label = ' < ' + key + ' > ';
                        myNode.typeOf = 'http://purl.org/vocab/relationship/' + key;
                        //console.log('myEdge', myEdge)
                        edges.push(myEdge);
                      }
                    }
                     // if key 'employerOf' exists loop over items
                    var key = 'employerOf';
                    if (myGraph[key]) {
                      console.log(myGraph[key] + ': ', myGraph[key])
                      for (var i = 0; i < myGraph[key].length; i++) {
                        var myId = myGraph[key][i];
                        // set and edge for the relationship
                        var myEdge = {};
                        myEdge.from = graphId   //id of current graph item
                        myEdge.to = myId;
                        myEdge.label = ' < ' + key + ' > ';
                        myNode.typeOf = 'http://purl.org/vocab/relationship/' + key;
                        //console.log('myEdge', myEdge)
                        edges.push(myEdge);
                      }
                    }
                    // if key 'owner' exists loop over items
                    var key = 'owner';
                    if (myGraph[key]) {
                      console.log(myGraph[key] + ': ', myGraph[key])
                      for (var i = 0; i < myGraph[key].length; i++) {
                        var myId = myGraph[key][i];
                        // set and edge for the relationship
                        var myEdge = {};
                        myEdge.from = graphId   //id of current graph item
                        myEdge.to = myId;
                        myEdge.label = ' < ' + key + ' > ';
                        myNode.typeOf = 'http://dbpedia.org/ontology/' + key;
                        //console.log('myEdge', myEdge)
                        edges.push(myEdge);
                      }
                    }
                     // if key 'ceo' exists loop over items
                    var key = 'ceo';
                    if (myGraph[key]) {
                      console.log(myGraph[key] + ': ', myGraph[key])
                      for (var i = 0; i < myGraph[key].length; i++) {
                        var myId = myGraph[key][i];
                        // set and edge for the relationship
                        var myEdge = {};
                        myEdge.from = graphId   //id of current graph item
                        myEdge.to = myId;
                        myEdge.label = ' < ' + key + ' > ';
                        myNode.typeOf = 'http://dbpedia.org/ontology/' + key;
                        //console.log('myEdge', myEdge)
                        edges.push(myEdge);
                      }
                    }
                    
                    // if key 'container_of' exists loop over items
                    var key = 'container_of';
                    if (myGraph[key]) {
                      console.log(myGraph[key] + ': ', myGraph[key])
                      for (var i = 0; i < myGraph[key].length; i++) {
                        var myId = myGraph[key][i];
                        // set and edge for the relationship
                        var myEdge = {};
                        myEdge.from = graphId   //id of current graph item
                        myEdge.to = myId;
                        //myEdge.label = ' < ' + key + ' > ';
                        myEdge.name = 'sioc:container_of',
                        myNode.typeOf = 'http://rdfs.org/sioc/spec/' + key;
                        //console.log('myEdge', myEdge)
                        edges.push(myEdge);
                      }
                    }
                    // if key 'has_container' exists loop over items
                    var key = 'has_container';
                    if (myGraph[key]) {
                      console.log(myGraph[key] + ': ', myGraph[key])
                      for (var i = 0; i < myGraph[key].length; i++) {
                        var myId = myGraph[key][i];
                        // set and edge for the relationship
                        var myEdge = {};
                        myEdge.from = graphId   //id of current graph item
                        myEdge.to = myId;
                        //myEdge.label = ' < ' + key + ' > ';
                        myEdge.name = 'sioc:has_container',
                        myNode.typeOf = 'http://rdfs.org/sioc/spec/' + key;
                        console.log('myEdge', myEdge)
                        edges.push(myEdge);
                      }
                    }
                    
                    // if key 'based_near' exists loop over items
                    var key = 'based_near';
                    if (myGraph[key]) {
                      console.log(myGraph[key] + ': ', myGraph[key])
                      for (var i = 0; i < myGraph[key].length; i++) {
                        var myId = myGraph[key][i];
                        // set and edge for the relationship
                        var myEdge = {};
                        myEdge.from = graphId   //id of current graph item
                        myEdge.to = myId;
                        myEdge.label = ' < ' + key + ' > ';
                        myEdge.name = 'foaf:based_near',
                        myNode.typeOf = 'http://xmlns.com/foaf/0.1/' + key;
                        console.log('myEdge', myEdge)
                        edges.push(myEdge);
                      }
                    }
                    // if key 'birthPlace' exists loop over items
                    var key = 'birthPlace';
                    if (myGraph[key]) {
                      console.log(myGraph[key] + ': ', myGraph[key])
                      for (var i = 0; i < myGraph[key].length; i++) {
                        var myId = myGraph[key][i];
                        // set and edge for the relationship
                        var myEdge = {};
                        myEdge.from = graphId   //id of current graph item
                        myEdge.to = myId;
                        myEdge.label = ' < ' + key + ' > ';
                        myEdge.name = 'dbo:birthPlace',
                        myNode.typeOf = 'http://dbpedia.org/ontology/' + key;
                        //console.log('myEdge', myEdge)
                        edges.push(myEdge);
                      }
                    }
                    
                    
                    
                    
                  } // end of if addNode
              } // end of for objGraph.length
          } // end of if objContent
 
           
          //...when async operation is complete call
          cursorTaskComplete()
    }); //end getFileContent
   
    
};

exports.foaf_bacon = function (id, cb) {

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




// taken from arcmytwits
exports.tags = function (searchFor, cb) {

    var twitTags = [];
    var hashTags = {};

    var folder = path.join(__dirname, '../../public/json/.');

    var bConcept = true;
    var bEntity = true;
    var filter = null;
    
    if (searchFor != '') {
        filter = searchFor;
        if (searchFor == 'entity') {
            bConcept = false
            filter = null
        } 
        if (searchFor == 'concept') {
            bEntity = false
            filter = null
        }
    };
    
    console.log('filter:', filter)
    console.log('bConcept:', bConcept)
    console.log('bEntity:', bEntity)
    
    fs.readdir(folder, function (err, files) {
        if (err) {
            console.log('error', err);
            cb(err);
        }


        var cursorTasks = files.length; // This will decrement for each file then callback
        function cursorTaskComplete() {
            cursorTasks--;
            //console.log(cursorTasks)
            if (cursorTasks <= 0) {

                //twitTags.sort(function(obj1, obj2) {
                	// Ascending: first ocj less than the previous
                //	return obj1.subject - obj2.subject;
                //});
                // Sort twits   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                twitTags.sort(function (a, b) {
                  if (a.subject > b.subject) {
                    return 1;
                  }
                  if (a.subject < b.subject) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
                });
                //console.log(twitTags);
                
                for (var i = 0; i < twitTags.length; i++) {
                    var tag = twitTags[i];
                    var hashed = hashTags[tag.guid] || null;
                    if (hashed) { 
                        tag.count = parseInt(hashed.count) + parseInt(tag.count);
                    }
                    hashTags[tag.guid] = tag;
                }
                //console.log(hashTags);
                twitTags = [];
                for (var key in hashTags) {
                    //console.log(hashTags[key])
                    twitTags.push(hashTags[key]);
                }
                
                cb(null, twitTags);
            }
        } // end cursorTaskComplete


        /*
        * Process files
        */
        for (var i = 0; i < files.length; i++) {

            //console.log(i)
            var file = files[i];
            var filepath = path.join(folder, file);

            getFileContent(filepath, function (err, fileContent) {
                if (err) {
                    console.log('error', err);
                    cb(err);
                }

                var objContent = JSON.parse(fileContent);

                if (objContent != undefined) {

                    var objId = objContent.id;
                    var objTitle = objContent.title;
                    if (objContent.concepts) { var objConcepts = objContent.concepts.concepts };
                    if (objContent.entities) { var objEntities = objContent.entities.entities };
                    if (objContent.taxonomies) { var objTaxonomies = objContent.taxonomies.taxonomy };
                }
               

                /*
                * Process Concepts
                */
                
                if ( (bConcept) && (objConcepts != undefined) ) {

                    for (var j = 0; j < objConcepts.length; j++) {

                        var myConcept = new Concept();
                        myConcept = objConcepts[j];

                        if (myConcept != undefined) {

                            //console.log('myConcept:', myConcept)
                            
                            var subject = myConcept.text;
                            var typeHierarchy = '';
                            if (myConcept.knowledgeGraph) { typeHierarchy == myConcept.knowledgeGraph.typeHierarchy };
                            var guid = 'c' + j ;
                            if (typeHierarchy != '') { guid = typeHierarchy; } else if (subject != '') { guid = subject; } ;
                            var count = 1;
                            //var contained = '<a href="/twitearchive/list/' + objId + '" title="' + '">' + objTitle + '</>';
                            var link = '/twitarchives/list/' + subject
                            var refs = []
                            refs.push(myConcept.freebase);
                            refs.push(myConcept.dbpedia);
                            
                            var myTag = new Tag({
                                kind: 'rdf/tag',
                                references: refs,
                                link: link,
                                count: count,
                                
                                subject: subject,
                                predicate: ' is a ',
                                object: 'Concept: ' + guid,
                                
                                guid: guid
                            });
                            //console.log(myTag);
                            
                            //twitTags[myTag.guid] = myTag;
                            if ( (myConcept.relevance < 0.5) || (myConcept.text == 'Quantity') )  {
                                    //console.log('myConcept has:', myConcept.relevance, myConcept.text)
                            } else {
                                
                                if (filter) {
                                    if ( myTag.subject.search(filter) > -1 ) {
                                        //console.log('filter:', filter)
                                        twitTags.push(myTag);
                                    } else {
                                        //console.log('subject', subject)
                                    };
                                } else {
                                    twitTags.push(myTag);
                                };
                                
                            }


                        } //end if
                    } // end for
                } //end if


                /*
                * Process Entities
                */
                if ( ( bEntity) && (objEntities != undefined) ) {

                    for (var k = 0; k < objEntities.length; k++) {

                        var myEntity = new Entity();
                        myEntity = objEntities[k];

                        if (myEntity != undefined) {

                            //console.log('myEntity:',myEntity)
                            
                            var subject = myEntity.text || '';
                            var typeHierarchy = '';
                            if (myEntity.knowledgeGraph) { typeHierarchy = myEntity.knowledgeGraph.typeHierarchy };

                            var guid = 'e' + k ;
                            if (typeHierarchy != '') { guid = typeHierarchy; } else if (subject != '') { guid = subject; } ;
                                
                            var count = myEntity.count || 1;
                            count = 1   //set to one so count is of files entity found in
                            //var contained = '<a href="/twitearchive/list/' + objId + '" title="' + '">' + objTitle + '</>';
                            var link = '/twitarchives/list/' + subject
                            var refs = []
                            if (myEntity.freebase) { refs.push(myEntity.freebase) };
                            refs.push(myEntity.dbpedia);
                            
                            var myTag = new Tag({
                                kind: 'rdf/tag',
                                references: refs,
                                link: link,
                                count: count,
                                
                                subject: subject,
                                predicate: ' is a ',
                                object: 'Entity: ' + myEntity.type,
                                
                                guid: guid
                            });
                            //console.log('myTag:', myTag);
                            //if (twitTags[myTag.guid]) myTag.count + twitTags[myTag.guid].count
                            //console.log(myTag.contained);
                            
                            if ( (myEntity.relevance < 0.33) || (myEntity.type == 'Quantity') )  {
                                    //console.log('entity has:', myEntity.relevance, myEntity.type)
                            } else {
                                
                                if (filter) {
                                    if ( myTag.subject.search(filter) > -1 ) {
                                        //console.log('filter:', filter)
                                        twitTags.push(myTag);
                                    } else {
                                        //console.log('subject', subject)
                                    };
                                } else {
                                    twitTags.push(myTag);
                                };
                                
                            }
  
                        } //end if
                    } //end for
                } //end if

                //...when async operation is complete call
                //console.log(twitTags.length)
                cursorTaskComplete()
            });

        }

    });

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


