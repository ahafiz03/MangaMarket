const Offer = require('../models/offer');
const Manga = require('../models/manga');

exports.create = (req, res, next) => {
    const mangaId = req.params.id;
    const userId = req.session.user;
    const { amount } = req.body;

    Manga.findById(mangaId)
    .then(manga => {
        if (!manga) {
            const err = new Error('Cannot find manga with id ' + mangaId);
            err.status = 404;
            return next(err);
        }

        if (manga.member.equals(userId)) {
            req.flash('error', 'You cannot make an offer on your own manga.');
            return res.redirect('/mangas/' + mangaId);
        }

        const offer = new Offer({
            amount: amount,
            user: userId,
            manga: mangaId
        });

        return Promise.all([
            offer.save(),
            Manga.findByIdAndUpdate(
                mangaId,
                {
                    $inc: { totalOffers: 1 },
                    $max: { highestOffer: amount }
                },
                { new: true }
            )
        ]);
    })
    .then(() => {
        req.flash('success', 'Offer successfully made');
        res.redirect('/mangas/' + mangaId);
    })
    .catch(err => next(err));
};


exports.index = (req, res, next) => {
    const mangaId = req.params.id;

    Promise.all([
        Manga.findById(mangaId),
        Offer.find({ manga: mangaId }).populate('user', 'firstName lastName email')
    ])
    .then(([manga, offers]) => {
        if (!manga) {
            const err = new Error('Cannot find manga with id ' + mangaId);
            err.status = 404;
            return next(err);
        }

        if (!manga.member.equals(req.session.user)) {
            const err = new Error('Unauthorized access to offers');
            err.status = 401;
            return next(err);
        }

        res.render('./offer/index', { offers, manga });
    })
    .catch(err => next(err));
};


exports.accept = (req, res, next) => {
    const mangaId = req.params.id;
    const offerId = req.params.offerId;
    const userId = req.session.user;

    Promise.all([
        Manga.findById(mangaId),
        Offer.findById(offerId)
    ])
    .then(([manga, offer]) => {
        if (!manga) {
            const err = new Error('Cannot find manga with id ' + mangaId);
            err.status = 404;
            return next(err);
        }

        if (!manga.member.equals(userId)) {
            const err = new Error('Unauthorized to accept offers on this manga');
            err.status = 401;
            return next(err);
        }

        if (!offer) {
            const err = new Error('Cannot find offer with id ' + offerId);
            err.status = 404;
            return next(err);
        }
        
        manga.active = false;

        return Promise.all([
            manga.save(),
            Offer.updateOne({ _id: offerId }, { status: 'accepted' }),
            Offer.updateMany(
                { manga: mangaId, _id: { $ne: offerId }, status: 'pending' },
                { status: 'rejected' }
            )
        ]);
    })
    .then(() => {
        req.flash('success', 'Offer accepted successfully.');
        res.redirect(`/mangas/${mangaId}/offers`);
    })
    .catch(err => next(err));
};

