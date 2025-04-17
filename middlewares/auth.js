const Manga = require('../models/manga');

exports.isGuest = (req, res, next) => {
    if (!req.session.user) return next();

    req.flash('error', 'You are logged in already');
    return res.redirect('/users/profile');
};

exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) return next();

    req.flash('error', 'You need to log in first');
    return res.redirect('/users/login');
};

exports.isMember = (req, res, next) => {
    const id = req.params.id;

    Manga.findById(id)
        .then(manga => {
            if (!manga) {
                const err = new Error('Cannot find a manga with id ' + id);
                err.status = 404;
                return next(err);
            }

            if (manga.member == req.session.user) {
                return next();
            } else {
                const err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        })
        .catch(err => next(err));
};
