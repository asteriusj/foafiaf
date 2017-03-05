'use strict';
//  when the graph data upload is complete, process data
function dataReceived(data, cb) {
	console.log('dataReceived', data)
	
	let graph = data['@graph'];
		
	//var graph = data['@graph'];
	
	let rawDataSet = null;
    var xyz = buildDataSet(graph, function(err, result) {
        if (err) {
            console.log('getNodesOfType error', err);
            cb(err);
        }
        rawDataSet = result;a'use strict';
//  when the graph data upload is complete, process data
function dataReceived(data, cb) {
	console.log('dataReceived', data)
	
	let graph = data['@graph'];
		
	//var graph = data['@graph'];
	
	let rawDataSet = null;
    var xyz = buildDataSet(graph, function(err, result) {
        if (err) {
            console.log('getNodesOfType error', err);
            cb(err);
        }
        rawDataSet = result;
        
    });

	
	//console.log('rawDataSet', JSON.stringify(rawDataSet))
	console.log('rawDataSet', rawDataSet)
	if (cb) cb(rawDataSet)
	return rawDataSet
		
} // end dataReceived


function buildDataSet(graph, cb) {
	console.log('buildDataSet')

	let propNodes = false;
	//
	//  Create an array of spoke nodes
	//
    let spokeNodes = getNodes(graph, 'foafiaf:Strategy')        // while strategy contains spoke nodes
	console.log('spokeNodes', spokeNodes)
	
	const list = []
	for (let s=0; s<spokeNodes.length; s++) {
	    var _spoke = spokeNodes[s]['foafiaf:Spoke'] || null;
	    if (_spoke) _spoke = _spoke.replace('foafiaf:', '') ;
	    
	    if (!list.includes(_spoke)) list.push(_spoke)
	}
	
// let list = [
//     'Spoke_Strategy_Access_for_All',
//     'Spoke_Arts&Recreation',
//     'Spoke_Education',
//     'Spoke_EconomyJobs',
//     'Spoke_HealthyLifestyles',
//     'Spoke_UnityPrideCulture'
// ];
	  
    let myDataSets = []
  
    console.log('list', list)
    for (let i=0; i<list.length; i++) {
        let _parentid = "foafiaf:" + list[i] ;
        let _id = list[i] ;
        let _name = list[i].replace('_',' ') ;
        let measureNodes = getNodesByParent(graph, 'foafiaf:Measure', 'foafiaf:Strategy', _parentid)
        let dataset = prepNodes(measureNodes);
        
        if (dataset.length) {
            // add div with h3 tags
            var droot = setDiv(_id, _name)
            
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
    console.log('droot', droot)

    return(droot)
}

function prepNodes(measureNodes) {
    console.log('prepNodes', measureNodes)

    let items = []
	// loop over nodes to determine and add id, group, title, label
	for (let i = 0; i < measureNodes.length; i++) {
	    let item = {}; //console.log('measureNodes[i]', measureNodes[i])
		let _id = measureNodes[i]['@id'];
		let _spoke = measureNodes[i]["foafiaf:Spoke"];
		let _strategy = measureNodes[i]["foafiaf:Strategy"];
		let _start = measureNodes[i]["foafiaf:startdate"] || null;
		let _end = measureNodes[i]["foafiaf:enddate"] || null;
		let _content = measureNodes[i]["foafiaf:shortname"] || measureNodes[i]["rdfs:label"];
		let _category = measureNodes[i]["foafiaf:categories"] || null;
		
		item.id = i;
		item.group = _strategy;
		item.spoke = _spoke;
		item.strategy = _strategy;
		item.content = _content;
		item.title =  _category + ": " + _content + " " ;
		item.category = _category;
		if (item.category === 'Output') {
		  //  item.color = '27a9e1';
		  //  item.className = 'cyan';
		   //item.style = "color: #27a9e1; background-color: pink;"
		   item.className = 'output'
		}
		if (item.category === 'Outcome') {
		    //item.color = '0099b5';
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
            var _spoke = graph[i]['foafiaf:Spoke'] || null;
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
        console.log('getNodesByParent')
    
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
            var _spoke = graph[i]['foafiaf:Spoke'] || null;
            var _priority = graph[i]['foafiaf:priority'] || null;
            
            var addNode = false;
            if ( (_dbotype === type) && (_type === 'skos:Concept') ) {              // filter all but nodes of dbotype
                
                
                if ( (_dbotype === 'foafiaf:Measure') ) {                           // if Project and strategy parent
                    //console.log('_strategy parent_id',_strategy, parent_id)
                    if ( _strategy === parent_id ) {
                        //console.log('_strategy parent_id',_strategy, parent_id)
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
        
    });

	
	//console.log('rawDataSet', JSON.stringify(rawDataSet))
	console.log('rawDataSet', rawDataSet)
	if (cb) cb(rawDataSet)
	return rawDataSet
		
} // end dataReceived


function buildDataSet(graph, cb) {
	console.log('buildDataSet')

	let propNodes = false;
	//
	//  Create an array of raw nodes
	//

	
    //let measureNodes = getNodes(graph, 'foafiaf:Measure')
	  
let list = [
    'Spoke_Strategy_Access_for_All',
    'Spoke_Arts&Recreation',
    'Spoke_Education',
    'Spoke_EconomyJobs',
    'Spoke_HealthyLifestyles',
    'Spoke_UnityPrideCulture'
];
	  
    let myDataSets = []
  
    for (let i=0; i<list.length; i++) {
        let _parentid = "foafiaf:" + list[i] ;
        let measureNodes = getNodesByParent(graph, 'foafiaf:Measure', 'foafiaf:Strategy', _parentid)
        let dataset = prepNodes(measureNodes);
        myDataSets.push(dataset);
    }
      
    //console.log('measureNodes1', measureNodes1)
    
    //console.log('dataset1', JSON.stringify(dataset1))  
    // let item1 = {
    //     parentid: _parentid
    
  
    // let _parentid1 = "foafiaf:Strategy_Access_for_All";
    // let measureNodes1 = getNodesByParent(graph, 'foafiaf:Measure', 'foafiaf:Strategy', _parentid1) 
    // //console.log('measureNodes1', measureNodes1)
    // let dataset1 = prepNodes(measureNodes1);
    // //console.log('dataset1', JSON.stringify(dataset1))  
    // // let item1 = {
    // //     parentid: _parentid
    // myDataSets.push(dataset1);
    // //myDataSets[_parentid1] = dataset1;
    
    
    // let _parentid2 = "foafiaf:Spoke_Arts&Recreation";
    // let measureNodes2 = getNodesByParent(graph, 'foafiaf:Measure', 'foafiaf:Strategy', _parentid2) 
    // //console.log('measureNodes3', measureNodes2)
    // let dataset2 = prepNodes(measureNodes2);
    // //console.log('dataset2', JSON.stringify(dataset2))
    // //myDataSets[_parentid2] = dataset2;
    
    
    // let _parentid3 = "foafiaf:Spoke_Education";
    // let measureNodes3 = getNodesByParent(graph, 'foafiaf:Measure', 'foafiaf:Strategy', _parentid3) 
    // //console.log('measureNodes3', measureNodes3)
    // let dataset3 = prepNodes(measureNodes3);
    // //console.log('dataset3', JSON.stringify(dataset3))
    // //myDataSets[_parentid3] = dataset3;
    
    
    // let _parentid4 = "foafiaf:Spoke_EconomyJobs";
    // let measureNodes4 = getNodesByParent(graph, 'foafiaf:Measure', 'foafiaf:Strategy', _parentid4) 
    // //console.log('measureNodes4', measureNodes4)
    // let dataset4 = prepNodes(measureNodes4);
    // //console.log('dataset4', JSON.stringify(dataset4)) 
    // //myDataSets[_parentid4] = dataset4;
    
    
    // let _parentid5 = "foafiaf:Spoke_HealthyLifestyles";
    // let measureNodes5 = getNodesByParent(graph, 'foafiaf:Measure', 'foafiaf:Strategy', _parentid5) 
    // //console.log('measureNodes5', measureNodes5)
    // let dataset5 = prepNodes(measureNodes5);
    // //console.log('dataset5', JSON.stringify(dataset5))
    // //myDataSets[_parentid5] = dataset5;
    
        
    // let _parentid6 = "foafiaf:Spoke_UnityPrideCulture";
    // let measureNodes6 = getNodesByParent(graph, 'foafiaf:Measure', 'foafiaf:Strategy', _parentid6) 
    // //console.log('measureNodes6', measureNodes6)
    // let dataset6 = prepNodes(measureNodes6);
    // //console.log('dataset6', JSON.stringify(dataset6)) 
    // //myDataSets[_parentid6] = dataset6;
    // myDataSets.push(dataset6);
    
    
  // var items = new vis.DataSet([
  //   {id: 1, content: 'item 1', start: '2014-04-20'},
  //   {id: 2, content: 'item 2', start: '2014-04-14'},
  //   {id: 3, content: 'item 3', start: '2014-04-18'},
  //   {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
  //   {id: 5, content: 'item 5', start: '2014-04-25'},
  //   {id: 6, content: 'item 6', start: '2014-04-27', type: 'point'}
  // ]);

    //console.log('myDataSets', myDataSets)
    //console.log('myDataSets', JSON.stringify(myDataSets))
    if (cb) cb(null, myDataSets)
}

function prepNodes(measureNodes) {
    console.log('prepNodes', measureNodes)

    let items = []
	// loop over nodes to determine and add id, group, title, label
	for (let i = 0; i < measureNodes.length; i++) {
	    let item = {}; //console.log('measureNodes[i]', measureNodes[i])
		let _id = measureNodes[i]['@id'];
		let _spoke = measureNodes[i]["foafiaf:Spoke"];
		let _strategy = measureNodes[i]["foafiaf:Strategy"];
		let _start = measureNodes[i]["foafiaf:startdate"] || null;
		let _end = measureNodes[i]["foafiaf:enddate"] || null;
		let _content = measureNodes[i]["foafiaf:shortname"] || measureNodes[i]["rdfs:label"];
		let _category = measureNodes[i]["foafiaf:categories"] || null;
		
		item.id = i;
		item.group = _strategy;
		item.spoke = _spoke;
		item.strategy = _strategy;
		item.content = _content;
		item.title =  _category + ": " + _content + " " ;
		item.category = _category;
		if (item.category === 'Output') {
		  //  item.color = '27a9e1';
		  //  item.className = 'cyan';
		   //item.style = "color: #27a9e1; background-color: pink;"
		   item.className = 'output'
		}
		if (item.category === 'Outcome') {
		    //item.color = '0099b5';
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
            var _spoke = graph[i]['foafiaf:Spoke'] || null;
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
        console.log('getNodesByParent')
    
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
            var _spoke = graph[i]['foafiaf:Spoke'] || null;
            var _priority = graph[i]['foafiaf:priority'] || null;
            
            var addNode = false;
            if ( (_dbotype === type) && (_type === 'skos:Concept') ) {              // filter all but nodes of dbotype
                
                
                if ( (_dbotype === 'foafiaf:Measure') ) {                           // if Project and strategy parent
                    //console.log('_strategy parent_id',_strategy, parent_id)
                    if ( _strategy === parent_id ) {
                        //console.log('_strategy parent_id',_strategy, parent_id)
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
