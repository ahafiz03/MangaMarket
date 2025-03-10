const model = require('../models/manga');

exports.index = (req, res) => {
    const searchTerm = req.query.q ? req.query.q.toLowerCase() : null;
    let mangas = model.find();
    if (searchTerm) {
        mangas = mangas.filter(manga => 
            manga.title.toLowerCase().includes(searchTerm) || 
            manga.details.toLowerCase().includes(searchTerm)
        );
    }
    mangas.sort((a, b) => parseFloat(String(a.price).replace('$', '')) - parseFloat(String(b.price).replace('$', '')));
    res.render('manga/index', { mangas });
};

exports.new = (req, res)=>{
    res.render('./manga/new');
};

exports.create = (req, res) => {
    let manga = req.body;
    model.save(manga);
    res.redirect('/mangas');
};


exports.show = (req, res, next)=>{
    let id = req.params.id;
    let manga = model.findById(id);
    if (manga) {
        return res.render('./manga/show', {manga});
    } else {
        let err = new Error('Cannot find a manga with id ' + id);
        err.status = 404;
        next(err);
    }
};


exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let manga = model.findById(id);
    if (manga) {
        return res.render('./manga/edit', {manga});
    } else {
        let err = new Error('Cannot find a manga with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next)=>{
    let manga = req.body;
    let id = req.params.id;
    if (model.updateById(id, manga)) {
        res.redirect('/mangas/'+id);
    } else {
        let err = new Error('Cannot find a manga with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/mangas');
    } else {
        let err = new Error('Cannot find a manga with id ' + id);
        err.status = 404;
        next(err);
    }
};