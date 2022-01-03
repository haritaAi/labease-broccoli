const mongoose = require('mongoose')
const {objectId} = mongoose.Schema

const addressSchema = new mongoose.Schema({
    name:String,    
    address1:String,
    address2:String,
    area:String,
    city:String,
    state:String,
    pincode:Number,
    contactPerson:String,
    phoneO:Number,
    phomeM:Number,
    workHours:String,
    route:String

})

const Address = mongoose.model("Address",addressSchema)


const additionalDoctorSchema = new mongoose.Schema({
    name : String,
    designation : String,
    cellno:Number,
})

const AdditionalDoctor = mongoose.model("AdditionalDoctor",additionalDoctorSchema)


const clientSchema = new mongoose.Schema({
    name:{
        type :String,
        maxlength:100,
        minlength : 3,
        required:[true,'Name is required'] 
    },
    salutation: String,
    contactPerson:String,
    addDoc:[additionalDoctorSchema],
    code:String,
    emailPrimary: String,
    emailSecondary:String,
    phoneO :Number,
    phoneM:{
       type: Number,
       unique : true,
    }, 
    phoneR:Number,    
    address : [addressSchema],
    address1:String,
    address2:String,
    city:String,
    area:String,
    pincode:Number,
    state:String,
    emailOption:Boolean,
    smsOption:Boolean,
    deliveryMethod:String,
    route:String,
    priceBand:String,
    billTo : String,
    gstin:String,
    creditLimit:Number,
    taxEx:Boolean,
    isLab:Boolean,
    paymentTerms:Number,
    balance:Number,
    drcrOption:String,
    notes:String,
    category:String,
    workHours:String,
    acmanager:String,
    dcireg:String,
    regDate:Date,
    company:Number,
   
}, {timestamps:true} );

// module.exports =  mongoose.model("Client",clientSchema);
const  Client = mongoose.model('Client',clientSchema)


module.exports = {Client,Address,AdditionalDoctor}