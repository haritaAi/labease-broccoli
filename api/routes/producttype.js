const express = require('express')
const router = express.Router()

const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {createProductType,getProductTypes,updateProductType, deleteProductType}  = require('../controllers/producttype')


router.param("userId",getUserById);

router.get('/producttypes',getProductTypes)

router.post('/producttypes/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProductType)

router.put('/producttypes/update/:userId',isSignedIn,isAuthenticated,isAdmin,updateProductType)

router.delete('/producttypes/delete/:userId',isSignedIn,isAuthenticated,isAdmin,deleteProductType)

module.exports = router