const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getAllTrips, getTripsByOwner } = require('../services/trip');
const { getUserById } = require('../services/user');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' })
});

router.get('/catalog', async (req, res) => {
    const trips = await getAllTrips();
    res.render('catalog', { title: 'Shared Trips', trips });
});

router.get('/catalog/:id', preload(true), (req, res) => {
    const trip = res.locals.trip;
    
    trip.tripEmails = trip.buddies.map(b => b.email).join(', ');
    trip.seatsLeft = trip.seats - trip.buddies.length;
    trip.availableSeats = trip.seats - trip.buddies.length != 0 ? true : false;

    if (req.session.user){
        trip.isUser = true;
        trip.isOwner = trip.owner._id == req.session.user._id;

        if (trip.buddies.some(b => b._id == req.session.user._id)){
            trip.hasJoined = true;
        }
    }

    res.render('details', { title: 'Details', trip});
});

router.get('/profile', isUser(), async (req, res) => {
    const trips = await getTripsByOwner(req.session.user._id);
    const user = await getUserById(req.session.user._id);
    trips.count = trips.length;
    res.render('profile', { title: 'Profile', trips, user });
});

module.exports = router;