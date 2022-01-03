const mongoose = require('mongoose')

const upiSchema = new mongoose.Schema({
    vpa : String,
    name: String,
    
})

module.exports = mongoose.model("Upi",upiSchema)