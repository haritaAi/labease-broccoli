const enclosures = require('../models/enclosures')
const Enclosure = require('../models/enclosures')


exports.getEnclosureById = (req,res,next,id) => {
    Enclosure.findById(id)
             .exec((err,enclosure) => {
                 if(err) return res.status(400).json(
                     {error : 'enclosure not found'}
                 )
                 req.profile = enclosure
                 next()
             })
}
exports.createEnclosure = (req,res) => {
   
    let enclosure = new Enclosure(req.body)
     enclosure.save((err,enclosure) => {
         if(err) return res.status(400).json(
             {message :`${err}`}
         )
         res.status(200).json(enclosure)
     })
}
exports.deleteEnclosure = (req,res) => {
    
    Enclosure.findOneAndDelete({_id : req.body._id},(err,enclosure) => {
        if(err) return res.status(400).json({
            message : 'failed to delete the enclosure'
        })
        res.json(enclosure)
    })
}
exports.getAllEnclosures = (req,res) => {
    enclosures.find()
              .exec((err,enclosures) => {
                  if(err) return res.staus(400).json({
                      message : `${err}`
                  })
               res.status(200).json(enclosures)      
              })
}
exports.updateEnclosure = (req,res) => {
      
    Enclosure.findOneAndUpdate({_id : req.body._id},{...req.body},{new : true},(err,enclosure) => {
       if(err) return res.status(400).json({message : 'Could Not update enclosure in db'})
       res.json(enclosure)
   })
}