const mongoose = require('mongoose')
const Invoice  = require('../models/invoice')
const {ObjectId} = mongoose.Schema


const receiptSchema = new mongoose.Schema({
    receiptNo : String,
    amount:Number,
    paymentDate:Date,
    paymentMode:String,
    paidToAc : String,
    checqueNo:String,
    notes:String,
    invoicesApplied:[{type : ObjectId,ref:'Invoice'}],
    client:{
        type:ObjectId,
        ref:'Client'
    },
    cancelled : {
        type : Boolean,
        default : false
    }
})
module.exports= mongoose.model("Receipt",receiptSchema) 