const PaymentMode = require('../models/paymentmodes')

exports.getPaymentModeById = (req,res,next,id) => {
    PaymentMode.findById(id)
    .exec((err,paymentmode) => {
        if(err) return res.status(400).json(
            {error : 'paymentmode not found'}
        )
        req.profile = paymentmode
        next()
    })
}
exports.createPaymentmode = (req,res) => {
   
    let paymentmode = new PaymentMode(req.body)
     paymentmode.save((err,paymentmode) => {
         if(err) return res.status(400).json(
             {message :`${err}`}
         )
         res.status(200).json(paymentmode)
     })
}
exports.deletePaymentmode = (req,res) => {
    
    PaymentMode.findOneAndDelete({_id : req.body._id},(err,paymentmode) => {
        if(err) return res.status(400).json({
            message : 'failed to delete the paymentmode'
        })
        res.json(paymentmode)
    })
}
exports.getAllPaymentmodes = (req,res) => {
    PaymentMode.find()
              .exec((err,paymentmode) => {
                  if(err) return res.staus(400).json({
                      message : `${err}`
                  })
               res.status(200).json(paymentmode)      
              })
}
exports.updatePaymentmode = (req,res) => {
      
    PaymentMode.findOneAndUpdate({_id : req.body._id},{...req.body},{new : true},(err,paymentmode) => {
       if(err) return res.status(400).json({message : 'Could Not update paymentmode in db'})
       res.json(paymentmode)
   })
}