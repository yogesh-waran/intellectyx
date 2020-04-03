const express = require('express');
const convert_mongoose_error = require('mongoose-validation-error-handler');

const Products = require('../models/products');

exports.create = function(req, res, next) {
    let productData = new Products({
        name: req.body.name,
        price: req.body.price,
        created: new Date(),
        modified: new Date()
    });

    productData.save()
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
    Products.find({})
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

exports.get = function(req, res, next) {
    Products.findOne({"_id": req.params.id})
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

exports.delete = function(req, res, next) {
    Products.findOneAndDelete({"_id": req.params.id})
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

exports.update = function(req, res, next) {
    let productData = {
        name: req.body.name,
        price: req.body.price,
        modified: new Date()
    };

    Products.updateOne({_id: req.body.id}, productData)
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