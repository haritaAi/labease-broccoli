const express = require('express');
const router = express.Router();


const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {createStaff,updateStaff,deleteStaff,getAllStaff}  = require('../controllers/staff')


//params

router.param("userId",getUserById);
//routes
//create
router.post('/staff/create/:userId',isSignedIn,isAuthenticated,isAdmin,createStaff);

//read
router.get('/staff',getAllStaff);

//update
router.put('/update/staff/:userId',isSignedIn,isAuthenticated,isAdmin,updateStaff);

//delete
router.delete('/staff/:userId',isSignedIn,isAuthenticated,isAdmin,deleteStaff);




module.exports = router;