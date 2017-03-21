'use strict';
//  when the graph data upload is complete, process data
function dataReceived(data, cb) {
	console.log('dataReceived', data)
	
	let graph = data['@graph'];
	
	let rawDataSet = null;
    var xyz = buildDataSet(graph, function(err, result) {
        if (err) {
            console.log('getNodesOfType error', err);
            cb(err);
        }
        rawDataSet = result;
        
    });
	
	//console.log('rawDataSet', JSON.stringify(rawDataSet))
	//console.log('rawDataSet', rawDataSet)
	if (cb) cb(rawDataSet)
	return rawDataSet
		
} // end dataReceived


function buildDataSet(graph, cb) {
	console.log('buildDataSet')

	//
	//  Create an array of spoke nodes
	//
    let spokeNodes = getNodes(graph, 'foafiaf:Spoke')        
	//console.log('spokeNodes', spokeNodes)
	
	const list = []
	for (let s=0; s<spokeNodes.length; s++) {
	    var _spoke = spokeNodes[s]['@id'] || null;
	    if (_spoke) _spoke = _spoke.replace('foafiaf:', '') ;
	    if (_spoke) _spoke = _spoke.replace('&', '') ;
	    
	    if (!list.includes(_spoke)) list.push(_spoke)
	}

	  
    let myDataSets = []
    
    //console.log('list', list)
    for (let i=0; i<list.length; i++) {
        let _parentid = "foafiaf:" + list[i] ;
        let _id = list[i] ;
        let _name = list[i].replace('_',' ') ;
        let measureNodes = getNodesByParent(graph, 'foafiaf:Measure', 'foafiaf:Spoke', _parentid)
        let dataset = prepNodes(measureNodes);
        
        if (dataset.length) {
            // add div with h3 tags
            var droot = setDiv(_id, _name)
            
            // var froot = setCbx(_id, _name)
            
            var tline = setTimeline(_id, dataset)

            myDataSets.push(dataset);
        }
    }
      
    //console.log('myDataSets', myDataSets)
    //console.log('myDataSets', JSON.stringify(myDataSets))
    if (cb) cb(null, myDataSets)
}

function setTimeline(_id, dataset){
    console.log('setTimeline')
    
    // Configuration for the Timeline
    var options = {
      align: 'left',
      start: '2017',
      end: '2026'
    };
    
    var container_ = document.getElementById(_id);
    var timeline_ = new vis.Timeline(container_, dataset, options);
    
    return(timeline_)
}

function setDiv(_id, _text){
    
    var node = document.createElement("div");
    var att = document.createAttribute("id"); 
    att.value = _id;  
    node.setAttributeNode(att);
    
    var h3 = document.createElement("H3");
    var htext = document.createTextNode(_text);
    h3.appendChild(htext);
    node.appendChild(h3);
    
    var droot = document.getElementById('visualization').appendChild(node);
    //console.log('droot', droot)

    return(droot)
}

function setCbx(_id, _text){
    
    var node = document.createElement("input");
    
    var atr1 = document.createAttribute("type"); 
    atr1.value = "checkbox";  
    node.setAttributeNode(atr1);
    
    var att2 = document.createAttribute("name"); 
    att2.value = "cbxspokes";  
    node.setAttributeNode(att2);
    
    var attv = document.createAttribute("value"); 
    attv.value = _id;  
    node.setAttributeNode(attv);
    
    var att3 = document.createAttribute("onclick"); 
    att3.value = "toggle(" + _id + ", this)";  
    node.setAttributeNode(att3);
    
    var att4 = document.createAttribute("checked"); 
    node.setAttributeNode(att4);

    //var label = document.createElement("H3");
    // var htext = document.createTextNode(_text);
    // node.appendChild(htext);
    
    var droot = document.getElementById('selectors').appendChild(node);
    //console.log('droot', droot)

    return(droot)
}

