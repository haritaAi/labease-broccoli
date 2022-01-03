const { validationResult } = require("express-validator");
const { errors }= require("formidable");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt');


const nodemailer = require('nodemailer')


 let  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {     
      user: "smarthead123456@gmail.com",
      pass: 'abc123456`',      
    },
   });


exports.resetPswd = (req,res) => {
    const errors = validationResult(req)
    const {email} = req.body
    if(!errors.isEmpty()){
        return  res.status(400).json({ 
            error : errors.array()[0].msg
        });
    } 
    //make sure  if user exists in db
    User.findOne({email},(err,user) => {
        if(err|| !user){
            return res.status(400).json({error : "user email does not exist"})
        }
        //if user exists then send link valid for 15 minutes
         const new_secret = process.env.SECRET+user.hash_password
         const payload = {
             email : user.email,
             id : user._id
         }
         const token = jwt.sign(payload,new_secret,{expiresIn:'15m'})
         const link = `http://localhost:3000/labease/reset-pswd/${user._id}/${token}`
         console.log(link)
         var message = {
            from: "smarthead123456.gmail.com",
            to: "devspacecalicut@gmail.com",
            subject: "Reset Password",
            text: `hi, there ..click the link to reset password`,
            html : `<div><h3>Hello , ${user.name}</h3> <a href=${link} >click here</a> to reset pasword </div>`
          };
        
         transporter.sendMail(message,function(err,info){
             
            if(err){
                console.log(err)
            }
            else console.log('Email sent : '+ info.response)
        })
           res.json({message :"Password has been reset"})

        })
   

}


exports.setResetPswd = (req,res,next) => {
    const {npswd} = req.body
    
    const {id,token} = req.params
    User.findOne({id},(err,user) => {
        if(err || !user)
           return res.status(400).json({error : 'invalid user'})
        else {
            
            const secret = process.env.SECRET+user.hash_password
             try{
                const payload  = jwt.verify(token,secret)   
                let hash_password =  user.securePassword(npswd) 
                
                 User.findByIdAndUpdate(
                   {_id : payload.id},
                   {$set : {hash_password}},
                   {new : true},
                   (err,user) => {
                       if(err)return res.status(400).json({
                           error : "UPDATE NOT SUCCESSFULL"
                       });
                       user.salt =undefined;
                       user.hash_password = undefined;
                       user.createdAt = undefined;
                       user.updatedAt = undefined; 
   
                       res.status(200).json(user);
                   })
             }
             catch{
                 res.status(400).send("Invalid User")
             }
            
            

            }      

           })
}