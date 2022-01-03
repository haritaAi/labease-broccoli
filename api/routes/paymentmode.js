const express = require('express')
const router = express.Router();

const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {createPaymentmode,updatePaymentmode,
       deletePaymentmode,getAllPaymentmodes,
       getPaymentModeById} = require('../controllers/paymentmodes')

//params
router.param("userId",getUserById);
router.param('paymentmodeId',getPaymentModeById)
//routes
//create
router.post('/paymentmodes/create/:userId',isSignedIn,isAuthenticated,isAdmin,createPaymentmode)

//read
router.get('/paymentmodes',getAllPaymentmodes)

//update
router.put('/paymentmodes/update/:userId',isSignedIn,isAuthenticated,isAdmin,updatePaymentmode)

//delete
router.delete('/paymentmodes/delete/:userId',isSignedIn,isAuthenticated,isAdmin,deletePaymentmode)

module.exports = router