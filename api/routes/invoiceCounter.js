const express = require('express');
const router = express.Router();


//middlewares

const { getInvoiceCounter} = require('../controllers/invoice');






router.get('/invoicecounter',getInvoiceCounter)

module.exports = router;
