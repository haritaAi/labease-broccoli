const mongoose = require('mongoose')

const CodeCounterSchema = new mongoose.Schema({
 sequence_val :{

    type: Number,
    default : 0
 },
 id:String, 
 

})

module.exports = mongoose.model("CodeCounter",CodeCounterSchema)