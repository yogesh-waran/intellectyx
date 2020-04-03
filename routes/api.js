const express = require('express');
const authRouter = require('./auth');
const customerRouter = require('./customer');
const productRouter = require('./product');
const transactionRouter = require('./transaction');

const app = express();

app.use('/auth', authRouter);
app.use('/users', customerRouter);
app.use('/product', productRouter);
app.use('/customer_transaction', transactionRouter);

module.exports = app;