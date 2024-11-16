// routes/cart.routes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.delete('/remove-selected', cartController.removeSelectedItems);
router.delete('/:id', cartController.removeFromCart);
router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);



module.exports = router;
