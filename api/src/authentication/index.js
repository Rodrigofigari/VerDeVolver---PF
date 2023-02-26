const passport = require('passport')
//const jwtStrategy = require('./strategies/jwtStrategy');
const LocalStrategy = require('./strategies/localStrategy')

passport.use(LocalStrategy);
//passport.use(jwtStrategy);