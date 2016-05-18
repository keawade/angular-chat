var restful = require('node-restful')
var mongoose = restful.mongoose

var chatSchema = new mongoose.Schema({
  room: String,
  users: [String],
  private: Boolean,
  messages: [{
    user: String,
    message: String,
    date: String
  }]
})

module.exports = restful.model('Chats', chatSchema)
