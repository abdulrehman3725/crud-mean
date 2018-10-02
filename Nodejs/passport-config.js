var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , BasicStrategy = require('passport-http').BasicStrategy
  , DigestStrategy = require('passport-http').DigestStrategy;
var User = require('./models/user');

passport.use('local',new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        // return done(null, false, { message: 'Incorrect username.' });
        return done(null,  { message: 'Incorrect username.' });
      }
      if (!user.isValid(password)) {
        // return done(null, fasle,  { message: 'Incorrect password.' });
        return done(null,  { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.isValid(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.use(new DigestStrategy({ qop: 'auth' },
  function(username, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, user.password);
    });
  },
  function(params, done) {
    // validate nonces as necessary
    done(null, true)
  }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
    // done(null, user);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


//JWT TOKEN STRATEGY
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {}

// Setup JWT options
//opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");  //See this for the code commented above: https://github.com/bradtraversy/meanauthapp/issues/9
opts.secretOrKey = 'my-own-secret-key';

passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
  //If the token has expiration, raise 
  var expirationDate = new Date(jwtPayload.exp * 1000)
  if(expirationDate < new Date()) {
    // return done(null, false);
    return done(null, { message: 'Token is expired' });
  }
  var user = jwtPayload
  return done(null, user)
}))
