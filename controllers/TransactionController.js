const express = require('express');
const convert_mongoose_error = require('mongoose-validation-error-handler');

const Transaction = require('../models/transaction');

exports.create = function(req, res, next) {
    let transData = new Transaction({
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        created: new Date(),
        modified: new Date()
    });

    transData.save()
        .then(data => {
            res.json(data)
            next();
        })
        .catch(err => {
            let errors = convert_mongoose_error(err, {capitalize: true});
            res.json({errors: errors})
            next();
        });
}

exports.list = function(req, res, next) {
    Transaction.aggregate([{
            $lookup: {
                from: "customers", // collection name in db
                localField: "user_id",
                foreignField: "_id",
                as: "customers"
            }
        }, {
            $lookup: {
                from: "products", // collection name in db
                localField: "product_id",
                foreignField: "_id",
                as: "products"
            }
        }])
        .then(data => {
            res.json(data)
            next();
        })
        .catch(err => {
            let errors = convert_mongoose_error(err, {capitalize: true});
            res.json({errors: errors});
            next();
        });
}

exports.search = function(req, res, next) {
    let from_date = new Date(req.body.from_date);
    let to_date = new Date(req.body.to_date);

    Transaction.aggregate([{
            $match: {
                'created': { $gte: from_date, $lte: to_date}
            }
        }, {
            $lookup: {
                from: "customers", // collection name in db
                localField: "user_id",
                foreignField: "_id",
                as: "customers"
            }
        }, {
            $lookup: {
                from: "products", // collection name in db
                localField: "product_id",
                foreignField: "_id",
                as: "products"
            }
        }])
        .then(data => {
            res.json(data)
            next();
        })
        .catch(err => {
            let errors = convert_mongoose_error(err, {capitalize: true});
            res.json({errors: errors});
            next();
        });
}
