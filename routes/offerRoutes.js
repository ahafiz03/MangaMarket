const express = require('express');
const controller = require('../controllers/offerController');
const { isLoggedIn } = require('../middlewares/auth');
const { validateOffer, validateId } = require('../middlewares/validator');

const router = express.Router({ mergeParams: true });

// POST /mangas/:id/offers - Make an offer
router.post('/', isLoggedIn, validateOffer, controller.create);

// GET /mangas/:id/offers - View all offers
router.get('/', isLoggedIn, controller.index);

// PUT /mangas/:id/offers/:offerId - Accept an offer
router.put('/:offerId', isLoggedIn, validateId, controller.accept);

module.exports = router;
