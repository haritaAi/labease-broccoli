const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema


const staffSchema = new mongoose.Schema({
      category:String,
      Name:String,
      mobile:Number,
      email :String,
      phone1:Number,
      phone2:Number,
      address:{
          type : ObjectId,
          ref :'Address'
      },
     department:String,
     qual:String,
})

module.exports = mongoose.model("Staff",staffSchema);