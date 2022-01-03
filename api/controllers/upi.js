const Upi = require('../models/upi')

exports.getUPIById = (req,res,next,id) => {
    Upi.findById(id)
    .exec((err,upi) => {
        if(err) return res.status(400).json(
            {error : 'upi not found'}
        )
        req.profile = upi
        next()
    })
}
exports.createUPI = (req,res) => {
   
    let upi = new Upi(req.body)
     upi.save((err,upi) => {
         if(err) return res.status(400).json(
             {message :`${err}`}
         )
         res.status(200).json(upi)
     })
}
exports.deleteUPI = (req,res) => {
    
    Upi.findOneAndDelete({_id : req.body._id},(err,upi) => {
        if(err) return res.status(400).json({
            message : 'failed to delete the upi'
        })
        res.json(upi)
    })
}
exports.getAllUPI = (req,res) => {
    Upi.find()
              .exec((err,upi) => {
                  if(err) return res.staus(400).json({
                      message : `${err}`
                  })
               res.status(200).json(upi)      
              })
}
exports.updateUPI = (req,res) => {
      
    Upi.findOneAndUpdate({_id : req.body._id},{...req.body},{new : true},(err,upi) => {
       if(err) return res.status(400).json({message : 'Could Not update upi in db'})
       res.json(upi)
   })
}