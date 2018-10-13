/**
 * Semantic Graph Internal Relationship link resolver
 * Copyright 2018, Asterius Media LLC, All Rights Reserved.
 */
 'use strict';
function dtstamp() {
    let d = new Date();
    let dt  = new Date().getTime();
    return dt;
} 
let LD = {};

function dtstamp() {
    let d = new Date();
    let dt  = new Date().getTime();
    return dt;
}
function resolveLinkedData(_ld, cb) {
    try {
        console.log(dtstamp(),'starting resolveLinkedData')
        
        let LD = _ld;
        console.log('intial LD:',LD)
        let newGraph = [];
          
        let graph = LD["@graph"]
        for (let z = 0; z < graph.length; z++) {
    	    let node = graph[z]
            // console.log('z node',z,node)
            
            let _id = node['@id'];    
            
            if ( (_id != "./") && (_id != "") ) {
    
                let newNode = node ;
                // let newNode = prepNewNode(node) ;
                // console.log('returned newNode:',newNode)
                
                if (newNode != null) {
                  
                  var childIds = getChildren(graph, node)
                  if (childIds.length>0) {
                      // console.log('childIds',childIds)
                      newNode.children = childIds ;
                    
                      if (node["skos:narrower"] == ""){
                          node["skos:narrower"] = childIds ;
                      } else{
                          //
                          //process each and push
                          //
                      }
                  }
                  
                  var parentIds = getParents(graph, node)
                  if (parentIds.length>0) {
                    // console.log('node parentIds',node,parentIds)
                    newNode.parents = parentIds;
                    
                    if (node["skos:broader"] == ""){
                          node["skos:broader"] = parentIds ;
                      } else{
                          //
                          //process each and push
                          //
                      }
                  }
                  
                  
                    
                
                //   console.log('newNode',newNode)
                  newGraph.push(newNode)
                  
                } // end if !null
    
            
            } // end if _id
        } // end for  
              
        console.log('newGraph:',newGraph)  
        
        //
        // using new trimmed graph loop over nodes and links within to
        // test linkabilty and remove link with bad url or non-graph element
        //            
        
        for (let g = 0; g < graph.length; g++) {
    	    let node = graph[g]
    	    
            //test skos:broader
            let inscheme = node["skos:inScheme"] ;
            let n_inscheme = []
            if (Array.isArray(inscheme)) {
                for (let s=0; s<inscheme.length; s++) {
                    let link = inscheme[s];
                    if (testLinkability(newGraph,link)) {
                        n_inscheme.push(link) ;
                    }
                 } // end for s
            } else {
                if (testLinkability(newGraph,inscheme)) n_inscheme.push(inscheme) ;
            }    
            node["skos:inScheme"] = n_inscheme ;
        
            //test skos:broader
            let broader = node["skos:broader"] ;
            let n_broader = []
            if (Array.isArray(broader)) {
                for (let b=0; b<broader.length; b++) {
                    let link = broader[b];
                    if (testLinkability(newGraph,link)) {
                        n_broader.push(link) ;
                    }
                } // end for b
            } else {
                if (testLinkability(newGraph,broader)) n_broader.push(broader) ;
            }
            node["skos:broader"] = n_broader ;
        
        } // edn for g
        
        
        
        
        
        
        LD["@graph"] = newGraph ;
        console.log('completed LD:',LD)
        if (cb) cb(LD)
  	    return LD
  	    
    } catch (e) {
        console.error(dtstamp(),'resolveLinkedData error',e)
      	
    } finally {

        console.log(dtstamp(),'ending resolveLinkedData')
        
      	
    } // end try catch    
} //end resolveLinkedData

//
// get child nodes of node and add ids to group
//
function getChildren(graph, node) {
    // console.log('getChildren')
    // console.log('getChildren of node',node)
    
    let parent_id = node.id || node['@id'];
    // if (parent_id === "foafiaf:Mission_Value_0") console.log('getChildren node',node)
    
    let childNodeIds = [];
    
    // if parant of...
    let childids1 = getChildNodeIds(node) ;
    // console.log('childids1',childids1)
    for (let x=0; x<childids1.length; x++) {
        if (childids1[x] != null) {
            if (!childNodeIds.includes(childids1[x])) {
                childNodeIds.push(childids1[x]);
            }  
        }
    }
    
    // if child of...
    let childids2 = getNodesByParentId(graph, parent_id) ;
    // console.log('childids2',childids2)
    for (let y=0; y<childids2.length; y++) {
        if (childids2[y] != null) {
            if (!childNodeIds.includes(childids2[y])) {
                childNodeIds.push(childids2[y]);
            }  
        }
    }
    
    // console.log(' childNodeIds', childNodeIds)
    // if (parent_id === "foafiaf:Scorecard_Adjacency") console.log('getChildren childNodeIds',childNodeIds)
    
    return childNodeIds
} // end getChildren



