const ProductType = require('../models/productType')

exports.createProductType = (req,res) => {
    


    let prodtype = new ProductType(req.body);
    prodtype.save((err,prodtype) => {
        if(err)return res.status(400).json(
            {message : `${err}`});
        
           res.status(200).json(prodtype);
    })
    

}

exports.getProductTypes =(req,res) => {

   ProductType.find()         
             .exec((err,prodtype) => {
              if(err)return res.status(400).json({message : "Failed to fetch data"})

             res.json(prodtype);
          })
}

exports.updateProductType = (req,res) => {
    
     ProductType.findOneAndUpdate({_id : req.body._id},{...req.body},{new : true},(error,prodtype) => {
        if(error)return res.status(400).json(
           {message : "Could not update product type in DB "});
           res.json(prodtype);
    })
  
}
exports.deleteProductType =  (req,res) => {
    
    
    ProductType.findOneAndDelete({_id : req.body._id},(err,prodType) => {
        if(err) return res.status(400).json(
            {message :{err}})
         res.json({message : `deleted product type : ${prodType}`})
    })
   
}