'use strict';
//  when the graph data upload is complete, process data
function dataReceived(data, cb) {
	console.log('dataReceived')
	
	//var graph = data['@graph'];
    let rawDataSet = buildDataSet(data)
	
	console.log('rawDataSet', JSON.stringify(rawDataSet))
	if (cb) cb(rawDataSet)
	return rawDataSet
		
} // end dataReceived


function buildDataSet(data) {
	console.log('buildDataSet')

	let propNodes = false;
	//
	//  Create an array of raw nodes
	//
	let graph = data['@graph'];
	
	let measureNodes = getNodes(graph, 'foafiaf:Measure')
	
	
  // var items = new vis.DataSet([
  //   {id: 1, content: 'item 1', start: '2014-04-20'},
  //   {id: 2, content: 'item 2', start: '2014-04-14'},
  //   {id: 3, content: 'item 3', start: '2014-04-18'},
  //   {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
  //   {id: 5, content: 'item 5', start: '2014-04-25'},
  //   {id: 6, content: 'item 6', start: '2014-04-27', type: 'point'}
  // ]);
  
    let items = []
	// loop over nodes to determine and add id, group, title, label
	for (let i = 0; i < measureNodes.length; i++) {
	    let item = {};
		let _id = measureNodes[i]['@id'];
		let _start = measureNodes[i]["foafiaf:startdate"] || null;
		let _end = measureNodes[i]["foafiaf:enddate"] || null;
		let _content = measureNodes[i]["foafiaf:shortname"] || measureNodes[i]["rdfs:label"];
		
		item.id = i;
		item.content = _content;
		item.start = _start;
		if (item.start) item.start = item.start + '-01-01' ; 
// 		item.end = _end;
// 		if (item.end) item.end = item.end + '-13-31' ;
		
		if (item.start) {
		    
		    items.push(item)
		
		}
	}
	
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
    
