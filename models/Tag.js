/**
 * @fileOverview A Tag model.
 * @name Tag
 *
 *
 * @constructor
 */
// ============================================================================
// Tags Main Module
// ============================================================================
function TagModel(options) {
    var SELF = this;
    var crypto = require('crypto');
    var shasum = crypto.createHash('sha1');
    
    this.kind;
    this.id;
    this.guid;
    this.link;
    this.count;
    this.subject;
    this.predicate;
    this.object;
    

    // init
    (function() {
        if (options) {
            SELF.kind       = options.kind  || '#tag';;
            SELF.typeOf     = options.typeOf || 'tag';
            SELF.id         = options.id;
            SELF.guid       = options.typeOf + '::' + options.id
            SELF.link       = options.link;
            SELF.title       - options.title;
            SELF.summary    = options.summary || null;
            SELF.description = options.description || null;
            
            SELF.parentTypeOf  = options.parentTypeOf || null;
            SELF.parentId = options.parentId || null;
            SELF.parentName  = options.parentName || null;
            
            SELF.name       - options.name || null;
            SELF.subject    = options.subject || null;
            SELF.predicate  = options.predicate || null;
            SELF.object     = options.object || null;
            
            SELF.count      = options.count || null;
            SELF.content    = options.content || SELF.subject + " " + SELF.predicate + " " + SELF.object;
            SELF.source     = options.source || null;
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
exports.Tag = TagModel;


function ConceptModel(options) {
    var SELF = this;
    
    this.text;
    this.relevance;
    this.knowledgeGraph;
    this.dbpedia;
    this.freebase;
    this.yago;
    /*var concept = {
        "text": "0",
        "relevance": "",
        "knowledgeGraph": "",
        "dbpedia": "",
        "freebase": "",
        "yago": ""
    }*/
        
    (function() {
        if (options) {
            SELF.text           = options.text;
            SELF.relevance      = options.relevance;
            SELF.knowledgeGraph = options.knowledgeGraph;
            SELF.dbpedia        = options.dbpedia;
            SELF.freebase       = options.freebase;
            SELF.yago       = options.yago;
        }
    })();

    return SELF;
}
exports.Concept = ConceptModel;


function EntityModel(options) {
    var SELF = this;

    this.type;
    this.text;
    this.relevance;
    this.count;
    this.knowledgeGraph;
    this.name;
    this.website;
    this.dbpedia;
    this.freebase;
    this.yago;
        
    (function() {
        if (options) {
            
            SELF.type           = options.type;
            SELF.text           = options.text;
            SELF.relevance      = options.relevance;
            SELF.count          = options.count;
            SELF.knowledgeGraph = options.knowledgeGraph;
            SELF.name           = options.name;
            SELF.website        = options.website;
            SELF.dbpedia        = options.dbpedia;
            SELF.freebase       = options.freebase;
            SELF.yago       = options.yago;
        }
    })();

    return SELF;
}
exports.Entity = EntityModel;
