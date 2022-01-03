const express = require('express');
const router = express.Router();


//middlewares

const { getReceiptCounter} = require('../controllers/receipt');






router.get('/receiptcounter',getReceiptCounter)

module.exports = router;