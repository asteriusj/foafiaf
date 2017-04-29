<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="content-language" content="en">
  <link rel="icon" type="image/png" href="/img/favicon32.png" sizes="32x32">
  
  <title>Transform Rockford FOAFIAF Milestone Timeline Diagram</title>
  <meta name="description" content="FOAFIAF: Friend Of A Friend Is A Friend - A Rockford IL regional community network mapping capability leveraging RDF Linked Datasets for Social Graph visualization, analysis and question answering.">
  <meta name="description" content="The timeline diagram shows...">
  <meta name="author" content="Transform Rockford LLC | Asterius Media LLC">

  <!-- social graph elements -->
  <meta property="og:title" content="Transform Rockford FOAFIAF Milestone Timeline Diagram" />
  <meta property="og:type" content="website" />
  <meta property="og:description" content="Friend Of A Friend Is A Friend - A Rockford IL regional community network mapping capability leveraging RDF Linked Datasets for Social Graph visualization, analysis and question answering." />
  <meta property="og:url" content="/_template.html/" />
  <meta property="og:image" content="/favicon32.ico" />
  <meta property="og:locale" content="en_US" />
  	
  <!-- iOS optimization -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" href="/favicon32.png">
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/ico/apple-touch-icon-114-precomposed.png">
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/ico/apple-touch-icon-72-precomposed.png">
  <link rel="apple-touch-icon-precomposed" href="/ico/apple-touch-icon-57-precomposed.png">
    
  <!--[if lt IE 9]>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
  <![endif]-->
     
    <script src="../dist/vis.js"></script>
    <link href="../dist/vis-timeline-graph2d.min.css" rel="stylesheet" type="text/css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    
    <!--<script type="text/javascript" src="/js/iw.js"></script>-->
	  <script type="text/javascript" src="/js/utils.js"></script>
     
    <script type="text/javascript" src="/js/timeline.js"></script>
    <link rel="stylesheet" href="/css/timeline.css">
    
    
    
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
     
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.2/jquery.ui.touch-punch.min.js"></script>
     
    <script src="/js/smtp.js"></script>
    <script src="/js/spin.min.js"></script>

    
  <script>
  function checkCbx(id) {
        console.log('checkCbx id',id)
        //console.log('$(#id)',$("#" + id))
        var elem = $("#" + id);
        
        console.log("elem.prop('checked') before", elem.prop("checked"))
        
        elem.prop('checked', true)
        
        console.log("elem.prop('checked') after", elem.prop("checked"))
        
        elem.trigger("change");;
        
    }
    function uncheckCbx(id) {
        console.log('uncheckCbx id',id)
        //console.log('$(#id)',$("#" + id))
        var elem = $("#" + id);
        
        console.log("elem.prop('checked') before", elem.prop("checked"))
        
        elem.prop('checked', false)
        
        console.log("elem.prop('checked') after", elem.prop("checked"))
        
        elem.trigger("change")
    }
    
    function toggleClass(className, obj) {
        console.log('toggleClass className', className)
        var $input = $(obj);
        console.log("$input.prop('checked')", $input.prop('checked'))
        
        if ($input.prop('checked')) {
            $(className).display = 'block';   
            $(className).show("fast");
            console.log('show', className)
        } else {
            $(className).hide("slow");
            $(className).display = 'none';
            console.log('hide', className)
        }
    }
    
    function toggleID(id) {
        console.log('toggleID id',id)
        //console.log('$(#id)',$("#" + id))
        var elem = $("#" + id) || null;       // how 2 test if element with id exists
        console.log('elem', elem)
        
        if (elem) {
          if (elem.style.display === 'block') {
              //elem.checked = false
              elem.style.visibility="hidden";
  			      elem.style.display="none";
  			      elem.style.opacity= 0 ;
          } else {
              //elem.checked = true
              elem.style.visibility="visible";
  			      elem.style.display="block";
  			      elem.style.opacity= 100 ;
          }
        }
    }
    
  </script>
  
  <script>
    // var dataFromDocument = location.hash.replace(/#/, "");
    // alert(dataFromDocument); //alerts "dataToFrame"
    
    // function Subscribe(event, element, func) {
    //     if (element.addEventListener) {
    //         element.addEventListener(event, func, false);
    //     } else if (element.attachEvent) {
    //         element.attachEvent("on" + event, func);
    //     } else {
    //         element['on' + event] = func;
    //     }
    // }
    // function func () {
    //     alert('hi');
    // }
    // Subscribe('click', window, func);
    
    // Listening('message', window, ReceiveMessage)
    // function Listening(event, element) {
    //     if (element.addEventListener) {
    //         element.addEventListener(event, ReceiveMessage(event), false);
    //     } else if (element.attachEvent) {
    //         element.attachEvent("on" + event, ReceiveMessage(event));
    //     } else {
    //         element['on' + event] = ReceiveMessage(event);
    //     }
    // }
    // function ReceiveMessage() {    }
    
    
      window.addEventListener('message', function(event) {
        
        // IMPORTANT: Check the origin of the data!   http://www.developersite.org/102-39858-javascript
        if (~event.origin.indexOf('http://foafiaf-sidebar-asteriusj.c9users.io')) { 
            // The data has been sent from your site 
    
            // The data sent with postMessage is stored in event.data 
            console.log('okay', event.data); 
        } else { 
            // The data hasn't been sent from your site! 
            // Be careful! Do not use it.
            console.log('not', event.data); 
            //return; 
        } 
        
        var origin = event.origin || event.originalEvent.origin;
        console.log('origin', origin)
        console.log('event', event)
        //alert('', event.data.value)
        
        if (typeof event.data == 'object' && event.data.call=='sendValue') {
            // Do something with event.data.value;
            //alert(event.data.value)
        }
        if (typeof event.data == 'object' && event.data.call=='toggleID') {
            // Do something with event.data.value;
            toggleID(event.data.value, this)
            //alert(event.data.value)
        }
        if (typeof event.data == 'object' && event.data.call=='toggleClass') {
            // Do something with event.data.value;
            //alert(event.data.value)
            toggleClass(event.data.value)
        }
        if (typeof event.data == 'object' && event.data.call=='checkCbx') {
            // Do something with event.data.value;
            //alert('show', event.data.value)
            checkCbx(event.data.value)
        }
        if (typeof event.data == 'object' && event.data.call=='uncheckCbx') {
            // Do something with event.data.value;
            //alert('hide', event.data.value)
            uncheckCbx(event.data.value)
        }
      })

    
      // window.addEventListener('message', function(event) { 
  
      //     // IMPORTANT: Check the origin of the data! 
      //     if (~event.origin.indexOf('http://yoursite.com')) { 
      //         // The data has been sent from your site 
      
      //         // The data sent with postMessage is stored in event.data 
      //         console.log(event.data); 
      //     } else { 
      //         // The data hasn't been sent from your site! 
      //         // Be careful! Do not use it. 
      //         return; 
      //     } 
      // });

    
    // window.addEventListener('message', function(event) {
    //     var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
    //     if (origin !== /*the container's domain url*/)
    //         return;
    //     if (typeof event.data == 'object' && event.data.call=='sendValue') {
    //         // Do something with event.data.value;
    //     }
    // }, false);

    // function init() { window.parent.setUpFrame(); return true; }
    // function yourMethod(arg) { alert(arg) }
  </script>



