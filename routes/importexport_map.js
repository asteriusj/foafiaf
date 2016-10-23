var IO_MapRoutes = require('../lib/foafiaf/importexport.js');


exports.importexport = function (req, res) {
    console.log("importexport");

    try {
 
        IO_MapRoutes.importexport( function (err, data) {
            if (err) {
                console.log('error', err);
                return res.send(err);
            }
        
        });
    
        
    }
    catch(e) {
       //Will never get caught
       return 
    }
};
