const Priority = require('../models/priority')


exports.getPriorityById = (req,res,next,id) => {
    Priority.findById(id)
             .exec((err,priority) => {
                 if(err) return res.status(400).json(
                     {error : 'priority not found'}
                 )
                 req.profile = priority
                 next()
             })
}
exports.createPriority = (req,res) => {
   
    let priority = new Priority(req.body)
     priority.save((err,priority) => {
         if(err) return res.status(400).json(
             {message :`${err}`}
         )
         res.status(200).json(priority)
     })
}
exports.deletePriority = (req,res) => {
    
    Priority.findOneAndDelete({_id : req.body._id},(err,priority) => {
        if(err) return res.status(400).json({
            message : 'failed to delete the priority'
        })
        res.json(priority)
    })
}
exports.getAllPriorities = (req,res) => {
    Priority.find()
              .exec((err,priorities) => {
                  if(err) return res.staus(400).json({
                      message : `${err}`
                  })
               res.status(200).json(priorities)      
              })
}
exports.updatePriority = (req,res) => {
      
    Priority.findOneAndUpdate({_id : req.body._id},{...req.body},{new : true},(err,priority) => {
       if(err) return res.status(400).json({message : 'Could Not update priority in db'})
       res.json(priority)
   })
}