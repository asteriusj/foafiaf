/**
 * @fileOverview An Strategy Map model.
 * @name Strategy#Map
 *
 * Example model:
 * 
 * var sample = {"kind":"strategy#map","typeOf":"Strategy Map","etag":"","uid":"","id":"","keywords":"","categories":"","title":"","summary":"","owner":"","published":false,"themes":[],"persepctives":[{"kind":"strategy#perspective","typeOf":"Perspective","uid":"ea2ea8b7-1d56-4f22-b27a-7a209937f49e","name":"Financial","shortname":"Financial"},{"kind":"strategy#perspective","typeOf":"Perspective","uid":"600f01c0-b5f3-4a27-a796-cbcdbdd90a74","name":"Customer Perspective","shortname":"Customer"},{"kind":"strategy#perspective","typeOf":"Internal Business Processes","uid":"e670a079-9509-45fe-8282-d8ab4ac433ef","name":"Financial","shortname":"Internal Processes"},{"kind":"strategy#perspective","typeOf":"Perspective","uid":"32df0f5b-6929-4d90-9b22-02cf1c1ba647","name":"Learning & Growth","shortname":"Learning and Growth"}],"maps":[],"scorecards":[],"measures":[],"objectives":[],"initiatives":[],"tasks":[],"userdefinedfields":[{"name":"version","value":"initial creation"}],"attacheddocuments":[],"shortname":""}
 *
 *
 * @constructor
 */
// ============================================================================
// Strategy Map Main Module
// ============================================================================
function StrategyMapModel(args) {
    var SELF = this;
    var crypto = require('crypto');
    var shasum = crypto.createHash('sha1');
    
    // init
    (function ()
    {
        if (args)
        {
            SELF.kind = args.kind || 'strategy#map';
            SELF.typeOf = args.typeOf || 'Strategy Map';
            SELF.id = args.id;
            SELF.guid = SELF.typeOf + '::' + args.id ;
            SELF.link = args.link || null;
            SELF.title = args.title;
            SELF.summary = args.summary || null;
            SELF.description = args.description || null;
            SELF.content = args.content || null;
            SELF.status = args.status || null;
            
            SELF.objectives = args.objective || null;
            SELF.measures = args.measure || null;
            //SELF.targets = args.target || null;
            SELF.initiatives = args.initiative || null;
            SELF.tasks = args.theme || null;

            SELF.perspectives = args.perspective || null;
            SELF.themes = args.theme || null;
            SELF.prefixes = args.theme || null;
                        
            SELF.keywords = args.keywords || null
            SELF.categories = args.categories || null;

            SELF.created = args.created || String( new Date() );
            SELF.updated = args.updated || String( new Date() );
            SELF.source = args.source || null
        }
        
        var checkOn = {
            kind : SELF.kind ,
            typeOf : SELF.typeOf ,
            id : SELF.id ,
            guid : SELF.guid ,
            link : SELF.link ,
            title : SELF.title ,
            summary : SELF.summary ,
            description : SELF.description ,
            content : SELF.content ,
        }
        //console.log('checkOn', checkOn);
        var jsonCheckOn = JSON.stringify(checkOn);
        //console.log('json', jsonCheckOn)
        shasum.update(JSON.stringify(checkOn));
        var hex = shasum.digest('hex');
        //console.log('hex', hex)
        SELF._sum = hex;
    })();

  return SELF;
}
exports.StrategyMap = StrategyMapModel;


// ============================================================================
// Strategy Objective Model
//
// var sample = {"kind":"strategy#objective","typeOf":"Strategy Objective","etag":"","uid":"","id":"212121","parentId":"","keywords":"","categories":"","name":" ","description":"","owner":"","measures":[],"objectives":[],"initiatives":[],"from-to-gap":"","perspective":"","theme":"","document":"","image":"","shortname":""}
// ============================================================================
function StrategyObjectiveModel(args) {
    var SELF = this;
    var crypto = require('crypto');
    var shasum = crypto.createHash('sha1');
    
    // init
    (function ()
    {
        if (args)
        {
            SELF.kind = args.kind || 'strategy#objective';
            SELF.typeOf = args.typeOf || 'Strategy Objective';
            SELF.id = args.id;
            SELF.guid = SELF.typeOf + '::' + args.id ;
            SELF.link = args.link || null;
            SELF.title = args.title;
            SELF.summary = args.summary || null;
            SELF.description = args.description || null;
            SELF.content = args.content || null;
            SELF.status = args.status || null;
                                   
            SELF.keywords = args.keywords || null
            SELF.categories = args.categories || null;

            SELF.created = args.created || String( new Date() );
            SELF.updated = args.updated || String( new Date() );
            SELF.source = args.source || null
        }
        
        var checkOn = {
            kind : SELF.kind ,
            typeOf : SELF.typeOf ,
            id : SELF.id ,
            guid : SELF.guid ,
            link : SELF.link ,
            title : SELF.title ,
            summary : SELF.summary ,
            description : SELF.description ,
            content : SELF.content ,
        }
        //console.log('checkOn', checkOn);
        var jsonCheckOn = JSON.stringify(checkOn);
        //console.log('json', jsonCheckOn)
        shasum.update(JSON.stringify(checkOn));
        var hex = shasum.digest('hex');
        //console.log('hex', hex)
        SELF._sum = hex;
    })();

  return SELF;
}
exports.StrategyObjective = StrategyObjectiveModel;


