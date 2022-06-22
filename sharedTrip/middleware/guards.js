
function isUser() {
    return (req, res, next) => {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    }
}

function isOwner() {
    return (req, res, next) => {
        const userId = req.session.user ? req.session.user._id : undefined;
        //TODO change property name to match collection: trip and owner
        if (res.locals.trip.owner._id == userId) {
            next();
        } else {
            res.redirect('/login');
        }
    };
}

module.exports = {
    isUser,
    isGuest,
    isOwner
}