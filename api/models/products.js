const mongoose = require("mongoose");
const productType = require("./productType");
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
        name : {
            type : String,
            trim : true,
            required : true,
            maxlength : 32
        },
        code:String,
        warranty:Number,
        productType: { name : String,_id :ObjectId},    
        price : {
            type : Number,
            required :true,   
        } ,
        slabPrice:Boolean,
        slab1:{end:Number,s1price:Number},
        slab2:{end:Number,s2price:Number},
        slab3:{s3price:Number}, 
        priceband : String,  
        },
{timestamps : true}
);

module.exports = mongoose.model("Product", productSchema);