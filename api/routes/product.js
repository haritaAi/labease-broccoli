const express = require('express');
const router = express.Router();


//middlewares
const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {getAllProducts,createProduct, updateProduct,deleteProduct}  = require('../controllers/product')


router.param("userId",getUserById);



router.get('/products/:userId',isSignedIn,isAuthenticated,getAllProducts);

router.post('/products/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProduct)
 
router.put('/products/update/:userId',isSignedIn,isAuthenticated,isAdmin,updateProduct)

router.delete('/products/delete/:userId',isSignedIn,isAuthenticated,isAdmin,deleteProduct)
module.exports = router;