const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema


const InvoiceSchema = new mongoose.Schema({
    invoiceNo:String,
    invoiceDate : Date,
    clientId : {
        type : ObjectId,
        ref:"Client"
    },
    client:String,
    ordersList :Array,
    amount : Number,
    dueDate : Date,
    paid : Number,
    balance : Number,
    cancelled:Boolean,   
    adjustmentNo:String,
    discount:{
        type:Number,
        default : 0
    }


},{timestamps : true})



module.exports= mongoose.model("Invoice",InvoiceSchema)
