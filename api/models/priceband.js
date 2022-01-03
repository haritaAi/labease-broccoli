const mongoose = require('mongoose')

const priceBandSchema = new mongoose.Schema({
    name :String,    
})

module.exports = mongoose.model("PriceBand",priceBandSchema)