const express = require('express');
const router = express.Router();

//middlewares
const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {createAdjustment,getNextAdjustmentSequence,getAdjustmentById,
    updateAdjustment,getAllAdjustments,deleteAdjustment,getAdjustmentByNumber} = require('../controllers/adjustment')

//params
router.param("userId",getUserById);

//routes
//create
router.post('/adjustments/create/:userId',isSignedIn,isAuthenticated,isAdmin,getNextAdjustmentSequence,createAdjustment)

//read
router.get('/adjustments/:adjId',getAdjustmentById)
router.get('/adjustment/:adjustmentNo',getAdjustmentByNumber)

router.get('/adjustments',getAllAdjustments)

router.put('/update/adjustments/:userId',isSignedIn,isAuthenticated,isAdmin,updateAdjustment)

router.delete('/adjustments/delete/:userId',isSignedIn,isAuthenticated,isAdmin,deleteAdjustment)


module.exports = router