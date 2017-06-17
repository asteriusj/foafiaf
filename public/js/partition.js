// 'use strict';

console.log('loading partition.js ...')


var Network


    


function whenready() {
    console.log('whenready')
 
//   <script type="text/javascript">

var w = 1120,
    h = 600,
    x = d3.scale.linear().range([0, w]),
    y = d3.scale.linear().range([0, h]);

var vis = d3.select("#body").append("div")
    .attr("class", "chart")
    .style("width", w + "px")
    .style("height", h + "px")
  .append("svg:svg")
    .attr("width", w)
    .attr("height", h);

/*global d3*/
var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

//d3.json("/json/flare.json", function(root) {
//d3.json("/json/testpartition.json", function(root) {
// d3.json("/json/testpartition.1.json", function(root) {

//console.log(' call getWheelJS ')
/*global getWheelJS*/
getWheelJS( function(err, root) {
  if (err) {
    }
    
  try {
    console.log('getWheelJS root',root)
   
   
   
    var myTree = root;
	//
	// create placeholder for Next Id and fill wih query param if available
	// sets input element inside selectorContainer in HTML doc
	// useed by search.js to put result of entity search
	//
	// create placeholder for Next Id and fill wih query param if available
// 	var nextId = nextid || null ;
// 	console.log('nextId - > ', nextId)
	document.getElementById('selectorContainer').innerHTML += "<input id='nextId' type='text' value=''  style='display:none'/><br />";
	// handle id seelcted as result of a search
	document.getElementById("nextId").addEventListener("change", function(){
		var selectedId = document.getElementById('nextId').value;
	    console.log('nextId change:', selectedId);
	    gotoNode(getSelectedNode(selectedId));
		// alert('selectedId',selectedId)
	});

    //
    // take id and find node object that matches then return
    //
    function getSelectedNode(id) {
        console.log('getSelectedNode', id)
        console.log('myTree', myTree)
        
        var _node = _findInTree(id,myTree,0) || null;
        
        console.log('_node',_node)
        return _node;
    } // end getSelectedNode
    //
    // Do deep traversal of tree to find id that macthes
    //
    function _findInTree(id, _tree, lc) {
        // console.log('_findInTree',id,_tree, lc)
        
        let found = false;
        let _obj = null
            
        while (!found) {
            
            // console.log('_tree.length',_tree.length)
            for (var i in _tree) {
                // console.log('_tree[i]',_tree[i])
                
                let _node = _tree[i] || null;
                // console.log('_node',_node)
                
                if (_node.id === id) {
                        found = true;
                        _obj = _node;
                        break;
                } else {
                    // console.log('_node.children',_node.children) 
                    var _kids = _node.children || null;
                    // console.log('_kids',_kids) 
                    if (_kids) {
                        let tmp = _findInTree(id, _kids, lc+1);
                        // console.log('tmp',tmp)
                        if (tmp) {
                            found = true;
                            _obj = tmp;
                            break;
                        } else {
                            found = false;
                        }
                    }
                    found = false;
                } // end if === else
                
            } // end i in tree
            break;
        
        } // end while
        
        // console.log('_findInTree return', _obj)
        return _obj;
    } // end findInTree
    //
	// call go to function for selected node
	//
    function gotoNode(d) {
        if (d) click(d)
    } // end gotoNode
    // end next id from search plug in
       
   
   
   
   
   
    var spliced = null;
    spliced = { "name": "Top 25 by 2025", "children": root }
    console.log('spliced',spliced)
    root = spliced                                                          //insert wheel into outer parent
    // console.log('partition getWheelJSroot',JSON.stringify(root))
    
    var g = vis.selectAll("g")
          .data(partition.nodes(root))
        .enter()
        .append("svg:g")
          .attr("transform", function(d) { return "translate(" + x(d.y) + "," + y(d.x) + ")"; })
        //   .on("click", click);
          .on("click", click)
          .on("dblclick", dblclick)
          .on("contextmenu", contextmenu)
          .on("mouseover", mouseover)
          .on("mouseout", mouseout)
          .on("touch", mouseover)
          
        //  .append("title")
            // .text(function(t) { return getTitle(t)}) ;
    
    var kx = w / root.dx,
          ky = h / 1;
    
    g.append("svg:rect")
          .attr("width", root.dy * kx)
          .attr("height", function(d) { return d.dx * ky; })
          .attr("class", function(d) { return d.children ? "parent" : "child"; })
          
        //   .append("title")
        //         .text(function(t) { return getTitle(t)}) 
                
        //   .on("dblclick", function() { dblclick(t); })
        //   .on("contextmenu", function() { contextmenu(t); }) ;
    
    g.append("svg:text")
          .attr("transform", transform)
          .attr("dy", ".35em")
          .style("opacity", function(d) { return d.dx * ky > 12 ? 1 : 0; })
          .text(function(d) { return d.name; })
          
        //   .append("title")
        //         .text(function(t) { return getTitle(t)}) 
                
        //   .on("dblclick", function() { dblclick(t); })
        //   .on("contextmenu", function() { contextmenu(t); }) ;      
          
    
    d3.select(window)
          .on("click", function() { click(root); })

    
    // .onclick handler
     function click(d) {
        if (!d.children) return;
    
        console.log('onclick d', d)
        kx = (d.y ? w - 40 : w) / (1 - d.y);
        ky = h / d.dx;
        x.domain([d.y, 1]).range([d.y ? 40 : 0, w]);
        y.domain([d.x, d.x + d.dx]);
    
        if (d3.event.altKey) {                                                  // added handler for altKey for faking click for search results
            var altKey = d3.event.altKey
        } else {
            var altKey =  false
        }
        console.log('altKey',altKey)
        var t = g.transition()
            .duration(altKey ? 7500 : 750)
            .attr("transform", function(d) { return "translate(" + x(d.y) + "," + y(d.x) + ")"; });
    
        t.select("rect")
            .attr("width", d.dy * kx)
            .attr("height", function(d) { return d.dx * ky; });
    
        t.select("text")
            .attr("transform", transform)
            .style("opacity", function(d) { return d.dx * ky > 12 ? 1 : 0; });
    
        d3.event.stopPropagation();
    }
      
    // add
    // .ondblClick handler
    function dblclick(d) {
        if (!d.children) return;

        console.log('dblclick d', d)
        var msg = getDetails(d)
        //window.confirm(msg)
        document.getElementById('paneContents').innerHTML = msg
        pFloatingPane.show();
    }
    // .contextmenu handler
    function contextmenu(d) {
        if (!d.children) return;
        
        console.log('contextmenu', d)
        var msg = getDetails(d)
        //window.confirm(msg)
        var comments = window.prompt(msg, "Comments:")
        if (comments !== "Comments:") {
            console.log('comments', comments)
            sendComment(comments)
        }
    }
    // .hover handler
    function mouseover(d) {
        // if (!d.children) return;
        console.log('mouseover', d)

        var header = document.getElementsByClassName('propsheet-header');
        header[0].innerHTML = getGroup(d)
        
        var body = document.getElementsByClassName('propsheet-body');
        body[0].innerHTML = htmlPreview(d)
        
        var footer = document.getElementsByClassName('propsheet-footer');
        footer[0].innerHTML = getIdentifer(d);
        
    }
    function mouseout(d) {
        if (!d.children) return;
        console.log('mouseout', d)
        //document.getElementById('pFloatingPane').style.display = 'none'

    }
  function transform(d) {
    return "translate(8," + d.dx * ky / 2 + ")";
  }
} catch (e) {
    
}
});

    // </script>   
}
