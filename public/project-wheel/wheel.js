"use strict";
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

let treeRoot = {
  "id": "foafiaf:treeroot",
  "label": "ROOT",
  "name": "Strategy Tree",
  "children": [ ]
} 

let wheelJS = [] ;
wheelJS.push(
{
  "name": "SEGMENTS",
  "id": "foafiaf:Segments",
  "dbotype": "foafiaf:Segment",
  "label": "SEGMENTS",
  "name": "SEGMENTS",
  "description": "",
  "children": [
    {
      "name": "SPOKES",
      "id": "foafiaf:Spokes",
      "dbotype": "foafiaf:Spoke",
      "label": "SPOKES",
      "description": "",
      "children": [
        {
          "name": "STRATEGIES",
          "id": "foafiaf:Strategys",
          "dbotype": "foafiaf:Strategy",
          "label": "STRATEGIES",
          "description": "",
          "children": [
            {
              "name": "PROJECTS",
              "id": "foafiaf:Projects",
              "dbotype": "foafiaf:Project",
              "label": "PROJECTS",
              "description": "",
              "children": [
                {
                  "name": "2017",
                  "id": "foafiaf:Milestones_2017",
                  "dbotype": "foafiaf:Milestone",
                  "label": "2017 MILESTONES",
                  "description": "",
                  "children": [
                    {
                      "name": "2018",
                      "id": "foafiaf:Milestones_2018",
                      "dbotype": "foafiaf:Milestone",
                      "label": "2018 MILESTONES",
                      "description": "",
                      "children": [
                        {
                          "name": "2019",
                          "id": "foafiaf:Milestones_2019",
                          "dbotype": "foafiaf:Milestone",
                          "label": "2019 MILESTONES",
                          "description": "",
                          "children": [
                            
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});
      
    


function getTreeJS(cb) {
	console.log('getTreeJS')
	console.log(JSON.stringify(wheelJS))
	
	treeRoot.children = wheelJS
	if (cb) cb(null, treeRoot)
	//return wheelJS
}

function getWheelJS(cb) {
	console.log('getWheelJS')
	//console.log(wheelJS)
	console.log(JSON.stringify(wheelJS))
	
	if (cb) cb(null, wheelJS)
	//return wheelJS
}


//  when the graph data upload is complete, process data
function convertGraph(data, cb) {
	console.log('convertGraph data', data)
	
	var graph = data['@graph'];

	var segmentNodes = getNodes(graph, 'foafiaf:Segment', null)
	console.log('segmentNodes', segmentNodes)
  console.log('segmentNodes.length', segmentNodes.length)
  
  var segmentChilds= getChildNodes(segmentNodes);
  console.log('segmentChilds', segmentChilds)
  //wheelJS = segmentChilds;
  //console.log(wheelJS)
  
  //
  // Loop over segment nodes to get child notes to add to tree
  //
	for (var i = 0; i < segmentNodes.length; i++) {                             // segmentNodes
        //var segmentNode = segmentNodes[i]
        var segmentChild = segmentChilds[i]
        wheelJS[i+1] = segmentChild;

	    var _spokeid = segmentNodes[i]['@id'];
	    var spokeNodes = getNodes(graph, 'foafiaf:Spoke', _spokeid)             // get nodes of type spoke
	    var spokeChilds = getChildNodes(spokeNodes);
        if (spokeChilds.length > 0) wheelJS[i+1].children = spokeChilds;
        
      //
      // Loop over spoke nodes to get child notes to add to tree
      //
      console.log('spokeNodes.length', spokeNodes.length)
	    for (var k = 0; k < spokeNodes.length; k++) {                           // spokeNodes
          let _spoke = spokeNodes[k];         console.log('_spoke', _spoke) 
  	      _spoke.id = _spoke['@id'];
  	      _spoke.name = _spoke['name'] || _spoke['rdfs:label'];

	        var _strategyid = spokeNodes[k]['@id'];
	        var strategyNodes = getNodes(graph, 'foafiaf:Strategy', _strategyid)
	        var strategyChilds = getChildNodes(strategyNodes);
	        if (strategyChilds.length > 0) wheelJS[i+1].children[k].children = strategyChilds;

          //
          // Loop over strategy nodes to get child notes to add to tree       
          //	        
	        for (var g = 0; g < strategyNodes.length; g++) {                    // strategyNodes

    	        var _projectid = strategyNodes[g]['@id'];
    	        var projectNodes = getNodes(graph, 'foafiaf:Project', _projectid)
    	        var projectChilds = getChildNodes(projectNodes);
	            if (projectChilds.length > 0) wheelJS[i+1].children[k].children[g].children = projectChilds;

	        }
	        
	        
	        
            //
            // for each spoke add placeholders for years as parent for measures
            //

            
  	        
            let child2017 = {
              "id": "2017_" + _spoke.id,
              "dbotype": "foafiaf:Measure",
              "label": "",
              "name": "2017_" + _spoke.name,
              "children": []
            }

            var wheelSpoke = findById( wheelJS, _spoke.id) 
  	        if (!wheelSpoke.children) wheelSpoke.children = [];                   // if parent has no children array, add it
            wheelSpoke.children.insert(0, child2017);
            //console.log('wheelSpoke.insert(0, child2017);', child2017, wheelSpoke)
            
            let child2018 = {
              "id": "2018_" + _spoke.id,
              "dbotype": "foafiaf:Measure",
              "label": "",
              "name": "2018_" + _spoke.name,
              "children": []
            }
            var wheelSpoke = findById( wheelJS, "2017_" + _spoke.id) 
            if (!wheelSpoke.children) wheelSpoke.children = []; 
            wheelSpoke.children.insert(0, child2018);
            //console.log('wheelSpoke.insert(0, child2018);', child2018, wheelSpoke)
            
            let child2019 = {
              "id": "2019_" + _spoke.id,
              "dbotype": "foafiaf:Measure",
              "label": "",
              "name": "2019_" + _spoke.name,
              "children": []
            }
            var wheelSpoke = findById( wheelJS, "2018_" + _spoke.id) 
            if (!wheelSpoke.children) wheelSpoke.children = []; 
            wheelSpoke.children.insert(0, child2019);
            //console.log('wheelSpoke.insert(0, child2019);', child2019, wheelSpoke)
  
	    } // end for spokes
	    
	} // end segments

  //
  // then add measures and meatrice for year(s)
  //
  doMeasures2017(graph)


function doMeasures2017(graph, cb) {
    console.log('doMeasures2017')
    // foafiaf:Measure
    //
    console.log('// INSERT MEASURES as children of SPOKE')
    //

    var gnot = getYearNodes(graph, 'foafiaf:Measure', 2017, function(err, measureNodes) {
        if (err) {
            console.log('getNodesOfType error', err);
            cb(err);
        } 
        console.log('measureNodes.length', measureNodes.length, null)
        console.log('2017 measureNodes', measureNodes)
        
        for (let m = 0;  m<measureNodes.length; m++) {  

          console.log('// INSERT MEASURES into wheel structure using  placeholder element')
          let child = measureNodes[m];
          child.colour = child['foafiaf:color']
          child.name = child['foafiaf:shortname']
          console.log('child', child)
          let _id = child.id
          //let _spoke = child.spoke
          let _parent = "2017_" +  child['foafiaf:Strategy']

          let wheelSpoke = findById( wheelJS, _parent )                // find node of intended parent
          if (!wheelSpoke.children) wheelSpoke.children = [];               // if parent has no children array, add it
          wheelSpoke.children.insert(0, child);                            // add new child
          console.log('wheelSpoke.insert(0, child);', child, wheelSpoke) 
                

        }
        
      
    }); // end of gnot      
  
  if (cb) cb(null, true)
};        
             
    


    
  //
  // utility functions
  
    function findById(source, id) {                         // NEEDS TO BE FOR ALL LEVELS
      console.log('findById source id', source, id)
      //console.log(JSON.stringify(source))
    
      for (let i = 0; i < source.length; i++) {
        let isource = source[i];
        if (isource.id === id) {
          return isource;
        } else {
            let ichildren = isource.children || []
            for (let j = 0; j < ichildren.length; j++) {
                let jsource = ichildren[j];
                if (jsource.id === id) {
                    return jsource;
                } else {
                    let jchildren = jsource.children || []
                    for (let k = 0; k < jchildren.length; k++) {
                        let ksource = jchildren[k];
                        if (ksource.id === id) {
                            return ksource;
                        } else {
                            let kchildren = ksource.children || []
                            for (let l = 0; l < kchildren.length; l++) {
                                let lsource = kchildren[l];
                                if (lsource.id === id) {
                                    return lsource;
                                } 
                            }
                        }
                    }
                }
            }
        }
      } // end for
      
      throw "Couldn't find object with id: " + id;
    }; // end function findById
  
  
  
    function getChildNodes(theNodes) {
        //console.log('getChildNodes')
        
        var children = []
        for (var i = 0; i < theNodes.length; i++) {
        	var _id = theNodes[i]['@id'];
            var _type = theNodes[i]['@type'];
        	var _dbotype = theNodes[i]['dbo:type'] || null;
        	
        	var _label = theNodes[i]['rdfs:label'] || null;
        	var _label = theNodes[i]['skos:prefLabel'] || _label;

        	var _shortname = theNodes[i]['foafiaf:shortname'] || null;
        	var _description = theNodes[i]['dc:description'] || null;
        	//var _definition = theNodes[i]['skos:definition'] || null;
        	
            var _status = theNodes[i]['foafiaf:status'] || null;
            var _priority = theNodes[i]['foafiaf:priority'] || null;
            var _percent = theNodes[i]['foafiaf:percent'] || null;
            var _color = theNodes[i]['foafiaf:color'] || null;
            var _startdate = theNodes[i]['foafiaf:startdate'] || null;
            var _enddate = theNodes[i]['foafiaf:enddate'] || null;
            
            var _categories = theNodes[i]['foafiaf:categories'] || null;
            var _keywords = theNodes[i]['foafiaf:keywords'] || null;
            
            var _team = theNodes[i]['foafiaf:group'] || null;
            var _segment = theNodes[i]['foafiaf:Segment'] || null;
            var _spoke = theNodes[i]['foafiaf:Spoke'] || null;
            var _strategy = theNodes[i]['foafiaf:Strategy'] || null;
            var _measure = theNodes[i]['foafiaf:Measure'] || null;
            var _project = theNodes[i]['foafiaf:Project'] || null;
            var _broader = theNodes[i]['skos:broader'] || null;
            
            //console.log('_description', _description)
            // var language = _description['@language'] || null;
            // //console.log('language', language)
            // var value = _description['@value'] ;
            // //console.log('value', value)
            // if (language || value) {
            //     console.log('value', value)
            //     _description = value;
            // }
            
        	var newChild = {};
        	newChild.i = i;
        	newChild.id = _id;
        	newChild.dbotype = _dbotype;
        	newChild.label = _label;
        	newChild.name = _shortname || _label;
        	newChild.description = _description;
        	//newChild.definition = _definition;
        	newChild.status = _status;
        	newChild.priority = _priority;
        	newChild.percent = _percent;
        	newChild.startdate = _startdate;
        	newChild.team = _team;
        	newChild.strategy = _strategy;
        	newChild.measure = _measure;
        	newChild.project = _project;
        	newChild.broader = _broader;
        	
        	//if (_dbotype === 'foafiaf:Segment') newChild.colour = colours[i];
        	//newChild.colour = colours[i];
        	
            //console.log(newChild)
        	children.push(newChild);
        }
        return children
    } // end getChildNodes
    
    
      
    // FUNCTION
    function getNodes(graph, type, broader) {
        //console.log('getNodes')
    
        var dboType = type || "";
        //console.log('dboType', type)
        var skosBroader = broader || null;
        //console.log('skosBroader', skosBroader)
        
        var Nodes = []
        // loop over nodes to determine and add id, group, title, label
    	for (var i = 0; i < graph.length; i++) {
    		var _id = graph[i]['@id'];
    		var _type = graph[i]['@type'];
    		var _dbotype = graph[i]['dbo:type'] || null;
            var _broader = graph[i]['skos:broader'] || null;
            var _strategy = graph[i]['foafiaf:Strategy'] || null;
            var _priority = graph[i]['foafiaf:priority'] || null;
            
            var addNode = false;
            if ( (_dbotype === dboType) && (_type === 'skos:Concept') ) {
                
                if (_dbotype === 'foafiaf:Segment') {
                    addNode = true;
                    //console.log(_dbotype, skosBroader, addNode)
                } // end Segment
                
                if (_dbotype === 'foafiaf:Spoke') {
                    if ( (skosBroader === _broader) ) {
                        addNode = true;
                        //console.log(_dbotype, skosBroader, addNode)
                    }
                } // end Spoke
                
                if (_dbotype === 'foafiaf:Strategy') {
                    if ( (skosBroader === _broader) ) {
                        addNode = true;
                        //console.log(_dbotype, skosBroader, addNode)
                    }
                } // end Strategy
                
                if (_dbotype === 'foafiaf:Project') {
                    if ( (skosBroader === _strategy) ) {
                        if ( (_priority === "Yes" ) || (_priority === "yes" )  || (_priority === "YES" ) ) {
                            addNode = true;
                            //console.log(_dbotype, skosBroader, addNode)
                        }
                    }
                } // end Project
                   
            } // end Concept
            
            if ( addNode ) {
                //console.log('_id ', _id)
                Nodes.push(graph[i])
            }
            
    	} // end for
    	//console.log('Nodes', Nodes)
    	return Nodes;
    }
    
    
    // FUNCTION
    function getYearNodes(graph, type, year, cb) {
        console.log('getYearNodes', type, year)
    
        let dboType = type || "";
        
        let Nodes = []
          // loop over nodes to determine and add id, group, title, label
      	for (let i = 0; i < graph.length; i++) {
      	    let _node = graph[i];
      	    
      		let _id = graph[i]['@id'];
      		let _type = graph[i]['@type'];
      		let _dbotype = graph[i]['dbo:type'] || null;
              let _broader = graph[i]['skos:broader'] || null;
              let _spoke = graph[i]['foafiaf:Spoke'] || null;
              let _strategy = graph[i]['foafiaf:Strategy'] || null;
              let _priority = graph[i]['foafiaf:priority'] || null;
              let _startdate = graph[i]['foafiaf:startdate'] || '';
              
              let addNode = false;
              if ( (_dbotype === dboType) && (_type === 'skos:Concept') ) {
                  
                  if (_dbotype === 'foafiaf:Project') {
                      if ( year.toString() === _startdate.toString() ) {
                          if ( ( _priority.toUpperCase() === "YES" ) ) {
                              addNode = true;
      
                          }
                      }
                  } // end Project
                  
                  if (_dbotype === 'foafiaf:Measure') {
                      if ( year.toString() === _startdate.toString() ) {
                              addNode = true;
      
                      }
                  } // end Project
                     
              } // end Concept
              
              if ( addNode ) {
                  //console.log('_id ', _id)
                  Nodes.push(graph[i])
              }
              
      	} // end for
      	//console.log('Nodes', Nodes)
    	
        if (cb) cb(null, Nodes);
      
   } // end function getYearNodes


   function saveProjectWheel(wheel) {
      console.log('saveProjectWheel')
      
      let _json = JSON.stringify(wheel)
      //console.log(_json)
   }

    

  
  //console.log(JSON.stringify(wheelJS))
	if (cb) cb(wheelJS)
	return wheelJS
	
} //end dataReceived
