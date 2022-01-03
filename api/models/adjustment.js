const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const adjustmentSchema = new mongoose.Schema({
    adjNo:String,
    adjDate:Date,
    client : {
        type : ObjectId,
        ref:'Client'
    },
    amount:Number,
    adjType:String,
    adjApplied : String,
    invoice:{
        type:ObjectId,
        ref:'Invoice'
    }
},{timestamps: true})

module.exports = mongoose.model("Adjustment",adjustmentSchema)