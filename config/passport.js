const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// 載入 User model
const User = require('../models/user')
module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({
        email: email,
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' })
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Email or Password incorrect' })
          }
        })
      })
    }
    )
  )
  passport.use(new FacebookStrategy({
    clientID: '828263854238988',
    clientSecret: 'd3263b5a3e01904e35b55bc7956c1fdc',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['email', 'displayName']
  },
    function (accessToken, refreshToken, profile, done) {

      console.log(profile)
      User.findOne({
        email: profile._json.email,
      }).then(user => {
        if (!user) {

          var randomPassword = Math.random().toString(36).slice(-8)
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(randomPassword, salt, (err, hash) => {
              var newUser = User({
                name: profile._json.name,
                email: profile._json.email,
                password: hash
              })
              newUser.save().then(user => {
                return done(null, user)
              }).catch(err => {
                console.log(err)
              })
            })
          })
        } else {
          return done(null, user)
        }
      })
    })
  )
  // 為了要支援 session 功能，我們要貼上 Passport 提供的 serialize 與 deserialize 的範例程式碼：
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}