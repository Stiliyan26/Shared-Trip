const router = require('express').Router();
const mapErrors = require('../util/mappers');
const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createTrip, updateTrip, deleteTrip, joinTrip } = require('../services/trip');

router.get('/create', isUser(), (req, res) => {
    res.render('trip-create', { title: 'Create Trip' });
});

router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;

    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        image: req.body.image,
        brand: req.body.brand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
        owner: userId
    };

    try {
        await createTrip(trip);
        res.redirect('/catalog');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('trip-create', { title: 'Create Trip', data: trip, errors });
    }
});

router.get('/edit/:id', preload(false), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit trip'});
});

router.post('/edit/:id', preload(false), isOwner(), async (req, res) => {
    const id = req.params.id;

    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        image: req.body.image,
        brand: req.body.brand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
    };

    try {
        await updateTrip(id, trip);
        res.redirect(`/catalog/${id}`);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        trip._id = id;
        res.render('edit', { title: 'Edit trip', errors});
    }
});

router.get('/delete/:id', preload(false), isOwner(), async (req, res) => {
    await deleteTrip(req.params.id);
    res.redirect('/catalog');
});

router.get('/join/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await joinTrip(id, req.session.user._id);
    } catch (err) {
        console.error(err);
    } finally {
        res.redirect(`/catalog/${id}`);
    }
});

module.exports = router;