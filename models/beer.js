const mongoose = require('mongoose')

const beerSchema = mongoose.Schema({
  name: {type: String, required: true},
  brewery: {type: String, required: true},
  abv: {type: String},
  description: {type: String},
  url: {type: String},
  img: {type: String}
})





module.exports = mongoose.model('Beer', beerSchema)
