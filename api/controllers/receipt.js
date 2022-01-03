const Receipt = require('../models/receipt')
const ReceiptCodeCounter = require('../models/receiptCodeCounter')

exports.getReceiptCounter = (req,res) => {
    ReceiptCodeCounter.findOne({id:'sequencer'})
                      .exec((err,seq) => {
                          if(err)  return res.status(400).json({message : 'error in reading sequence'})
                          return res.status(200).json(seq)
                      })
}

exports.getNextReceiptSequence = (req,res,next) => {
    ReceiptCodeCounter.findOneAndUpdate({id:'sequencer'},{$inc:{sequence_val:1}},{new:true},(error,sequence)=>{
        if(error) return next(error)
        if(sequence > 999999){
              ReceiptCodeCounter.findOneAndUpdate({id:'sequencer'},{$set:{sequence_val:0}},{new:true},(err,seq) => {
                  if(err) return next(err)
              })
        }
    })
    next()
}

exports.getReceiptById = (req,res,next,id) => {
    Receipt.findById(id)
           .exec((err,receipt) => {
               if(err)return res.status(400).json({error:'Receipt not found'})
               return res.status(200).json(receipt)
           
            })  
            next()
}

exports.createReceipt = (req,res) => {
    let receipt = new Receipt(req.body)
    receipt.save((err,receipt) => {
        if(err) return res.status(400).json({message : 'Could not save receipt in DB'})
        res.status(200).json(receipt)
    })
}

exports.deleteReceipt = (req,res) => {
    let receipt = req.body;
    Receipt.findOneAndDelete({_id : req.body._id},(err,receipt) => {
        if(err) return res.status(400).json({
            message : 'failed to delete the receipt'
        })
        res.json(receipt)
    })
}
exports.updateReceipt = (req,res) => {
    Receipt.findOneAndUpdate({_id : req.body._id},{...req.body},{new : true},(err,receipt) => {
        if(err) return res.status(400).json({message : 'Could Not update receipt in db'})
        res.json(receipt)
    })
}

exports.getAllReceipts = (req,res) => {
   

    Receipt.find()   
           .populate('client')                            
           .exec((err,receipt) => {
               if(err) return res.json({message : 'Failed to fetch receipts'})
               
               res.json(receipt)
          })
}
