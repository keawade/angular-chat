var passport = require('passport')
var User = require('./../models/user')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var LocalStrategy = require('passport-local').Strategy

var router = require('express').Router()

passport.use(new LocalStrategy(User.authenticate()))

router.use(cookieParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.use(session({
  secret: 'replace me with config value',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false // TODO - Change when HTTPS enabled
  }
}))
router.use(passport.initialize())
router.use(passport.session())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

router.get('/login', function (req, res) {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}))

router.get('/register', function (req, res) {
  res.render('register')
})

router.post('/register', function (req, res, next) {
  User.register(new User({ username: req.body.username }), req.body.password, function (err) {
    if (err) {
      console.log('[auth] error while registering user' + req.body.username, err)
      return next(err)
    }
    console.log('[auth] user ' + req.body.username + ' registered')
    res.redirect('/')
  })
})

router.get('/logout', function (req, res) {
  req.logout()
  console.log('[auth] logged out')
  res.redirect('/')
})

module.exports = router