function prepNodes(measureNodes) {
    //console.log('prepNodes', measureNodes)

    let items = []
	// loop over nodes to determine and add id, group, title, label
	for (let i = 0; i < measureNodes.length; i++) {
	    let item = {}; //console.log('measureNodes[i]', measureNodes[i])
		let _id = measureNodes[i]['@id'];
		let _segment = measureNodes[i]["foafiaf:Segment"];
		let _spoke = measureNodes[i]["foafiaf:Spoke"] || '';
		
		if (_spoke.length >1)  _spoke = _spoke[1] ;
        if (typeof _spoke == 'string' || _spoke instanceof String) _spoke = _spoke.replace('&', '') ;
		
		let _strategy = measureNodes[i]["foafiaf:Strategy"];
		let _project = measureNodes[i]["foafiaf:Project"];
		let _start = measureNodes[i]["foafiaf:startdate"] || null;
		let _end = measureNodes[i]["foafiaf:enddate"] || null;
		let _status = measureNodes[i]["foafiaf:status"] || "";
		let _color = measureNodes[i]["foafiaf:color"] || "";
		let _content = measureNodes[i]["foafiaf:shortname"] || measureNodes[i]["rdfs:label"];
		let _category = measureNodes[i]["foafiaf:categories"] || null;
		
		item.id = i;
		item.group = _spoke.substring(_spoke.indexOf(":") + 1);
		item.segment = _segment;
		item.spoke = _spoke;
		item.strategy = _strategy;
		item.project = _project;
		
		item.status = _status;
		item.color = _color;
		item.content = _content;
		
		item.title =  _category + ": " + _content + " " 
		if (_project !== "")  item.title = item.title + "\n" + "Project: " + _project ;
		if (_status !== "")  item.title =  item.title + "\n" + "Status: " + _status ;
		if (_color !== "")  item.title =  item.title + "\n" + "Color: " + _color ;
		              
		item.category = _category;
		if (item.category === 'Output') {
		   item.className = 'output'
		}
		if (item.category === 'Outcome') {
		    item.className = 'outcome'
		}
		
		item.start = _start;
		if (item.start) item.start = item.start + '-01-01' ; //console.log('item.start', item.start)
// 		item.end = _end;
// 		if (item.end) item.end = item.end + '-13-31' ;
		
		if (item.start) {
		    //console.log('item', item)
		    items.push(item)
		
		}
	}
	
	//console.log('items', items)
	return items;
        
}
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
            var _spoke = graph[i]['foafiaf:Spoke'] || '';
            
            if (_spoke.length >1)  _spoke = _spoke[1] ;
            if (typeof _spoke == 'string' || _spoke instanceof String) _spoke = _spoke.replace('&', '') ;
            
            var _priority = graph[i]['foafiaf:priority'] || null;
            
            var addNode = false;
            if ( (_dbotype === dboType) && (_type === 'skos:Concept') ) {
                
                addNode = true;
                //console.log(_dbotype, _id, addNode)
                   
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
    
        var dboType = type || "";
        // console.log('dboType', type)
        // console.log('parent_type', parent_type)
        // console.log('parent_id', parent_id)
        
        var Nodes = []
        // loop over nodes to determine and add id, group, title, label
    	for (var i = 0; i < graph.length; i++) {
    		var _id = graph[i]['@id'];
    		var _type = graph[i]['@type'];
    		var _dbotype = graph[i]['dbo:type'] || null;
            var _broader = graph[i]['skos:broader'] || null;
            var _project = graph[i]['foafiaf:Project'] || null;
            var _strategy = graph[i]['foafiaf:Strategy'] || null;
            var _spoke = graph[i]['foafiaf:Spoke'] || '';
            
            // if (_spoke.length >1)  _spoke = _spoke[1] ;
            if (typeof _spoke == 'string' || _spoke instanceof String) _spoke = _spoke.replace('&', '') ;
            
            //// if (parent_id === 'foafiaf:Spoke_FamilyNeigborhoods') console.log('parent_id _spoke', parent_id, _spoke)
            
            var _priority = graph[i]['foafiaf:priority'] || null;
            
            var addNode = false;
            if ( (_dbotype === type) && (_type === 'skos:Concept') ) {              // filter all but nodes of dbotype
                
                
                if ( (_dbotype === 'foafiaf:Measure') ) { 

                    if ( _spoke === parent_id ) {
                        addNode = true;
   
                    }
                    
                } else if (_broader === parent_id) {                                // else if broader == parent then add node
                    
                    addNode = true;
                    //console.log(_dbotype, _broader, addNode)
            
                } 
              
                // if ( addNode && _dbotype === 'foafiaf:Project' ) {                               // filter projects that are not flagged priority
                    
                //     //console.log('foafiaf:Project ptype pid', _id, parent_type, parent_id)
                    
                //     if (  (_priority === "Yes") || (_priority === "yes")  || (_priority === "YES")  ) {
                //             addNode = true;
                //             //console.log(_dbotype, parent_type, parent_id, addNode)
                //     } else {
                //         addNode = false;
                //     }
                // }
                //console.log('addNode', addNode)
                   
            } // end Concept
            
            if ( addNode ) {
                //console.log('_id ', _id)
                Nodes.push(graph[i])
            }
            
    	} // end for
    	//console.log('Nodes', Nodes)
    	return Nodes;
    }
