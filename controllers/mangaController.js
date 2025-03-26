const model = require('../models/manga');
const multer = require('multer');

exports.index = (req, res, next) => {
    model.find()
        .then(mangas => {
            mangas.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

            res.render('./manga/index', { mangas });
        })
        .catch(err => next(err));
};


exports.new = (req, res) => {
    res.render('./manga/new');
};

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/'); // Save files to the "public/uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
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
    manga.save()
    .then(() => res.redirect('/mangas'))
    .catch(err => {
        if (err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};



exports.show = (req, res, next) => {
    let id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid manga id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
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

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid manga id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(manga => {
        if (manga) {
            return res.render('./manga/edit', { manga });
        } else {
            let err = new Error('Cannot find a manga with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

exports.update = (req, res, next) => {
    let id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid manga id');
        err.status = 400;
        return next(err);
    }

    let updatedData = req.body;
    
    if (req.file) {
        updatedData.image = '/images/' + req.file.filename;
    }

    model.findByIdAndUpdate(id, updatedData, { runValidators: true, new: true })
    .then(manga => {
        if (manga) {
            res.redirect('/mangas/' + id);
        } else {
            let err = new Error('Cannot find a manga with id ' + id);
            err.status = 404;
            next(err);
        }
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

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid manga id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id)
    .then(manga => {
        if (manga) {
            res.redirect('/mangas');
        } else {
            let err = new Error('Cannot find a manga with id ' + id);
            err.status = 404;
            next(err);
        }
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
