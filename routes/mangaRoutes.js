const express = require('express');
const controller = require('../controllers/mangaController');
const { isLoggedIn, isMember } = require('../middlewares/auth');
const { validateId, validateManga } = require('../middlewares/validator');
const multer = require('multer');
const offerRoutes = require('./offerRoutes');

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
router.get('/new', isLoggedIn, controller.new);

// POST /mangas: Create new manga
router.post('/', upload.single('image'), isLoggedIn, validateManga, controller.create);

// GET /mangas/search: Handle search results
router.get('/search', controller.search);

// GET /mangas/:id: send details of manga identified by id
router.get('/:id', validateId, controller.show);

// GET /mangas/:id/edit: send html form for editing an existing manga
router.get('/:id/edit', validateId, isLoggedIn, isMember, controller.edit);

// PUT /mangas/:id: update the manga identified by id
router.put('/:id', upload.single('image'), validateId, isLoggedIn, isMember, validateManga, controller.update);

// DELETE /mangas/:id: delete the manga identified by id
router.delete('/:id', validateId, isLoggedIn, isMember, controller.delete);

// Mount offer routes under mangas/:id/offers
router.use('/:id/offers', offerRoutes);

module.exports = router;