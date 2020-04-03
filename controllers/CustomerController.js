const express = require('express');
const bcrypt = require('bcrypt');
const convert_mongoose_error = require('mongoose-validation-error-handler');
require('dotenv').config();

const saltRounds = Number(process.env.BCRYPT_SALTROUNDS || 10);

const Customer = require('../models/customer');

exports.register = function(req, res, next) {
    let userData = new Customer({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        salt: "",
        created: new Date(),
        modified: new Date()
    });

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(userData.password, salt, function (err, hash) {
            userData.password = hash;
            userData.salt = salt;
            userData.save()
                .then(data => {
                    res.json(data)
                    next();
                })
                .catch(err => {
                    let errors = convert_mongoose_error(err, {capitalize: true});
                    res.json({errors: errors})
                    next();
                })
        })
    });
}

exports.list = function(req, res, next) {
    Customer.find({})
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
    Customer.findOne({"_id": req.params.id})
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

exports.deleteUser = function(req, res, next) {
    Customer.findOneAndDelete({"_id": req.params.id})
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
    let userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        modified: new Date()
    };

    Customer.updateOne({_id: req.body.id}, userData)
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