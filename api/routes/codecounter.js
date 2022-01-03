const express = require('express');
const router = express.Router();


//middlewares

const { getClientSequence } = require('../controllers/client');






router.get('/clientcounter',getClientSequence)

module.exports = router;
