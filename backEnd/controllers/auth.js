const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('signup', new localStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
    try {
      const user = await UserModel.create({ email, password });
      console.log('прошла строчка 12 в auth.js');
      console.log(null, user);      
      return done(null, user);
    } catch (error) {
      done(error);
    }
}));

passport.use('login', new localStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ email });

    if( !user ){
      return done(null, false, { message : 'User not found'});
    }

    const validate = await user.isValidPassword(password);
    if( !validate ){
      return done(null, false, { message : 'Wrong Password'});
    }
    return done(null, user, { message : 'Logged in Successfully'});
    
  } catch (error) {
    return done(error, 'ошибка');
  }
}));

passport.use(new JWTstrategy({
  secretOrKey: 'top_secret',
  jwtFromRequest: ExtractJWT.fromHeader('secret_token')
}, async(token, done) => {
  try {
    return done(null, token.user);
  } catch(error) {
    done(error);
  }
}));