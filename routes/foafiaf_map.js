var FOAFIAF_MAP = require('../lib/foafiaf/map.js');

exports.foafiaf_map = function (req, res) {
    console.log("foafiaf_map");
    //console.log(req.params);
    var tagText = req.params.text || null;
    tagText = 'entity';
    
    FOAFIAF_MAP.foaf_map(tagText, function (err, data) {
        if (err) {
            console.log('error', err);
            return res.send(err);
        }
        //console.log('nodes & edges: ', JSON.stringify(data));
        var viewData = {
            title: 'Map of FOAF relationships',
            data: data
        };

        return res.render('foafiaf_map', viewData);
    });
};

