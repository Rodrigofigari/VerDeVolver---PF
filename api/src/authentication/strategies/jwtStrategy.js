const {Strategy, ExtractJwt} = require('passport-jwt');
require('dotenv').config();
const {JWT_SECRET} = process.env

const options = {
    jwtFormRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : JWT_SECRET,
};

const jwtStrategy = new Strategy(options, (payload, done) => {
    return done(null, payload)
});

module.export = jwtStrategy



