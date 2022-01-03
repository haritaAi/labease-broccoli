const express = require('express')
const router = express.Router();

const {resetPswd,setResetPswd}  = require('../controllers/pswdReset');
const { getUserById } = require('../controllers/user');

router.param("id",getUserById)

// router.get('/resetpswd/:id/:token/',getResetPswd)
router.post('/resetpswd',resetPswd)
router.post('/resetpswd/:id/:token',setResetPswd)

module.exports = router
