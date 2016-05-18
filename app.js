var express = require('express')
var logger = require('morgan')
var app = express()

var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/chattr')

app.locals.sitename = "Keith's App"
app.locals.source_url = 'https://github.com/keawade/angular-chat'

app.use(logger('dev'))

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('*', function (req, res, next) {
  if (req.user) {
    res.locals.loggedIn = true
  } else {
    res.locals.loggedIn = false
  }
  next()
})

app.use('/api', require('./routes/api'))
app.use('/auth', require('./routes/auth'))
app.use('/', require('./routes/core'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers TODO - Disable dev error handler

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
