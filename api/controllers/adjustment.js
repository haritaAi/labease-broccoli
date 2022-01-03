
const Adjustment = require('../models/adjustment')
const AdjustmentCounter = require('../models/adjustmentCodeCounter')


exports.getAdjustmentCounter = (req,res) => {
   

    AdjustmentCounter.findOne({id:'sequencer'})
                .exec((err,seq) => {
                    if(err) return res.status(400).json({message : 'error in reading sequence'})
                
                    return res.status(200).json(seq)
                })
  }

  exports.getNextAdjustmentSequence = (req,res,next) => {
      
    AdjustmentCounter.findOneAndUpdate({id:'sequencer'},{$inc:{sequence_val : 1}},{new : true},(error,sequence)=>{
          if(error) return next(error)          
     })
     next()          
  }

exports.getAdjustmentById = (req,res,next,id) => {

    Adjustment.findById(id)
          .exec((err,adjustment) => {
              if(err)return res.status(400).json(
                  {error : "Adjustment not found"}
              )
              req.profile = adjustment;
              next();
          })
};

exports.createAdjustment = (req,res) => {    
       
    let adjustment = new Adjustment(req.body);
    adjustment.save((err,adjustment) => {
            if(err)return res.status(400).json(
                {message : `${err}`});
            
               res.status(200).json(adjustment);
        })       

};

exports.updateAdjustment = (req,res) => {       
    
         Adjustment.findOneAndUpdate({_id : req.body._id},{...req.body},{new : true},(error,adjustment) => {
            if(error)return res.status(400).json(                
               {message : "Could not update client in DB "});
               res.json(adjustment);
        })    

}

exports.getAllAdjustments = (req,res) => {     

    Adjustment.find()   
              .populate('client')
              .populate('invoice')           
              .exec((err,adjustments) => {
                   if(err)return res.status(400).json({message : "Failed to fetch data"})
                
                   res.json(adjustments); 
                 })
};

exports.deleteAdjustment = (req,res) => {
    let adjustment = req.body;
    Adjustment.findOneAndDelete({_id : req.body._id},(err,adjustment) => {
        if(err) return res.status(400).json({
            message : 'failed to delete the adjustment'
        })
        res.json(adjustment)
    })
}

exports.getAdjustmentByNumber = (req,res) => {
    let adjnum = req.params
    console.log("REquest for adjustment no ",adjnum)
    adjustment.findOne({adjNo : req.params},(err,adjustment) => {
        if(err) return res.status(400).json({
            message :'failed to fetch the adjustment'
        })
        res.json(adjustment)
    })
}