const express = require('express');
const controller = require('../controllers/mangaController');
const router = express.Router();
const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// GET /mangas: send all mangas to the user
router.get('/', controller.index);

// GET /mangas/new: send html form for creating a new manga
router.get('/new', controller.new);

// POST /mangas: create a new manga
router.post('/', upload.single('image'), controller.create);

// GET /mangas/:id: send details of manga identified by id
router.get('/:id', controller.show);

// GET /mangas/:id/edit: send html form for editing an existing manga
router.get('/:id/edit', controller.edit);

// PUT /mangas/:id: update the manga identified by id
router.put('/:id', controller.update);

// DELETE /mangas/:id: delete the manga identified by id
router.delete('/:id', controller.delete);

module.exports = router;