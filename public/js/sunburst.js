'use strict';
function whenready() {
    console.log('whenready')
    
       
    var color = d3.scale.category20c();
    //console.log('color', color)

        
    function t(n, e) {
        //console.log('t')
        return n === e ? !0 : n.children ? n.children.some(function(n) {
            return t(n, e)
        }) : !1
    }

    function n(t) {
        //console.log('n')
        if (t.children) {
            var e = t.children.map(n),
                r = d3.hsl(e[0]),
                a = d3.hsl(e[1]);
            return d3.hsl((r.h + a.h) / 2, 1.2 * r.s, r.l / 1.2)
        }
        //return t.colour || "#fff"
        return getColor(d)
        //return color((t.children ? t : d.parent))
    }

    function e(t) {
        //console.log('e')
        var n = r(t),
            e = d3.interpolate(d.domain(), [t.x, t.x + t.dx]),
            a = d3.interpolate(u.domain(), [t.y, n]),
            i = d3.interpolate(u.range(), [t.y ? 20 : 0, o]);
        return function(t) {
            return function(n) {
                return d.domain(e(n)), u.domain(a(n)).range(i(n)), x(t)
            }
        }
    }

    function r(t) {
        //console.log('r')
        return t.children ? Math.max.apply(Math, t.children.map(r)) : t.y + t.dy
    }

    function a(t) {
        //console.log('a')
        return .299 * t.r + .587 * t.g + .114 * t.b
    }
    
    
    
    var i = 680,    // size?? was 840
        l = i,
        o = i / 2,
        d = d3.scale.linear().range([0, 2 * Math.PI]),
        u = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, o]),
        c = 5,
        s = 1e3,
        //h = d3.select("#vis");
        h = d3.select("#sunburst1");
        
    h.select("img").remove();
    
    var f = h.append("svg")
            .attr("width", i + 2 * c)
            .attr("height", l + 2 * c)
            .append("g")
            .attr("transform", "translate(" + [o + c, o + c] + ")");
        h.append("p")
            .attr("id", "intro")
            .text("Click to zoom!");
    
    var p = d3.layout.partition().sort(null).value(function(t) {
            return 5.8 - t.depth
        }),
        x = d3.svg.arc().startAngle(function(t) {
            return Math.max(0, Math.min(2 * Math.PI, d(t.x)))
        }).endAngle(function(t) {
            return Math.max(0, Math.min(2 * Math.PI, d(t.x + t.dx)))
        }).innerRadius(function(t) {
            return Math.max(0, t.y ? u(t.y) : t.y)
        }).outerRadius(function(t) {
            return Math.max(0, u(t.y + t.dy))
        });
    
    
    //console.log(' call getWheelJS ')
    //d3.json("../json/projectwheel.json", function(r, i) {
    getWheelJS( function(r, i) {
        if (r) return console.warn(r);
        console.log(' got getWheelJS ', i)
        
        // l is used to handle click event       // on click update and transform
        // .onclick handler
        function l(n) {
            console.log('l handles click event', n)
            h.transition().duration(s).attrTween("d", e(n)), m.style("visibility", function(e) {    // attrTween
                //return t(n, e) ? null : d3.select(this).style("visibility")
                return d3.select(this).style("visibility")
            }).transition().duration(s).attrTween("text-anchor", function(t) {                      // attrTween
                return function() {
                    return d(t.x + t.dx / 2) > Math.PI ? "end" : "start"
                }
            }).attrTween("transform", function(t) {                                                 // attrTween
                var n = (t.name || "").split(" ").length > 1;
                return function() {
                    var e = 180 * d(t.x + t.dx / 2) / Math.PI - 90,
                        r = e + (n ? -.5 : 0);
                    return "rotate(" + r + ")translate(" + (u(t.y) + c) + ")rotate(" + (e > 90 ? -180 : 0) + ")"
                }
            }).style("fill-opacity", function(e) {
                                                                                console.log('"fill-opacity" t(n, e) ', t(n, e) )
                return t(n, e) ? 1 : 1e-6
            }).each("end", function(e) {                        console.log('e', e)
                                                                console.log('end d3.select "visibility" t(n, e) ', t(n, e) )
                                                                
                d3.select(this).style("visibility", t(n, e) ? null : "hidden")
            })
        } 
        // .ondblClick handler
        function dblclick(d) {
            console.log('dblclick', d)
            let msg = getDetails(d)
              window.confirm(msg)
        }
        // .contextmenu handler
        function contextmenu(d) {
              console.log('contextmenu', d)
              let msg = getDetails(d)
              //window.confirm(msg)
              let comments = window.prompt(msg, "Comments:")
              if (comments !== "Comments:") {
                console.log('comments', comments)
                sendComment(comments)
              }
        }
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
        
        var o = p.nodes({
                children: i
            }),
            h = f.selectAll("path").data(o);
        h.enter()
            .append("path")
            .attr("id", function(t, n) {            console.log('t', t) 
                return "path-" + n
            })
            .attr("d", x)

            .attr("class", function(t) { return getClass(t) })
            
            // .style("fill", n)
            .style("fill", function(t) { return getColor(t) })
    
            .on("click", l)                                             // on click update and transform
             
            
        .append("title")
            .text(function(t) { return getTitle(t)}) ;

        
        
        var m = f.selectAll("text").data(o)
        
        var y = m.enter().append("text")
        
            .attr("class", function(t) { return getClass(t) })
            
            .style("fill-opacity", 1)
            .style("fill", function(t) {
                //return a(d3.rgb(n(t))) < 125 ? "#eee" : "#000"
                return "#000"
            })
            .attr("text-anchor", function(t) {
                return d(t.x + t.dx / 2) > Math.PI ? "end" : "start"
            })
            .attr("dy", ".2em").attr("transform", function(t) {
                    //console.log('t.name', t.name)
                var n = (t.name || "").split(" ").length > 1,
                    e = 180 * d(t.x + t.dx / 2) / Math.PI - 90,
                    r = e + (n ? -.5 : 0);
                return "rotate(" + r + ")translate(" + (u(t.y) + c) + ")rotate(" + (e > 90 ? -180 : 0) + ")"
            })
            .on("click", l)                                                  // on click update and transform
            .on("dblclick", dblclick)
            .on("mouseover", mouseover)
            .on("contextmenu", contextmenu);
            
        y.append("title")
                .text(function(t) { return getTitle(t)}) ;
        
        y.append("tspan")
            .attr("x", 0)
            .text(function(t) { 
                return t.depth ? t.name.split(" ")[0] : ""
            }), 
        y.append("tspan")
            .attr("x", 0)
            .attr("dy", "1em")
            .text(function(t) {
                return t.depth ? t.name.split(" ")[1] || "" : ""
            })
    })
        

    // determin color of thing by ordinal scale per .name
    function getColor(d) {
        let idx = d.children                                // eval if children
        ? d                                                 // if true return  current thing
        : d.parent                                          // if false return parent of thing
        idx = idx.name ;                                    // set idx to name of thing idx
        
        let col = color(idx) ;
        
        if (d.color) col = d.color;
        //console.log('idx col', idx, col)
        
        return col;
    }
    
    // 
    function getClass(d) {
        //console.log('getClass', d)
        let cls = 'cls' + d.group || '_' ;
        //console.log('getClass', cls)
        
        return cls;
    }
    
    function updateAfterChange(cls){
        l();
        
        
        
        
    }
 // see utils.js for formated t functions
    
}; // end whenready
