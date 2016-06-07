var BACON_MAP = require('../lib/foafiaf/bacon.js');

exports.bacon_map = function (req, res) {
    console.log("bacon_map");
    //console.log(req.params);
    var tagText = req.params.text || null;
    tagText = 'entity';
    
    BACON_MAP.bacon_map(tagText, function (err, data) {
        if (err) {
            console.log('error', err);
            return res.send(err);
        }
        console.log('nodes[] edges[]: ', data);
        var viewData = {
            title: 'Degrees of Kevin Bacon relationship sample map',
            data: data
        };

        return res.render('bacon_map', viewData);
        //return
    });
};