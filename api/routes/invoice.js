const express = require('express');
const router = express.Router();


const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const { getAllInvoices,getInvoiceById,
        getNextInvoiceSequence,createInvoice,
        updateInvoice,deleteInvoice,getAllUnpaidInvoices,
        getAllPaidInvoices,getAllCancelledInvoices,getInvoicesByClientId} = require('../controllers/invoice')


//params
// router.param("clientId",getClientById);
router.param("userId",getUserById);

//routes
//create
router.post('/invoices/create/:userId',isSignedIn,isAuthenticated,isAdmin,getNextInvoiceSequence,createInvoice);
//read
router.get('/invoices/:invoiceId',getInvoiceById);
router.get('/invoices',getAllInvoices);
router.get('/invoices/client',getInvoicesByClientId)
router.get('/invoices/unpaid',getAllUnpaidInvoices);
router.get('/invoices/paid',getAllPaidInvoices);
router.get('/invoices/cancelled',getAllCancelledInvoices);

//update
router.put('/update/invoices/:userId',isSignedIn,isAuthenticated,isAdmin,updateInvoice);

//delete
router.delete('/invoices/:userId',isSignedIn,isAuthenticated,isAdmin,deleteInvoice);





module.exports = router;
