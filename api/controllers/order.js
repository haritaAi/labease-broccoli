const Order = require('../models/order')
const OrderCounter = require('../models/orderCounter')


exports.getSequence = (req,res) => {
  OrderCounter.findOne({id:'sequencer'})
              .exec((err,seq) => {
                  if(err) return res.status(400).json({message : 'error in reading sequence'})
                  return res.status(200).json(seq)
              })
}
exports.getNextSequence = (req,res,next) => {
    
    OrderCounter.findOneAndUpdate({id:'sequencer'},{$inc:{sequence_val : 1}},{new : true},(error,sequence)=>{
        if(error) return next(error)
        if(sequence > 999999){
              OrderCounter.findOneAndUpdate({id:'sequencer'},{$set : {sequence_val : 0}},{new:true},(err,seq) => {
                  if(err) return next(err)
              })              
        }
        
   })
   next()
  
    
}

exports.getOrderById = (req,res,next,id) => {
    Order.findById(id)
          .exec((err,order) => {
              if(err)return res.status(400).json(
                  {error : "Order not found"}
              )
              return res.status(200).json(order)
            })
            next();
};

exports.createOrder = (req,res) => {
    
    let order = new Order(req.body);
        order.save((err,order) => {
            if(err)return res.status(400).json(
                {message : "Could not save order in DB "});
            
               res.status(200).json(order);
        })
        

};


exports.deleteOrder = (req,res)=> {
    let order = req.body;
    Order.remove((err,order)=> {
        if(err) return res.status(400).json(
            {message :"failed to delete the order"})
         res.json({message : `deleted order : ${order}`})
        })
}

exports.updateOrder = (req,res) => {
   
    
   
     Order.findOneAndUpdate({_id : req.body._id},{...req.body},{new : true},(error,order) => {
            if(error)return res.status(400).json(
               {message : error});
               res.json(order);
        })
      

}

exports.getAllOrders = (req,res) => {
    
    let sortBy = req.query.sortBy ? req.query.sortBy : "orderdate";

    Order.find()
          .sort([[sortBy,"asc"]]) 
          .populate('clientId')
          .exec((err,order) => {
              if(err)return res.status(400).json({message : "Failed to fetch data"})

             res.json(order);
          })
};


