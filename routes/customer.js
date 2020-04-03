const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/CustomerController');

router.post('/register', CustomerController.register);
router.get('/list', CustomerController.list);
router.get('/get/:id', CustomerController.get);
router.post('/update', CustomerController.update);
router.post('/delete/:id', CustomerController.deleteUser);

module.exports = router;