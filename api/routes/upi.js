const express = require('express')
const router = express.Router();

const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {createUPI,updateUPI,deleteUPI,getAllUPI,getUPIById} = require('../controllers/upi')

//params
router.param("userId",getUserById);
router.param('upiId',getUPIById)
//routes
//create
router.post('/upi/create/:userId',isSignedIn,isAuthenticated,isAdmin,createUPI)

//read
router.get('/upi',getAllUPI)

//update
router.put('/upi/update/:userId',isSignedIn,isAuthenticated,isAdmin,updateUPI)

//delete
router.delete('/upi/delete/:userId',isSignedIn,isAuthenticated,isAdmin,deleteUPI)

module.exports = router