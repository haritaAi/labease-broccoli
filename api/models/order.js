const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema



const OrderSchema = new mongoose.Schema({
      orderNo:String,
      orderAmount:Number,
      products:[],
      productsList:String,
      modelno:String,
      status:String,
      orderDate:Date,
      updated : Date,
      duedate:Date,
      dateIn:Date,
      deliverytime:String,
      ordertime:String,      
      department:String,
      clientId : {
          type:ObjectId,
          ref:"Client"
      },
      client:String,      
      patient:String,
      user:String,
      shipment:String,
      assignedTo:String,
      isInvoiced : { type : Boolean, default : false},
      invoiceId:String,
      invoiceDate:Date,
      additionalAmount:Number,
      trayNo:String,
      shade1:String,
      shade2:String,
      shade3:String,
      shadeNote : String,
      shipmentDate:Date,
      articularTag:String,
      priority:String,
      notes: String,
      priceBand:String,
      billto:String,
      orderNotes:String,
      workType:String,
      

          
},{timestamps: true})

module.exports= mongoose.model("Order",OrderSchema)

// module.exports= {ProductOrdered,Order}