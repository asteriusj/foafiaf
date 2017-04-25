'use strict';
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

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

//d3.json("/json/flare.json", function(root) {
//d3.json("/json/testpartition.json", function(root) {
// d3.json("/json/testpartition.1.json", function(root) {

//console.log(' call getWheelJS ')
getWheelJS( function(err, root) {
    
    console.log('getWheelJS root',root)
    let spliced = { "name": "Top 25 by 2025", "children": root }
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
    
        var t = g.transition()
            .duration(d3.event.altKey ? 7500 : 750)
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
        let msg = getDetails(d)
        //window.confirm(msg)
        document.getElementById('paneContents').innerHTML = msg
        pFloatingPane.show();
    }
    // .contextmenu handler
    function contextmenu(d) {
        if (!d.children) return;
        
        console.log('contextmenu', d)
        let msg = getDetails(d)
        //window.confirm(msg)
        let comments = window.prompt(msg, "Comments:")
        if (comments !== "Comments:") {
            console.log('comments', comments)
            sendComment(comments)
        }
    }
    // .hover handler
    function mouseover(d) {
        if (!d.children) return;
        console.log('mouseover', d)
        //   d.dx
        //   d.dy
        // var panel = document.getElementById('pFloatingPanel');
        var header = document.getElementsByClassName('propsheet-header');
        header[0].innerHTML = getGroup(d)
        var body = document.getElementsByClassName('propsheet-body');
        body[0].innerHTML = getDetails(d)
        
        // $("#panel_data").html(getDetails(d))
        // $("#panel_data").html('<iframe src="' + panurl + "id=" + a + "&type=" + b + "&param=" + c + '" frameborder=0 height="100%" width="100%" scrolling=' + d + " id=frdata>Loading...</iframe>");

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
});

    // </script>   
}
