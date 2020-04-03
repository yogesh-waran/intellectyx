const express = require('express');
const router = express.Router();

const TransactionController = require('../controllers/TransactionController');

router.post('/create', TransactionController.create);
router.get('/list', TransactionController.list);
router.post('/search', TransactionController.search);

module.exports = router;