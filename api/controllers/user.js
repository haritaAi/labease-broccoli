const User = require('../models/user');


exports.getUserById = (req,res,next,id) => {   
  
    User.findById(id)
        .exec((err,user) =>{
        if(err || !user){
            return res.status(400).json({
                error : "no user found in db"
            })
           }
            req.profile = user;
            next();
        } )
};

exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify : false},
        (err,user) => {
            if(err)return res.status(400).json({
                error : "UPDATE NOT SUCCESSFULL"
            });
            user.salt =undefined;
            user.hash_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined; 
            res.json(user);
        }
    )
}
exports.getUser = (req,res) => {
    req.profile.salt = undefined;
    req.profile.hash_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined; 
    return res.json(req.profile);
}