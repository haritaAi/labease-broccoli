const Invoice = require('../models/invoice')
const InvoiceCounter = require('../models/InvoiceCodeCounter')

exports.getInvoiceCounter = (req,res) => {
 
    
    InvoiceCounter.findOne({id :'sequencer'})
                  .exec((err,seq) =>  {
                                    if(err) return res.status(400).json({message : 'error in reading sequence'})
                                    return res.status(200).json(seq)
                    })
}


exports.getNextInvoiceSequence = (req,res,next) => {
    InvoiceCounter.findOneAndUpdate({id:'sequencer'},{$inc:{sequence_val : 1}},{new : true},(error,sequence)=>{
        if(error) return next(error)
        if(sequence > 999999){
              OrderCounter.findOneAndUpdate({id:'sequencer'},{$set : {sequence_val : 0}},{new:true},(err,seq) => {
                  if(err) return next(err)
              })              
        }
        
   })
   next()
}


exports.getInvoiceById = (req,res,next,id) => {
    Invoice.findById(id)           
           .exec((err,invoice)=>{
                if(err) return res.status(400).json({error:"Invoice Not Found"})
                return res.status(200).json(invoice)
           })  
           next();
}

exports.createInvoice = (req,res) => {
    let invoice = new Invoice(req.body)
    invoice.save((err,invoice) => {
        if(err) return res.status(400).json({message : 'Could not save invoice in DB'})
       res.status(200).json(invoice)
    })
}
exports.deleteInvoice = (req,res) => {
    let invoice = req.body;
    Invoice.findOneAndDelete({_id : req.body._id},(err,invoice) => {
        if(err) return res.status(400).json({
            message : 'failed to delete the invoice'
        })
        res.json(invoice)
    })
}
exports.updateInvoice = (req,res) => {
      
     Invoice.findOneAndUpdate({_id : req.body._id},{...req.body},{new : true},(err,invoice) => {
        if(err) return res.status(400).json({message : 'Could Not update invoice in db'})
        res.json(invoice)
    })
}

exports.getAllInvoices = (req,res) => {
   

    Invoice.find()                  
           .exec((err,invoice) => {
               if(err) return res.json({message : 'Failed to fetch invoices'})
            
               res.json(invoice)
           })
}
exports.getAllUnpaidInvoices = (req,res) => {
   

    Invoice.find({balance :{$gte: 0}})           
           .exec((err,invoice) => {
               if(err) return res.json({message : 'Failed to fetch invoices'})
        
               res.json(invoice)
           })
}
exports.getAllPaidInvoices = (req,res) => {
   

    Invoice.find({paid : {$gt :0},balance : 0})           
           .exec((err,invoice) => {
               if(err) return res.json({message : 'Failed to fetch invoices'})
            
               res.json(invoice)
           })
}
exports.getAllCancelledInvoices = (req,res) => {
   

    Invoice.find({cancelled : true})           
           .exec((err,invoices) => {
               if(err) return res.json({message : 'Failed to fetch invoices'})
              
               res.json(invoices)
           })
}
exports.getInvoicesByClientId = (req,res) => {
    console.log("REq,PARAMS : ",req.params)
    // Invoice.find({clientId : id})
    //        .exec((err,invoice)=> {
    //         if(err) return res.json({message : 'Failed to fetch invoices'})
    //         console.log("invoices found :",invoice)
    //         res.json(invoice)
    //        })

}