// ============================================================================
// Strategy Measure Model
//
// var sample = {"kind":"strategy#measure","typeOf":"Performance Metric","uid":"","name":"","description":"","owner":"","polarity":"","timeperiod type":"","unitofmeasure":"","targetvalue":{},"datavalues":[],"measures":[],"initiatives":[],"maintainers":[],"userdefinedfields":[],"attacheddocuments":[],"shortname":""}
// ============================================================================
function StrategyMeasureModel(args) {
    var SELF = this;
    var crypto = require('crypto');
    var shasum = crypto.createHash('sha1');
    
    // init
    (function ()
    {
        if (args)
        {
            SELF.kind = args.kind || 'strategymaps#measure';
            SELF.typeOf = args.typeOf || 'Strategy Measure';
            SELF.id = args.id;
            SELF.guid = SELF.typeOf + '::' + args.id ;
            SELF.link = args.link || null;
            SELF.title = args.title;
            SELF.summary = args.summary || null;
            SELF.description = args.description || null;
            SELF.content = args.content || null;
            SELF.status = args.status || null;
                                   
            SELF.keywords = args.keywords || null
            SELF.categories = args.categories || null;

            SELF.created = args.created || String( new Date() );
            SELF.updated = args.updated || String( new Date() );
            SELF.source = args.source || null
        }
        
        var checkOn = {
            kind : SELF.kind ,
            typeOf : SELF.typeOf ,
            id : SELF.id ,
            guid : SELF.guid ,
            link : SELF.link ,
            title : SELF.title ,
            summary : SELF.summary ,
            description : SELF.description ,
            content : SELF.content ,
        }
        //console.log('checkOn', checkOn);
        var jsonCheckOn = JSON.stringify(checkOn);
        //console.log('json', jsonCheckOn)
        shasum.update(JSON.stringify(checkOn));
        var hex = shasum.digest('hex');
        //console.log('hex', hex)
        SELF._sum = hex;
    })();

  return SELF;
}
exports.StrategyMeasure = StrategyMeasureModel;


// ============================================================================
// Strategy Initiative Model
//
// var sample = {"kind":"strategy#initiative","typeOf":"Initiative","etag":"","id":"","parentId":"","keywords":"","categories":"","name":"","description":"","status":"N/A","statusupdate":"","statuscolor":"","startdate":"","enddata":"","percentcomplete":"0","activeflag":false,"measures":[],"tasks":[],"subinitiatives":[],"userdefinedfields":[{"name":"Budget","value":""},{"name":"Remaining to Complete","value":""},{"name":"Spent to Date","value":""}],"assignedto":"","assignedby":"","attacheddocuments":[],"shortname":""}
// ============================================================================
function StrategyInitiativeModel(args) {
    var SELF = this;
    var crypto = require('crypto');
    var shasum = crypto.createHash('sha1');
    
    // init
    (function ()
    {
        if (args)
        {
            SELF.kind = args.kind || 'strategymaps#initiative';
            SELF.typeOf = args.typeOf || 'Strategy Initiative';
            SELF.id = args.id;
            SELF.guid = SELF.typeOf + '::' + args.id ;
            SELF.link = args.link || null;
            SELF.title = args.title || "";
            SELF.summary = args.summary || null;
            SELF.description = args.description || "";
            SELF.content = args.content || null;
            SELF.status = args.status || "N/A";
                               
            SELF.name = args.name;                 
            SELF.statusupdate = args.statusupdate || "";
            SELF.statuscolor = args.statuscolor || "";
            SELF.startdate = args.startdate || "";
            SELF.enddate = args.enddate || "";
            SELF.percentcomplete = args.percentcomplete || "0";
            SELF.activeflag = args.activeflag || "";
  
            SELF.objectives = args.objective || null;
            SELF.measures = args.measure || null;
            //SELF.targets = args.target || null;
            SELF.initiatives = args.initiative || null;
            SELF.tasks = args.theme || null;

            SELF.perspectives = args.perspective || null;
            SELF.themes = args.theme || null;
            SELF.prefixes = args.theme || null;
 
            SELF.assignedto = args.assignedto || null
            SELF.assignedby = args.assignedby || null
            SELF.attacheddocuments = args.attacheddocuments || null
            
            SELF.keywords = args.keywords || null
            SELF.categories = args.categories || null;

            SELF.created = args.created || String( new Date() );
            SELF.updated = args.updated || String( new Date() );
            SELF.source = args.source || null
        }
        
        var checkOn = {
            kind : SELF.kind ,
            typeOf : SELF.typeOf ,
            id : SELF.id ,
            guid : SELF.guid ,
            link : SELF.link ,
            title : SELF.title ,
            summary : SELF.summary ,
            description : SELF.description ,
            content : SELF.content ,
        }
        //console.log('checkOn', checkOn);
        var jsonCheckOn = JSON.stringify(checkOn);
        //console.log('json', jsonCheckOn)
        shasum.update(JSON.stringify(checkOn));
        var hex = shasum.digest('hex');
        //console.log('hex', hex)
        SELF._sum = hex;
    })();

  return SELF;
}
exports.StrategyInitiative = StrategyInitiativeModel;


// ============================================================================
// Strategy Task Model
//
// var sample = 
// ============================================================================


// ============================================================================
// Strategy Perspective Model
//
// var sample = 
// ============================================================================


// ============================================================================
// Strategy Theme Model
//
// var sample = 
// ============================================================================


// ============================================================================
// Strategy Prefix Model
//
// var sample = 
// ============================================================================
