'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var chalk = require('chalk');

module.exports = function (app) {

  var googleConfig = app.getValue('env').GOOGLE;

  var googleCredentials = {
    clientID: googleConfig.clientID,
    clientSecret: googleConfig.clientSecret,
    callbackURL: googleConfig.callbackURL
  };

  var verifyCallback = function (accessToken, refreshToken, profile, done) {
    console.log("GOOOGLEEEEEEEE", profile);

    UserModel.findOne({'google.id': profile.id}).exec()
      .then(function (user) {

        if (user) {
          return user;
        } else {
          return UserModel.create({
            name: profile.name.givenName,
            email: profile.emails[0].value,
            google: {
              id: profile.id
            }
          });
        }

      })
      .then(function (userToLogin) {
        console.log(chalk.blue("the USER FROM CREATIN"), chalk.red(userToLogin))
        done(null, userToLogin);
      })
      .catch(function (err) {
        console.error('Error creating user from Google authentication', err);
        done(err);
      });

  };

  passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

  app.get('/auth/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));

  app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res, next) {
      res.redirect('/');
    });

};
