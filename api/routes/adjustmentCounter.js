const express = require('express');
const router = express.Router();


//middlewares

const { getAdjustmentCounter} = require('../controllers/adjustment');






router.get('/adjustmentcounter',getAdjustmentCounter)

module.exports = router;
