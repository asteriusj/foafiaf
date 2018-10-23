console.log('loading scorecard.js... ')


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
      diameter: "90%",
      centerx: "50%",
      centery: "55%",
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
      // onGroupClick: function(info) {
      //   console.log('    circles onGroupClick info:',info)
      //   console.log("Click.");
      // }, 
      // onGroupDoubleClick: function(info) {
      //   console.log('    circles onGroupDoubleClick info:',info)
      //   console.log("Dbl Click.");
      // },
      // onGroupDoubleClick: function(info) {
      //   var state = info.group.selected ? true : false;
      //   this.set("selection", {
      //     groups: [info.group.id],
      //     selected: !state
      //   });
      //   console.log((state ? "Deselected" : "Selected") + " group " + info.group.id);
      // },
      
      
    //   dataObject: {}

    });
    console.log('VAR circles:',circles)
    
    circles.set({dataObject: {groups: [
      {}, {label: "loading..." }, {},
      {}, {label: "Please wait" }, {}
    ]}});
    
    circles.set({
          // titleBar: "topbottom",
          titleBar: "inscribed",
          // titleBarBackgroundColor: "rgba(0,0,0,.3)",
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
        event.preventDefault();
    //     let group = info.group;
    //     setGroupDetails(group) 
    //     myPopupOpen(group)
    });
    
    circles.set("onGroupDoubleClick", function(info) {
        console.log("onGroupDoubleClick.", info );
        var state = info.group.selected ? true : false;
        this.set("selection", {
          groups: [info.group.id],
          selected: !state
        });
        console.log((state ? "Deselected" : "Selected") + " group " + info.group.id);
      
        event.preventDefault();
        let group = info.group;
        setGroupDetails(group) 
        myPopupOpen(group)
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
                
                //
                //
                myPopupClose()
                
                
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
            
            
            
            
            
            
            
        
      
    });



    installResizeHandlerFor(circles, 0);
}
embed();


