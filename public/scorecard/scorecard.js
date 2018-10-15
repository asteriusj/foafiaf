console.log('loading scorecard.js... ')

// Each group can contain the following properties:

// id
// (optional, String) unique identifier of the group. Group identifiers are required only for programmatic changes of certain group attributes such as selection, zoom state or open state.
// label
// (required, String) textual description of the group. For best results, use short labels. groupLabelDecorator callback can also be used to modify labels before they are drawn on the visualization when the model is retrieved from a source that cannot be altered.
// weight
// (optional, Number >= 0) weight of the group relative to other groups. The larger the weight, the more space the group's polygon will occupy on the screen. Good values for the weight property could be e.g. the number of documents in a cluster or the score of the cluster.

// Group weights must be non-negative. Zero-weight groups can receive special treatment, see the showZeroWeightGroups option.

// If a group's weight is not specified, Circles will assume the weight is 1.0.

// groups
// (optional, Array) an array of subgroups of the group.
// open
// (optional, boolean) if true, all of this group's subgroups will be shown initially. By default a maximum of visibleGroupCount subgroups is shown and then the user needs to click on an expander symbol to open up a group.
// zoomed
// (optional, boolean) if true, the group is in zoomed state by default. Zoomed groups take proportionally larger amount of space of the parent group's circle slice (see zoomedFraction parameter).
// selected
// (optional, boolean) if true, the group will be initially in selected state. This can be useful to visually highlight a certain group (or groups) as the model is loaded.

function embed() {
    // We respin until the visualization container has non-zero area (there are race 
    // conditions on Chrome which permit that) and the visualization class is loaded.
    var container = document.getElementById("visualization");
    if (container.clientWidth <= 0 || container.clientHeight <= 0 || !window["CarrotSearchCircles"]) {
      window.setTimeout(embed, 250);
      return;
    }

    // Use the defaults for all parameters.
    
    var circles = new CarrotSearchCircles({
      id: "visualization",
      captureMouseEvents: false,
      pixelRatio: Math.min(1.5, window.devicePixelRatio || 1),
      visibleGroupCount: 0,
      onBeforeSelection: function(info) { 
        console.log('    circles onBeforeSelection info:',info)
        this.set("zoom", {
          groups: [info.group.id],
          zoomed: !info.group.zoomed
        });
        return false;
      },
      onBeforeZoom: function(info) {
        console.log('    circles onBeforeZoom info:',info)
        this.set("selection", {
          groups:   [info.group.id],
          selected: !info.group.selected
        });
        return false;
      },
      onGroupClick: function(info) {
        console.log('    circles onGroupClick info:',info)
        console.log("Click.");
      }, 
      onGroupDoubleClick: function(info) {
        console.log('    circles onGroupDoubleClick info:',info)
        console.log("Dbl Click.");
      },
      
      
    //   dataObject: {}

    });
    console.log('VAR circles:',circles)
    
    circles.set({dataObject: {groups: [
      {}, {label: "loading..." }, {},
      {}, {label: "Please wait" }, {}
    ]}});
    
    circles.set({
          titleBar: "inscribed",
//           titleBarBackgroundColor: "rgba(0,0,0,.3)",
          titleBarTextColor: "#000",
          titleBarTextPaddingTopBottom: 30,
          titleBarMaxFontSize: 40,
          titleBarLabelDecorator: function(attrs) {
            if (attrs.hoverGroup) {
              // If we're hovering over a group, display the full title instead
              // of just the label shown in the circle.
              attrs.label = attrs.hoverGroup.full;
              // attrs.label = attrs.hoverGroup.title;  // editd JAS to use title
            }
          }
    });
    
    circles.set("onGroupHover", function(hover) {
        console.log("onGroupHover.", hover.group );
        
    //   console.log("onGroupHover.", hover.group ? hover.group.label : "(none)");
    
        // popupDetails(hover.group)    
        
    });
    
    circles.set("onGroupClick", function(info) {
        console.log("onGroupClick.", info );
        let group = info.group;
        
    });
    
    circles.set("onGroupDoubleClick", function(info) {
        console.log("onGroupDoubleClick.", info );
        let group = info.group;
        console.log('circles.get():',circles.get())
    });
    

    // COMMENT OUT DATA FILE FOr teSTING
    fetch('../things/jsonld/_Indicator_.jsonld')
        .then(function (response) {
            
          return response.json();
        })
        .then(function (data) {
            console.log('data',data);
          
            console.log('transforing Groups from data:',data)
            
            var groups = transformGroups(data,"", function(transformed) {
                
                let d = new Date();
              	let returned  = new Date().getTime();
              	console.log('returned',returned)
              	
              	console.log('transformed:',transformed)
              	
              	var groups = transformed.groups;
              	
                console.log('transformed Groups:',groups)
                
                
                var _dataObject = {}
                _dataObject.open =true
                _dataObject.groups = groups
                circles.set("dataObject", _dataObject); 
                
                var customAttributes = function(opts, params, vars) {
                  // console.log("    fetch Color decorator callback.", params, vars);
                  vars.groupColor = params.group.gcolor;
                  vars.labelColor = "auto";
                };
                
                circles.set({
                    groupColorDecorator: customAttributes,
                }); 
            
              
            })
            
            
            
            
            
            
            
            
    //         circles.set({
    //           titleBar: "topbottom",
    //           titleBarBackgroundColor: "rgba(0,0,0,.2)",
    //           titleBarTextColor: "#fff",
    //           titleBarTextPaddingTopBottom: 10,
              
    //           // groupHoverOutlineColor: "#f00",
    //           // groupHoverOutlineWidth: 3,
    //           // groupHoverColor: "rgba(0,0,255,0.5)",
    //           // groupHoverHierarchy: true,
              
    //           // onGroupClick: function(info) {
    //           // // Zoom on single click.
    //           // console.log('info',info)
    //           // this.set("zoom", {
    //           //     groups: [info.group.id],
    //           //     zoomed: !info.group.zoomed
    //           //   });
    //           // },
            
    //           groupColorDecorator: customAttributes,
    //           dataObject: {
    //             groups
    //           }
    //         });
        
        
             
        
      
    });



    installResizeHandlerFor(circles, 0);
}
embed();



