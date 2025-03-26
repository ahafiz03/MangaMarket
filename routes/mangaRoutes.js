const express = require('express');
const controller = require('../controllers/mangaController');
const multer = require('multer');

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// GET /mangas: Show all mangas
router.get('/', controller.index);

// GET /mangas/new: Form to create new manga
router.get('/new', controller.new);

// POST /mangas: Create new manga (Apply multer here)
router.post('/', upload.single('image'), controller.create);

// GET /mangas/search: Handle search results
router.get('/search', controller.search);

// GET /mangas/:id: send details of manga identified by id
router.get('/:id', controller.show);

// GET /mangas/:id/edit: send html form for editing an existing manga
router.get('/:id/edit', controller.edit);

// PUT /mangas/:id: update the manga identified by id
router.put('/:id', upload.single('image'), controller.update);

// DELETE /mangas/:id: delete the manga identified by id
router.delete('/:id', controller.delete);

module.exports = router;