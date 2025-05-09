const model = require('../models/manga');
const Offer = require('../models/offer');
const multer = require('multer');

exports.index = (req, res, next) => {
    model.find()
        .populate('member', 'firstName lastName')
        .then(mangas => {
            mangas.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            res.render('./manga/index', { mangas });
        })
        .catch(err => next(err));
};



exports.new = (req, res) => {
    res.render('./manga/new');
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });

exports.create = (req, res, next) => {
    let mangaData = req.body;
    if (req.file) {
        mangaData.image = '/images/' + req.file.filename;
    } else {
        let error = new Error('Image file is required');
        error.status = 400;
        return next(error);
    }

    let manga = new model(mangaData);
    manga.member = req.session.user;
    manga.save()
    .then(() => {
        req.flash('success', 'Successfully created listing')
        res.redirect('/mangas');
    })
    .catch(err => {
        if (err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};



exports.show = (req, res, next) => {
    const id = req.params.id;

    model.findById(id).populate('member', 'firstName lastName')
    .then(manga => {
        if (manga) {
            return res.render('./manga/show', { manga });
        } else {
            let err = new Error('Cannot find a manga with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(manga => {
        return res.render('./manga/edit', { manga });
    })
    .catch(err => next(err));
};

exports.update = (req, res, next) => {
    let id = req.params.id;
    let updatedData = req.body;
    
    if (req.file) {
        updatedData.image = '/images/' + req.file.filename;
    }

    model.findByIdAndUpdate(id, updatedData, { runValidators: true, new: true })
    .then(manga => {
        req.flash('success', 'Listing successfully updated');
        res.redirect('/mangas/' + id);
    })
    .catch(err => {
        if (err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    Promise.all([
        model.findByIdAndDelete(id),
        Offer.deleteMany({ manga: id })
    ])
    .then(([manga, offers]) => {
        if (!manga) {
            let err = new Error('Cannot find a manga with id ' + id);
            err.status = 404;
            return next(err);
        }
        req.flash('success', 'Listing and associated offers successfully deleted');
        res.redirect('/mangas');
    })
    .catch(err => next(err));
};

exports.search = (req, res, next) => {
    const searchTerm = req.query.q ? req.query.q.toLowerCase() : '';

    model.find()
        .then(mangas => {
            const filteredMangas = mangas.filter(manga => 
                manga.title.toLowerCase().includes(searchTerm) || 
                manga.details.toLowerCase().includes(searchTerm)
            );

            res.render('./manga/search', { mangas: filteredMangas, searchTerm });
        })
        .catch(err => next(err));
};
