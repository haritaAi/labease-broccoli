const PriceBand = require('../models/priceband')


exports.getPricebandById = (req,res,next,id) => {
    PriceBand.findById(id)
             .exec((err,priceband) => {
                 if(err) return res.status(400).json(
                     {error : 'priceband not found'}
                 )
                 req.profile = priceband
                 next()
             })
}
exports.createPriceband = (req,res) => {
   
    let priceband = new PriceBand(req.body)
     priceband.save((err,priceband) => {
         if(err) return res.status(400).json(
             {message :`${err}`}
         )
         res.status(200).json(priceband)
     })
}
exports.deletePriceband = (req,res) => {
    // let priceband = req.body;
    
    PriceBand.findOneAndDelete({_id : req.body._id},(err,priceband) => {
        if(err) return res.status(400).json({
            message : 'failed to delete the priceband'
        })
        res.json(priceband)
    })
}
exports.getAllPricebands = (req,res) => {
    PriceBand.find()
              .exec((err,pricebands) => {
                  if(err) return res.staus(400).json({
                      message : `${err}`
                  })
               res.status(200).json(pricebands)      
              })
}
exports.updatePriceband = (req,res) => {
      
    PriceBand.findOneAndUpdate({_id : req.body._id},{...req.body},{new : true},(err,priceband) => {
       if(err) return res.status(400).json({message : 'Could Not update priceband in db'})
       res.json(priceband)
   })
}