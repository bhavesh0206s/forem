const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const User = require('../modals/User');


passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done)=> {
  User.findById(id).then((user)=>{
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClentSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const user =  await User.findOne({googleId: profile.id})
      console.log(profile)
      if(user){
        return done(null, user)
      }
      const {name, email, picture} = profile._json;
      const userInfo = {
        googleId: profile.id,
        name, 
        email,
        picture
      }
      const newUser =  await new User(userInfo).save()
      done(null, newUser)
    }
  )
)