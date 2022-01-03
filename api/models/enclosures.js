const mongoose = require('mongoose')

const enclosureSchema = new mongoose.Schema({
    name :String,    
})

module.exports = mongoose.model("Enclosure",enclosureSchema)