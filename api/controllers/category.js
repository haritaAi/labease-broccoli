const Category = require('../models/category')



exports.getCategories = (req,res) => {
   
    Category.find()                    
           .exec((err,categories) => {
              if(err)return res.status(400).json({message : "Failed to fetch data"})

             res.json(categories);
          })
};

exports.createCategory = (req,res) => {
   

    let category = new Category(req.body);
        category.save((err,category) => {
            if(err)return res.status(400).json(
                {message : `${err}`});
            
               res.status(200).json(category);
        })
        
}