</head>
<body>
    <script language="javascript" type="text/javascript">
      // control right mouse click default behavior
      document.oncontextmenu=RightMouseDown;
      document.onmousedown = mouseDown; 
      function mouseDown(e) {
          if (e.which==3) {//righClick
          //alert("Disabled - do whatever you like here..");
         }
      }
      function RightMouseDown() { return false;}
    </script>
    
    
    <div>
      <!-- PropSheet Data -->
      <div id="propsheet_data" class="content ui-widget-content">
        <div class="propsheet-content">
          <a href="Javascript:closepropsheet();"><span class="close">&times;</span></a>
          <div class="propsheet-header">
            <h2>Timeline diagram</h2>
          </div>
          <div class="propsheet-body">
            <p></p>
          </div>
          <div class="propsheet-footer">
            <h3></h3>
          </div>
        </div>
      </div>
      <div id="propsheet_data_hide">
        <a href="Javascript:closepropsheet();">
        <img src="/img/icon/1/minus.png">
        </a>
      </div>
      <div id="propsheet_data_show">
        <a href="Javascript:openpropsheet();">
        <img src="/img/icon/1/plus.png">
        </a>
      </div>
    </div>


  <h2>
    Transform Rockford Milestones Timeline
  </h2>
  <p>
    You can move and zoom the timelines.
  </p>
  
  
  <div id="visualization" style="margin-left: 50px;margin-right:50px;width:90%;"></div>
  
  
  <div id="selectors">
    
    <input type="checkbox" name="cbxspokes" id="cbxSpoke_ArtsRecreation" value="Spoke_ArtsRecreation" onchange="toggleID('Spoke_ArtsRecreation', this)" checked> ArtsRecreation
    <input type="checkbox" name="cbxspokes" id="cbxSpoke_EconomyJobs" value="Spoke_EconomyJobs" onchange="toggleID('Spoke_EconomyJobs', this)"   checked> EconomyJobs
    
    <input type="checkbox" name="cbxspokes" id="cbxSpoke_Education" onchange="toggleID('Spoke_Education', this)" checked> Education
    <input type="checkbox" name="cbxspokes" id="cbxSpoke_FamilyNeigborhoods" onchange="toggleID('Spoke_FamilyNeigborhoods', this)" checked> FamilyNeigborhoods
    
    <input type="checkbox" name="cbxspokes" id="cbxSpoke_FundingAlignment" onchange="toggleID('Spoke_FundingAlignment', this)" checked>  FundingAlignment
    <input type="checkbox" name="cbxspokes" id="cbxSpoke_HealthyLifestyles" onchange="toggleID('Spoke_HealthyLifestyles', this)" checked> HealthyLifestyles
    
    <input type="checkbox" name="cbxspokes" id="cbxSpoke_LeadershipYouth" onchange="toggleID('Spoke_LeadershipYouth', this)" checked> LeadershipYouth
    <input type="checkbox" name="cbxspokes" id="cbxSpoke_LivingtheBrand" onchange="toggleID('Spoke_LivingtheBrand', this)" checked> LivingtheBrand
    
    <input type="checkbox" name="cbxspokes" id="cbxSpoke_PhysicalInfrastructure" onchange="toggleID('Spoke_PhysicalInfrastructure', this)" checked> PhysicalInfrastructure
    <input type="checkbox" name="cbxspokes" id="cbxSpoke_Planning" onchange="toggleID('Spoke_Planning', this)" checked> Planning
  
    <input type="checkbox" name="cbxspokes" id="cbxSpoke_Quality" onchange="toggleID('Spoke_Quality', this)" checked> Quality
    <input type="checkbox" name="cbxspokes" id="cbxSpoke_UnityPrideCulture" onchange="toggleID('Spoke_UnityPrideCulture', this)" checked> UnityPrideCulture
  
  </div>
  
  <div id="categories">
    
    <input type="checkbox" name="cbxoutput" id="cbxoutput" value="output" onchange="toggleClass('.vis-item.output', this)" checked> Outputs
    <input type="checkbox" name="cbxoutcome"id="cbxoutcome" value="outcome" onchange="toggleClass('.vis-item.outcome', this)"  checked> Outcomes
    
  </div>
  
  <div id="periods">
    
    <input type="checkbox" name="cbxperiods" id="cbx2017" onchange="toggleClass('.cls2017', this)" checked> 2017
    <input type="checkbox" name="cbxperiods" id="cbx2018" onchange="toggleClass('.cls2018', this)"   checked> 2018
    <input type="checkbox" name="cbxperiods" id="cbx2019" onchange="toggleClass('.cls2019', this)" checked> 2019
    <input type="checkbox" name="cbxperiods" id="cbx2020" onchange="toggleClass('.cls2020', this)"   checked> 2020
    <input type="checkbox" name="cbxperiods" id="cbx2021" onchange="toggleClass('.cls2021', this)" checked> 2021
    <input type="checkbox" name="cbxperiods" id="cbx2022" onchange="toggleClass('.cls2022', this)"   checked> 2022
    <input type="checkbox" name="cbxperiods" id="cbx2023" onchange="toggleClass('.cls2023', this)" checked> 2023
    <input type="checkbox" name="cbxperiods" id="cbx2024" onchange="toggleClass('.cls2024', this)"   checked> 2024
    <input type="checkbox" name="cbxperiods" id="cbx2025" onchange="toggleClass('.cls2025', this)" checked> 2025
    
  </div>  
  

<script type="text/javascript">
  var datalink = null;
  //const dataURL = datalink || "../things/jsonld/combinedJSONLD.jsonld";
  const dataURL = datalink || "https://s3.amazonaws.com/transformrockford/combinedJSONLD.jsonld";
  
  function getTheData(dataURL, cb) {
    console.log('getTheData') //  retrieve graph data from jsonld file
    //var dataPromise = $.Deferred();
    console.log('dataURL -> ', dataURL)
    
    $.getJSON(dataURL, function(data) {
        console.log('getJSON')
        console.log(data)
        var treeData = data
        console.log('treeData',treeData)
        
        if (cb) cb(null, treeData )

    });

  }  
</script>

<script type="text/javascript">

      var result =  getTheData(dataURL, function(err, json) {
      
          var data = json;
          console.log('data', data)
          dataReceived(data, function(datasets) {
              console.log('datasets', datasets)
              
              /*global whenready*/
              //whenready(datasets);    
        });
  
            
      });

</script>


    <script type="text/javascript" src="/js/propsheet.js"></script>
    <link rel="stylesheet" href="/css/propsheet.css"> 
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
      ga('create', 'UA-98316611-1', 'auto');
      ga('send', 'pageview');
    
    </script>
</body>
</html>
