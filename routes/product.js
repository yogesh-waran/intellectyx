const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

router.post('/create', ProductController.create);
router.get('/list', ProductController.list);
router.get('/get/:id', ProductController.get);
router.post('/update', ProductController.update);
router.post('/delete/:id', ProductController.delete);

module.exports = router;