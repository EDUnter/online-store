const express = require('express');
const router = express.Router();
const imagesController = require('./controllers/imagesController');
const productsController = require('./controllers/productsController');

const imageService = require('./services/imageService');

// routes
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', productsController.create);
router.put('/:id', productsController.update);
router.delete('/:id', productsController._delete);

router.get('/img/:name', imageService.getById);

module.exports = router;