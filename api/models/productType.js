const mongoose = require("mongoose");
const Category = require('./category')
const {ObjectId} = mongoose.Schema

const productTypeSchema =  new mongoose.Schema({
  name : String,
  category : {  name : String,_id : ObjectId },
 
})

module.exports = mongoose.model('ProductType',productTypeSchema)