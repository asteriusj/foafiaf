var MEGRAPH_MAP = require('../lib/foafiaf/megraph.js');

exports.megraph_map = function (req, res) {
    console.log("megraph_map route");
    //console.log(req.params);
    var tagText = req.params.text || null;
    tagText = 'entity';
    
    
    try {
        
        MEGRAPH_MAP.sample_megraph(tagText, function (err, data) {
                if (err) {
                console.log('error', err);
                return res.send(err);
            }
            //console.log('nodes[] edges[]: ', data);
            var viewData = {
                title: ' and...',
                data: data
            };
    
            return res.render('megraph_map', viewData);
            //return
        });
       
    }
    catch(e) {
       //Will never get caught
       return 
    }
};