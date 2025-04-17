const mongoose = require('mongoose');

exports.validateId = (req, res, next) => {
    const id = req.params.id;

    if (mongoose.Types.ObjectId.isValid(id)) {
        return next();
    }

    const err = new Error('Invalid manga id');
    err.status = 400;
    next(err);
};
