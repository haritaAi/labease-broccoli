const express = require('express')
const router = express.Router();

const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {createPriceband,updatePriceband,
    getAllPricebands,deletePriceband,
    getPricebandById} = require('../controllers/priceband')

//params
router.param("userId",getUserById);
// router.param('pricebandId',getPricebandById)
//routes
//create
router.post('/pricebands/create/:userId',isSignedIn,isAuthenticated,isAdmin,createPriceband)

//read
router.get('/pricebands',getAllPricebands)

//update
router.put('/pricebands/update/:userId',isSignedIn,isAuthenticated,isAdmin,updatePriceband)

//delete
router.delete('/pricebands/delete/:userId',isSignedIn,isAuthenticated,isAdmin,deletePriceband)

module.exports = router