//TODO replace with actual service
const tripService = require('../services/trip');

//TODO change property name to match collection
function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;
        
        if (populate){
            res.locals.trip = await tripService.getTripAndPopulate(id);
        } else {
            res.locals.trip = await tripService.getTripById(id);
        }
        
        next();
    };
}

module.exports = preload;