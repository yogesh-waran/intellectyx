const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');

require('dotenv').config();

const Customer = require('../models/customer');

exports.authenticate = function(req, res, next) {
    Customer.findOne({ email: req.body.username })
        .then(result => {
            if (result == null) {
                res.json('Invalid Username / Password.');
            }
            bcrypt.compare(req.body.password, result.password).then(function(match) {
                if (match) {
                    let payload = {
                        userId: result._id
                    };
                    let privateKey = fs.readFileSync('./private.key', 'utf8');
                    let publicKey = fs.readFileSync('./public.key', 'utf8');

                    const signOptions = {
                        issuer: process.env.JWT_ISSUER,
                        subject: process.env.JWT_SUBJECT,
                        audience: process.env.JWT_AUDIENCE,
                        expiresIn: process.env.JWT_EXPIRESON,
                        algorithm: process.env.JWT_ALGORITHM
                    };

                    jwt.sign(payload, privateKey, signOptions, function(err, token) {
                        jwt.verify(token, publicKey, signOptions, function(err, decoded) {
                            if (!err) {
                                res.json({
                                    token: token,
                                    decoded: decoded,
                                    userData: result,
                                });
                                next();
                            }
                        });
                    });
                } else {
                    res.json('Invalid Username / Password.');
                }
            });
        })
        .catch(next);
}