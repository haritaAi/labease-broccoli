const express = require('express')
const router = express.Router();

const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {createClientCategory,updateClientCategory,
    getAllClientCategories,deleteClientCategory,
    getClientCategoryById} = require('../controllers/clientCategories')

//params
router.param("userId",getUserById);
router.param('clientcategoryId',getClientCategoryById)
//routes
//create
router.post('/clientcategories/create/:userId',isSignedIn,isAuthenticated,isAdmin,createClientCategory)

//read
router.get('/clientcategories',getAllClientCategories)

//update
router.put('/clientcategories/update/:userId',isSignedIn,isAuthenticated,isAdmin,updateClientCategory)

//delete
router.delete('/clientcategories/delete/:clientcategoryId',isSignedIn,isAuthenticated,isAdmin,deleteClientCategory)

module.exports = router