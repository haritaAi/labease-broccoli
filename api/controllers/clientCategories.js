const ClientCategories = require('../models/clientCategories')


exports.getClientCategoryById = (req,res,next,id) => {
    ClientCategories.findById(id)
             .exec((err,clientCategory) => {
                 if(err) return res.status(400).json(
                     {error : 'clientCategory not found'}
                 )
                 req.profile = clientCategory
                 next()
             })
}
exports.createClientCategory = (req,res) => {
   
    let clientCategory = new ClientCategories(req.body)
     clientCategory.save((err,clientCategory) => {
         if(err) return res.status(400).json(
             {message :`${err}`}
         )
         res.status(200).json(clientCategory)
     })
}
exports.deleteClientCategory = (req,res) => {

    ClientCategories.findOneAndDelete({_id : req.body._id},(err,clientCategory) => {
        if(err) return res.status(400).json({
            message : 'failed to delete the clientCategory'
        })
        res.json(clientCategory)
    })
}
exports.getAllClientCategories = (req,res) => {
    ClientCategories.find()
              .exec((err,clientCategories) => {
                  if(err) return res.staus(400).json({
                      message : `${err}`
                  })
               res.status(200).json(clientCategories)      
              })
}
exports.updateClientCategory = (req,res) => {
      
    ClientCategories.findOneAndUpdate({_id : req.body._id},{...req.body},{new : true},(err,clientCategory) => {
       if(err) return res.status(400).json({message : 'Could Not update clientCategory in db'})
       res.json(clientCategory)
   })
}