// get array of ids for child nodes of node
function getChildNodeIds(node) {        // get nodes are childeren if not narrower
    // console.log('getChildNodeIds')
    // console.log('getChildNodeIds',node)

    let NodeIds = []
    
    let parent_id = node.id || node['@id'];
    
    let _narrower = node.narrower || node['skos:narrower'] || null;
     
    // if narrower add appropriate ids
    if (_narrower != null)  {
        
        if ( (typeof _narrower) === 'string') {	
            let _nn = _narrower ;
            // console.log('_nn', _nn)
            NodeIds.push(_nn) ;
            
        } else {
            // console.log('_narrower.length',_narrower.length)
            for (let n = 0; n < _narrower.length; n++) {
                let _nn = _narrower[n]
                // console.log('_nn', _nn)
                NodeIds.push(_nn) ;
            }
        }
    } // end if _narrow

    // console.log('getChildNodeIds child NodeIds', NodeIds)
    return NodeIds;
} // end getChildNodeIds


function getParents(graph, node) {
    // console.log('getParents')
    let node_id = node.id || node['@id'];

    let parentNodeIds = [];

    let parentIds1 = getParentNodeIds(graph,node_id) ;
    // console.log('parentIds1',parentIds1)
    for (let x=0; x<parentIds1.length; x++) {
        if (parentIds1[x] != null) {
            if (!parentNodeIds.includes(parentIds1[x])) {
                parentNodeIds.push(parentIds1[x]);
            }  
        }
    }
    
    // if (parentNodeIds.length>0) console.log('node_id parentIds',node_id,parentNodeIds)
    return parentNodeIds
} // end getParents


function getNodesByParentId(graph, parent_id) {        // get nodes that have parent of parent_id  then add supports, predeccesor .... if not broader
    // console.log('getNodesByParentId')
    // console.log('getNodesByParentId', parent_id)
    
    // let listParentElements = ["skos:inScheme", "skos:broader"];         // so create list of child determinations and/or parent determinations?
    
    //let dboType = type || "";
    //console.log('dboType', type)
    //console.log('parent_id', parent_id)
    
    let NodeIds = []
    // loop over nodes to determine if parent_id is parent and add id, group, title, label
	  for (let i = 0; i < graph.length; i++) {
	      let node = graph[i]
  		  let _id = graph[i]['@id'];
  		// let _type = graph[i]['@type'];
  		// let _dbotype = graph[i]['dbo:type'] || null;
  		
  		    // let _scheme = graph[i]['skos:inScheme'] || null;
          let _broader = graph[i]['skos:broader'] || null;
          let _monitors = graph[i]['foafiaf:monitors'] || node['foafiaf:Monitors'] || null;
        //   let _supports = graph[i]['foafiaf:supports'] || node['foafiaf:Supports'] || null;
        //   let _predecessor = graph[i]['tmo:PredecessorDependency'] || null;
          // let _seccessor = graph[i]['tmo:SuccessorDependency'] || null;
          
          // let _scorecard = graph[i]['foafiaf:Scorecard'] || null;
          // let _measure = graph[i]['foafiaf:Measure'] || null;
          // let _project = graph[i]['foafiaf:Project'] || null;
          // let _strategy = graph[i]['foafiaf:Strategy'] || null;
          // let _spoke = graph[i]['foafiaf:Spoke'] || null;
          // let _segment = graph[i]['foafiaf:Segment'] || null;
          let _parent = graph[i]['foafiaf:Parent'] || null;
          let _parents = graph[i]['foafiaf:Parents'] || null;
          
          
          let addNode = false;
          
          if ( !(_id === parent_id) ) {              // filter our self as parent
              
              if (_parent === parent_id) {                                       // else if broader == parent then add node as a childe
                  addNode = true;
                  //console.log(_dbotype, _scheme, addNode)
              }
              
              if (_parents != null)  {
                  // console.log('_parents.length',_parents.length)
                  for (let n = 0; n < _parents.length; n++) {
                      let _nn = _parents[n]
                      console.log('_nn', _nn)
                      if ( _nn === parent_id ) {
                          addNode = true;
                      }
                  }
                  
              } // end if _parents
              
              if (_broader === parent_id) {                                       // else if broader == parent then add node as a childe
                  addNode = true;
                  //console.log(_dbotype, _broader, addNode)
              }
              if (_monitors === parent_id) {                                       // else if broader == parent then add node as a childe
                  addNode = true;
                  //console.log(_dbotype, _broader, addNode)
              }
            //   if (_supports === parent_id) {                                       // else if broader == parent then add node as a childe
            //       addNode = true;
            //       //console.log(_dbotype, _broader, addNode)
            //   }
              
              
            
          } // end if self
          
          if ( addNode ) {
              // console.log('_id ', _id)
              NodeIds.push(_id)
          }
          
  } // end for

  return NodeIds;
	
} // end getNodesByParentId	


