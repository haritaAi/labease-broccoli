const express = require('express');
const router = express.Router();

//middlewares
const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {getOrder,getOrderById,
       getAllOrders,createOrder,
       updateOrder,deleteOrder,getNextSequence}  = require('../controllers/order')


//params
// router.param("clientId",getClientById);
router.param("userId",getUserById);

//routes
//create
router.post('/orders/create/:userId',isSignedIn,isAuthenticated,isAdmin,getNextSequence,createOrder);
//read
router.get('/orders/:clientId',getOrderById);
router.get('/orders',getAllOrders);

//update
router.put('/update/orders/:userId',isSignedIn,isAuthenticated,isAdmin,updateOrder);

//delete
router.delete('/orders/:userId',isSignedIn,isAuthenticated,isAdmin,deleteOrder);





module.exports = router;