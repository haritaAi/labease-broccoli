const express = require('express');
const router = express.Router();


const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const { getAllReceipts,getReceiptById,
        getNextReceiptSequence,createReceipt,
        updateReceipt,deleteReceipt} = require('../controllers/receipt')


//params
// router.param("clientId",getClientById);
router.param("userId",getUserById);

//routes
//create
router.post('/receipts/create/:userId',isSignedIn,isAuthenticated,isAdmin,getNextReceiptSequence,createReceipt);
//read
router.get('/receipts/:receiptId',getReceiptById);
router.get('/receipts',getAllReceipts);


//update
router.put('/update/receipts/:userId',isSignedIn,isAuthenticated,isAdmin,updateReceipt);

//delete
router.delete('/receipts/delete/:userId',isSignedIn,isAuthenticated,isAdmin,deleteReceipt);





module.exports = router;
