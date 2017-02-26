
var colours = ["#FF0000","#FFFF00","#008000","#0000FF","#800080"]
var wheelJS = [
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
            "dbotype": "foafiaf:Stategy",
            "label": "STRATEGIES",
            "description": "",
            "children": [
              {
                "name": "PROJECTS",
                "id": "foafiaf:Projects",
                "dbotype": "foafiaf:Project",
                "label": "PROJECTS",
                "description": ""
              }
            ]
          }
        ]
      }
    ]
  }
]
    
function getWheelJS(cb) {
	console.log('getWheelJS')
	//console.log(wheelJS)
	console.log(JSON.stringify(wheelJS))
	if (cb) cb(null, wheelJS)
	//return wheelJS
}

//  when the graph data upload is complete, process data
function dataReceived(data, cb) {
	console.log('dataReceived')
	
	if (spinner) spinner.spin() ;
	
    //console.log('data', JSON.stringify(data))

	var graph = data['@graph'];

	var segmentNodes = getNodes(graph, 'foafiaf:Segment')
	//console.log('segmentNodes', segmentNodes)
    //console.log('segmentNodes.length', segmentNodes.length)
    
    var segmentChilds= prepChildNodes(segmentNodes);
    //console.log('segmentChilds', segmentChilds)
    //wheelJS = segmentChilds;
    console.log(wheelJS)
    
	for (var i = 0; i < segmentChilds.length; i++) {     // loop over all segments
        //var segmentNode = segmentNodes[i]
        var segmentChild = segmentChilds[i]
        wheelJS[i+1] = segmentChild;                     // add segments next to default root branch

	    //var _segmentid = segmentNodes[i]['@id'];
	    var _segmentid = segmentChild.id
	    var spokeNodes = getNodesByParent(graph, 'foafiaf:Spoke', 'foafiaf:Segment', _segmentid)              // get spoke nodes where broader = segmentid
	    var spokeChilds = prepChildNodes(spokeNodes);
       
        //console.log('i spokeChilds.length', i, spokeChilds.length)
        if (spokeChilds.length > 0) wheelJS[i+1].children = spokeChilds;
        
        
	    for (var k = 0; k < spokeNodes.length; k++) {       // loop over spoke children of segment parent

	        var _spokeid = spokeNodes[k]['@id'];                                                        
	        var strategyNodes = getNodesByParent(graph, 'foafiaf:Strategy', 'foafiaf:Spoke', _spokeid)      // get streategy nodes where broader = spoke
	        var strategyChilds = prepChildNodes(strategyNodes);
	        
	        //console.log('k strategyChilds.length', k, strategyChilds.length)
	        if (strategyChilds.length > 0) wheelJS[i+1].children[k].children = strategyChilds;
	        
	        
	        for (var g = 0; g < strategyNodes.length; g++) {    // loop over strategy childrennof spoke parent

    	        var _strategyid = strategyNodes[g]['@id'];
    	        var projectNodes = getNodesByParent(graph, 'foafiaf:Project', 'foafiaf:Strategy', _strategyid)  // get project nodes where broader = strategy
    	        var projectChilds = prepChildNodes(projectNodes);
    	        //console.log(projectChilds)
    	        
    	        //console.log('g projectChilds.length', g, projectChilds.length)
	            if (projectChilds.length > 0) wheelJS[i+1].children[k].children[g].children = projectChilds;


    	        for (var p = 0; p < projectNodes.length; p++) {     // loop over project children of strategy parent
    
        	        var _projectid = projectNodes[p]['@id'];
        	        var subprojectNodes = getNodesByParent(graph, 'foafiaf:Project', 'foafiaf:Project', _projectid)  // get subproject nodes where broader = project
        	        var subprojectChilds = prepChildNodes(subprojectNodes);
        	        
        	        console.log('p subprojectChilds.length', p, subprojectChilds.length)
    	            if (subprojectChilds.length > 0) wheelJS[i+1].children[k].children[g].children[p].children = subprojectChilds;

    	            // end subprojectChilds
    	        
	            } // end projectNodes
	           
	        } // end strategynodes
	    } // end spokenodes
	} // end segment nodes

    
    function prepChildNodes(theNodes) {
        //console.log('prepChildNodes')
        
        var children = []
        for (var i = 0; i < theNodes.length; i++) {
        	var _id = theNodes[i]['@id'];                  // if(_id === 'foafiaf:Project_Blue_Zones') console.log('theNodes[i]', theNodes[i])
            var _type = theNodes[i]['@type'];
        	var _dbotype = theNodes[i]['dbo:type'] || null;
        	var _group = null;
    		if 	(_dbotype) {
    			_group = _dbotype.substring(_dbotype.indexOf(":") + 1);
    		} else {
    			_group = _type.substring(_type.indexOf(":") + 1);
    		}
        	var _label = theNodes[i]['rdfs:label'] || null;
        	var _shortname = theNodes[i]['foafiaf:shortname'] || null;
        	var _title = theNodes[i]['dc:title'] || null;
        	var _description = theNodes[i]['dc:description'] || null;
        	var _preflabel = theNodes[i]['skos:prefLabel'] || null;
        	var _definition = theNodes[i]['skos:definition'] || null;
        	
            var _status = theNodes[i]['foafiaf:status'] || null;
            var _priority = theNodes[i]['foafiaf:priority'] || null;
            var _percent = theNodes[i]['foafiaf:percent'] || null;
            var _color = theNodes[i]['foafiaf:color'] || null;
            var _startdate = theNodes[i]['foafiaf:startdate'] || null;
            var _enddate = theNodes[i]['foafiaf:enddate'] || null;
            var _projectoutputs = theNodes[i]['foafiaf:projectoutputs'] || null;
            
            var _team = theNodes[i]['foafiaf:group'] || null;
            var _segment = theNodes[i]['foafiaf:Segment'] || null;
            var _spoke = theNodes[i]['foafiaf:Spoke'] || null;
            var _strategy = theNodes[i]['foafiaf:Strategy'] || null;
            var _project = theNodes[i]['foafiaf:Project'] || null;
            var _measure = theNodes[i]['foafiaf:Measure'] || null;
            var _broader = theNodes[i]['skos:broader'] || null;
            
            
        	var newChild = {};
        	newChild.i = i;
        	newChild.id = _id;
        	newChild.dbotype = _dbotype;
        	newChild.group = _group;
        	newChild.label = _label || _title;
        	newChild.name = _shortname || _label;
        	newChild.description = _description || _definition;
        	
        	newChild.segment = _segment;
        	newChild.spoke = _spoke;
        	newChild.strategy = _strategy;
        	
        	newChild.status = _status;
        	newChild.priority = _priority;
        	newChild.percent = _percent;
        	newChild.color = _color;
        	newChild.startdate = _startdate;
        	newChild.enddate = _enddate;
        	newChild.projectoutputs = _projectoutputs;
        	
        	newChild.team = _team;
        	newChild.segment = _segment;
        	newChild.spoke = _spoke;
        	newChild.strategy = _strategy;
        	newChild.measure = _measure;
        	newChild.project = _project;
        	newChild.broader = _broader;
        	newChild.color = _color;
        	
        	if (_startdate === "2016") newChild.color = "Blue"
        	if (_startdate === "2017") newChild.color = "Cyan"
        	if (_startdate === "2018") newChild.color = "Green"
        	if (_startdate === "2019") newChild.color = "Yellow"
        	if (_startdate === "2019") newChild.color = "Red"
        	
            //console.log(newChild)
        	children.push(newChild);
        }
        return children
    } // end getChildNodes
    
    
      
    // // FUNCTIONS
    function getNodes(graph, type) {                           // get nodes that ate equal to broader
        //console.log('getNodes')
    
        var dboType = type || "";
        //console.log('dboType', type)

        
        var Nodes = []
        // loop over nodes to determine and add id, group, title, label
    	for (var i = 0; i < graph.length; i++) {
    		var _id = graph[i]['@id'];
    		var _type = graph[i]['@type'];
    		var _dbotype = graph[i]['dbo:type'] || null;
            var _broader = graph[i]['skos:broader'] || null;
            var _strategy = graph[i]['foafiaf:Strategy'] || null;
            var _spoke = graph[i]['foafiaf:Spoke'] || null;
            var _priority = graph[i]['foafiaf:priority'] || null;
            
            var addNode = false;
            if ( (_dbotype === dboType) && (_type === 'skos:Concept') ) {
                
                addNode = true;
                //console.log(_dbotype, _id, addNode)
                    
                // if (_dbotype === 'foafiaf:Segment') {                           // id Segment add node
                //     addNode = true;
                //     //console.log(_dbotype, skosBroader, addNode)
                // } // end Segment
                
                // if (_dbotype === 'foafiaf:Spoke') {                             // id Spoke is = broader add node
                //     if ( (skosBroader === _broader) ) {
                //         addNode = true;
                //         //console.log(_dbotype, skosBroader, addNode)
                //     }
                // } // end Spoke
                
                // if (_dbotype === 'foafiaf:Strategy') {                          // id Strategy is = broader add node
                //     if ( (skosBroader === _broader) ) {
                //         addNode = true;
                //         //console.log(_dbotype, skosBroader, addNode)
                //     }
                // } // end Strategy
                
                // if (_dbotype === 'foafiaf:Project') {                           // if Project and = broader add node if priority is yes
                //     if ( (skosBroader === _strategy) ) {
                //         if ( (_priority === "Yes" ) || (_priority === "yes" )  || (_priority === "YES" ) ) {
                //             addNode = true;
                //             //console.log(_dbotype, skosBroader, addNode)
                //         }
                //     }
                // } // end Project
                   
            } // end Concept
            
            if ( addNode ) {
                //console.log('_id ', _id)
                Nodes.push(graph[i])
            }
            
    	} // end for
    	//console.log('Nodes', Nodes)
    	return Nodes;
    }
    
    function getNodesByParent(graph, type, parent_type, parent_id) {        // get nodes that have parent of type if not broader
        //console.log('getNodesByParent')
    
        //var dboType = type || "";
        //console.log('dboType', type)
        //console.log('parent_id', parent_id)
        
        var Nodes = []
        // loop over nodes to determine and add id, group, title, label
    	for (var i = 0; i < graph.length; i++) {
    		var _id = graph[i]['@id'];
    		var _type = graph[i]['@type'];
    		var _dbotype = graph[i]['dbo:type'] || null;
            var _broader = graph[i]['skos:broader'] || null;
            var _project = graph[i]['foafiaf:Project'] || null;
            var _strategy = graph[i]['foafiaf:Strategy'] || null;
            var _spoke = graph[i]['foafiaf:Spoke'] || null;
            var _priority = graph[i]['foafiaf:priority'] || null;
            
            var addNode = false;
            if ( (_dbotype === type) && (_type === 'skos:Concept') ) {           // filter all but nodes of dbotype
                
                if (_broader === parent_id) {                                       // if broader == parent then add node
                    
                    addNode = true;
                    //console.log(_dbotype, _broader, addNode)
            
                } else if ( (_broader === null) && (_dbotype === 'foafiaf:Project') ) {     // else if Project and broader null and strategy parent
                    
                    if ( _strategy === parent_id ) {
                        
                        addNode = true;
   
                    }
                    
                } else {
                    
                    //console.log('graph[i] ptype pid', graph[i], parent_type, parent_id)
                }
              
                if ( addNode && _dbotype === 'foafiaf:Project' ) {                               // filter projects that are not flagged priority
                    
                    //console.log('foafiaf:Project ptype pid', _id, parent_type, parent_id)
                    
                    if (  (_priority === "Yes") || (_priority === "yes")  || (_priority === "YES")  ) {
                            addNode = true;
                            console.log(_dbotype, parent_type, parent_id, addNode)
                    } else {
                        addNode = false;
                    }
                }
                
                // if (_dbotype === 'foafiaf:Project') {                           // if Project and = broader add node if priority is yes
                //     if ( (skosBroader === _strategy) ) {
                //         if ( (_priority === "Yes" ) || (_priority === "yes" )  || (_priority === "YES" ) ) {
                //             addNode = true;
                //             //console.log(_dbotype, skosBroader, addNode)
                //         }
                //     }
                // } // end Project
                   
            } // end Concept
            
            if ( addNode ) {
                //console.log('_id ', _id)
                Nodes.push(graph[i])
            }
            
    	} // end for
    	//console.log('Nodes', Nodes)
    	return Nodes;
    }
    
    
    
    function saveProjectWheel(wheel) {
        console.log('saveProjectWheel')
        
        var _json = JSON.stringify(wheel)
        //console.log(_json)
    }

    if (spinner) spinner.stop() ;
    //console.log(JSON.stringify(wheelJS))
	if (cb) cb(wheelJS)
	return wheelJS
} //end dataReceived
