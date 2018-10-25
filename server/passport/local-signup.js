const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    instrument: req.body.instrument.trim(),
    experience: req.body.experience.trim(),
    videoLink: req.body.videoLink.trim(),
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    bandName: req.body.bandName.trim(),
    bandDescription: req.body.bandDescription.trim(),
    musicGenre: req.body.musicGenre.trim(),
    isMusician: req.body.isMusician.trim(),
    city: req.body.city.trim(),
    state: req.body.state.trim()
  };

  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) { return done(err); }

    return done(null);
  });
});
