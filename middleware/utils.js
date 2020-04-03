const jwt = require('jsonwebtoken');
const fs = require('fs');

require('dotenv').config();

module.exports = {
    validateToken: (req, res, next) => {
        const auth_token = req.headers.authorization;
        let result;

        if (auth_token) {
            let publicKey = fs.readFileSync('./public.key', 'utf8');

            const signOptions = {
                issuer: process.env.JWT_ISSUER,
                subject: process.env.JWT_SUBJECT,
                audience: process.env.JWT_AUDIENCE,
                expiresIn: process.env.JWT_EXPIRESON,
                algorithm: process.env.JWT_ALGORITHM
            };

            jwt.verify(auth_token, publicKey, signOptions, function(err, decoded) {
                if (err) {
                    if (err.name == 'TokenExpiredError') {
                        result = {
                            error: `Authentication error. Json Web Token expired.`,
                            status: 401
                        };
                        res.status(401).send(result);
                    }
                } else {
                    // Let's pass back the decoded token to the request object
                    req.decoded = decoded;
                    // We call next to pass execution to the subsequent middleware
                    next();
                }
            });
        } else {
            result = {
                error: `Authentication error. Token required`,
                status: 401
            };
            res.status(401).send(result);
        }
    }
}