
const Product = require('../models/products')





exports.getAllProducts = (req,res) => {    
   

    Product.find()         
          .exec((err,product) => {
              if(err)return res.status(400).json({message : "Failed to fetch data"})
   
             res.json(product);
          })
};

exports.createProduct = (req,res) => {

    let product = new Product(req.body);
    product.save((err,prod) => {
        if(err)return res.status(400).json(
            {message : `${err}`});
        
           res.status(200).json(prod);
    })  


}

exports.updateProduct = (req,res) => {
   
    Product.findOneAndUpdate({_id : req.body._id},{...req.body},{new : true},(error,product) => {
        if(error)return res.status(400).json(
           {message : "Could not update product type in DB "});
           res.json(product);
    })
}

exports.deleteProduct = (req,res)=>{
    
    Product.findOneAndDelete({_id : req.body._id},(err,product) => {
        if(err) return res.status(400).json(
            {message :{err}})
         res.status(200).json({message : `deleted product : ${product}`})
    })
}