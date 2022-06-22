const Trip = require('../models/Trip');

async function createTrip(trip){
    const result = new Trip(trip);
    await result.save();
}

async function getAllTrips(){
    return await Trip.find({}).lean();
}

async function getTripAndPopulate(id){
    return await Trip.findById(id).populate('owner').populate('buddies').lean();
}

async function getTripById(id){
    return await Trip.findById(id).lean();
}

async function updateTrip(id, trip){
    const existing = await Trip.findById(id);

    existing.start = trip.start
    existing.end = trip.end
    existing.date = trip.date
    existing.time = trip.time
    existing.image = trip.image
    existing.brand = trip.brand
    existing.seats = trip.seats
    existing.price = trip.price
    existing.description = trip.description

    await existing.save();
}

async function deleteTrip(id){
    await Trip.findByIdAndDelete(id);
}

async function joinTrip(tripId, userId){
    const trip = await Trip.findById(tripId);

    if (trip.buddies.includes(userId)){
        throw new Error('This user has already in the trip!');
    }

    trip.buddies.push(userId);
    await trip.save();
}

async function getTripsByOwner(id){
    return await Trip.find({owner: id}).populate('owner').lean();
}

module.exports = {
    createTrip,
    getAllTrips,
    getTripAndPopulate,
    getTripById,
    updateTrip,
    deleteTrip,
    joinTrip,
    getTripsByOwner
}