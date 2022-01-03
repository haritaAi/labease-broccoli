const  mongoose = require("mongoose");
const crypto = require('crypto');
const  uuidv1 = require('uuidv1');

let userSchema =new mongoose.Schema({
     name : {
         type : String,
         required : true,
         maxlength : 255,
         trim : true,
     },    
     email : {
         type : String,
         trim : true,
         required : true,
        //  unique : true
     },    
   
     hash_password :{
         type : String,
         required : true
     },
     salt : String,
     role:{
         type : Number,
         default : 1,
         required : true
     }
    
     
     
    },
    {timestamps : true}
);

userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.hash_password = this.securePassword(password);
       
    })
    .get(function(){       
        return this._password;
    })

userSchema.methods = {
    authenticate: function(password){
        
       return this.securePassword(password) === this.hash_password;
    },
  
  
    securePassword: function(password){
        if(!password)return "";
        try{
            
       return  crypto.createHmac("sha256", this.salt)
          .update(password) 
          .digest("hex");
         
         
 
        }catch(err){
          
            return "";      
            }
    } 
}

module.exports = mongoose.model("User", userSchema);