// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const config = require('./config');

passport.use(new GoogleStrategy({
    clientID: '614071081452-ktd98vv2kc804gmgk5bq6o88m1m4gqdb.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({
            googleId: profile.id
        });
        if (!user) {
            user = new User({
                googleId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value
            });
            await user.save();
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});