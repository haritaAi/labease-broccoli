const User = require("../models/user");
const {check,validationResult} = require("express-validator");
const { errors }= require("formidable");
const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt');

exports.signout = (req,res) => {
   res.json({
        message : "user Signed out"
    });
};
exports.signup = (req,res) => {

   const errors = validationResult(req);
   if(!errors.isEmpty()) return res.status(400).json({
       error : errors.array()[0].msg
   });


   const user = new User(req.body);
   user.save((err,user) => {
       if(err)return res.status(400).json({
           err: " NOT able to save user in DB"
       });
      
       res.status(200).json({
           name : user.name,
           email : user.email,
           id : user._id,
           role : user.role
       });
   });
   
};

exports.signin = (req,res) => {
    const errors = validationResult(req);
    const {email,password} = req.body;
      if(!errors.isEmpty()){
          return  res.status(400).json({ 
              error : errors.array()[0].msg
          });
      } 

      User.findOne({email}, (err,user) => {
          if(err || !user){ 
              return res.status(400).json({error:"User email does not exist"
            })
          }
          if(!user.authenticate(password)){
               return  res.status(401).json({error : "Email and password do not match"});
          }

             //create token
        const token = jwt.sign({_id : user._id}, process.env.SECRET);
        //put token in cookie
        res.cookie("token",token,{expire: new Date() + 9999});

        //send response to front end
      const {_id,name,email,role} = user;
      return res.json({token, user:{_id,name,email,role}});

      });
 
}; 

exports.signout = (req,res) => {
    res.clearCookie("token");
    res.json({
        message : "User  signed out successfully" 
    });
};
//Protected routes
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty : "auth",
    algorithms: ['HS256']
});
//custom middlewares

exports.isAdmin = (req,res,next) => {
    if(req.profile.role  === 0){
        res.status(403).json({
            error : "You are not admin / Access Denied"
        });
    }
    next();
};
exports.isAuthenticated = (req,res,next) => {
  
   let checker = req.profile && req.auth && (req.profile._id == req.auth._id)
   if(!checker){
       return res.status(403).json({
           error : "ACCESS DENIED"
       }); 
   }
     next(); 
};