function getParentNodeIds(graph, node_id) {        // get node ids that are parents of node
    // console.log('getParentNodeIds')
    // console.log('getParentNodeIds', node_id)
    
    let NodeIds = [] ;
    
    // loop over nodes to determine parent and and add ids
  	for (let i = 0; i < graph.length; i++) {
    		let _id = graph[i]['@id'];
    		
        
        let _broader = graph[i]['skos:broader'] || null;
          
        let _parent = graph[i]['foafiaf:Parent'] || null;
        let _parents = graph[i]['foafiaf:Parents'] || null;
          
        if ( (_id === node_id) ) {              // filter on node_id node
          
              // if (_id === "foafiaf:Scorecard_Strong_Economy") console.log('getParentNodeIds node_id graph[i]',node_id,graph[i])

              // NodeIds.push(_scheme) ;
              // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _scheme',_id,_scheme)
              
              NodeIds.push(_parent) ;
              // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _parent',_id,_parent)
              
              if (_parents != null)  {
                  if ( (typeof _parents) === 'string') {	
                          NodeIds.push(_parents) ;
                          // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _parents',_id,_parents)
                  } else {
                      // console.log('_parents.length',_parents.length)
                      for (let n = 0; n < _parents.length; n++) {
                          NodeIds.push(_parents[n]) ;
                          // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _parents[n]',_id,_parents[n])
                      }
                  }
              } // end if _parents
              
              
              if (_broader != null)  {
                  if ( (typeof _broader) === 'string') {	
                          NodeIds.push(_broader) ;
                          // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _broader',_id,_broader)
                  } else {
                      // console.log('_broader.length',_broader.length)
                      for (let n = 0; n < _broader.length; n++) {
                          NodeIds.push(_broader[n]) ;
                          // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _broader[n]',_id,_broader[n])
                      }
                  }
              } // end if _parents
              
              
             

          } // end if self

  	} // end for
	
	return NodeIds;
	
} // end getParentNodeIds

   
function getNodeById(_nodes, _id) {
// 	console.log('start getNodeById', _id)
	try {
		var theNode = null;
		
		var obj = _nodes;
		var targetProp = 'id'
		var targetValue = _id
		var finalResults = [];
		var result = findFirstObject(obj, targetProp, targetValue, finalResults)
// 		var result = findObjects(myObject, 'id', '2', finalResults);
// 		console.log('findFirstObject finalResults:',finalResults)

		theNode = finalResults[0] || null ;
		
// 		console.log('theNode',theNode)
		return theNode

	}
	catch(e) {
	    console.error(Math.floor(Date.now() / 1000), e)
	} 
	finally {
		// finally
// 		console.log('finally getNodeById theNode',theNode)
		return theNode;
	}
}

function findFirstObject(obj, targetProp, targetValue, finalResults) {
  // https://jsfiddle.net/alexQch/5u6q2ybc/
  function getObject(theObject) {
    let result = null;
    if (theObject instanceof Array) {
      for (let i = 0; i < theObject.length; i++) {
        getObject(theObject[i]);
      }
    }
    else {
      for (let prop in theObject) {
        if(theObject.hasOwnProperty(prop)){
        //   console.log(prop + ': ' + theObject[prop]);
          if (prop === targetProp) {
            // console.log('--found id');
            if (theObject[prop] === targetValue) {
            //   console.log('----found porop', prop, ', ', theObject[prop]);
              finalResults.push(theObject);
              
              // return after first find... a change from original
              return theObject
              
            }
          }
          if (theObject[prop] instanceof Object || theObject[prop] instanceof Array){
            getObject(theObject[prop]);
          }
        }
      }
    }
  }

  getObject(obj);

}
function testLinkability(_nodes, link) {
// 	console.log('start testLinkability', link)
	try {
		var isLinkable = true;
		let id = getNodeById(_nodes,link)
		if ( id === null) {
		    isLinkable = false ;
		} else if ( id ) {
		    isLinkable = true ;
		}
	}
	catch(e) {
	    console.error(Math.floor(Date.now() / 1000),'testLinkability e:', e)
	} 
	finally {
		// finally
// 		console.log('finally testLinkability theNode',theNode)
		return isLinkable;
	}
} // end testLinkability
		
		
		
