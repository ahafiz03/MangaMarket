const model = require('../models/user');
const Manga = require('../models/manga');

exports.new = (req, res)=>{
    return res.render('./user/new');
};

exports.create = (req, res, next)=>{
        let user = new model(req.body);
            user.save()
            .then(user=>{ 
                req.flash('success', 'Successfully created account');
                res.redirect('/users/login');
            })
            .catch(err => {
                if (err.name === 'ValidationError') {
                    req.flash('error', err.message);
                    return res.redirect('/users/new');
                }
                if (
                    err.code === 11000 || 
                    (err.cause && err.cause.code === 11000) || 
                    err.message.toLowerCase().includes('duplicate') 
                ) {
                    req.flash('error', 'Email has been used');
                    return res.redirect('/users/new');
                }
                next(err); 
            });
            
};

exports.getUserLogin = (req, res, next) => {
    return res.render('./user/login');
}

exports.login = (req, res, next)=>{
    let email = req.body.email;
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            req.flash('error', 'Wrong email address');  
            return res.redirect('/users/login');
        }
        user.comparePassword(password)
        .then(result => {
            if(result) {
                req.session.user = user._id;
                req.flash('success', 'You have successfully logged in');
                res.redirect('/users/profile');
            } else {
                req.flash('error', 'Wrong password');      
                return res.redirect('/users/login');
            }
        });     
    })
    .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), Manga.find({member: id})])
    .then(results=>{
        const [user, mangas] = results;
        res.render('./user/profile', {user, mangas});
    })
    .catch(err=>next(err));
};

exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };



