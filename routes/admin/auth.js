var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , admins = require('../../collections/admins');

app.get('/login', renderLogin);

app.post('/login', passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true 
}));

function renderLogin(req, res){
  res.render('login');
};

passport.use(new LocalStrategy(
  function(username, password, done) {

    admins.getByUserName(username, function(err, user){
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(user.password === password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id.toString());
});

passport.deserializeUser(admins.getById);

function isAuthenticated(req, res, next){
  if (req.user)
    next();
  else res.redirect('/login');
};

app.isAuthenticated = isAuthenticated;
