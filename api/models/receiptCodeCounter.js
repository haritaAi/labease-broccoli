const mongoose = require('mongoose')

const ReceiptCounterSchema = new mongoose.Schema({
 sequence_val :{

    type: Number,
    default : 0
 },
 id:String, 
 

})

module.exports = mongoose.model("ReceiptCodeCounter",ReceiptCounterSchema)