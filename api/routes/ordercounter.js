const express = require('express');
const router = express.Router();


//middlewares
const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth');
const { getSequence } = require('../controllers/order');






router.get('/ordercounter',getSequence)

module.exports = router;
