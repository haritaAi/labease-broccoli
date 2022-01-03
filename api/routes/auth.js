const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const {signout,signup,signin, isSignedIn} = require('../controllers/auth');


// const signout = (req,res) => {
//     // res.send("user signout success");
//     res.json({
//         message : "User signout"
//     });
// };


router.post("/signup",[
    check("name","name should be minimum 3 character").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","password should be minimum 6 character").isLength({min:6})
],signup);


router.post("/signin",[
   
    check("email","email is required").isEmail(),
    check("password","password is requires").isLength({min:6})
],signin);

router.get("/signout",signout);

router.get("/testroute",isSignedIn, (req,res) => {
    res.send("A protected route"); 
}); 
    

module.exports = router;