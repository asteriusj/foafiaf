/**
 * @fileOverview An Note model.
 * @name Note
 *
 * Example model:
 *   var note = {
 *     kind: my.kind,
     * id: my.id,
     * guid: my.guid,
 *     link: my.link,
 *     content: my.content,
 *     categories: mycategories,
 *     updated: my.updated
 *   }
 *
 *
 * @constructor
 */
 function NoteModel(args) {
    var SELF = this;
    var crypto = require('crypto');
    var shasum = crypto.createHash('sha1');

    // init
    (function ()
    {
        if (args)
        {
            SELF.kind = args.kind || '#note';
            SELF.typeOf = args.typeOf || 'note';
            SELF.id = args.id;
            SELF.guid = SELF.typeOf + '::' + args.id
            SELF.link = args.link || null;
            SELF.title = args.title || null;
            SELF.summary = args.summary || null;
            SELF.description = args.description || null;
            SELF.content = args.content || null;
            
            SELF.parentTypeOf  = args.parentTypeOf || null;
            SELF.parentId = args.parentId || null;
            SELF.parentName  = args.parentName || null;
            
            SELF.keywords = args.keywords || null;
            SELF.categories = args.categories || null;
            SELF.status = args.status || null;
            SELF.created = args.created || String( new Date() );
            SELF.updated = args.updated || String( new Date() );
            SELF.source = args.source || null;
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
 
exports.Note = NoteModel;