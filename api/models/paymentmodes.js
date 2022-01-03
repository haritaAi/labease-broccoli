const mongoose = require('mongoose')

const paymentmodeSchema = new mongoose.Schema({
    description : String,
    type : String,
    relAc : String,
    relAcAccess : String,
},{timestamps: true})

module.exports = mongoose.model("PaymentMode",paymentmodeSchema)