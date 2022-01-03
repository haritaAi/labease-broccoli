const express = require('express')
const router = express.Router();

const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {createEnclosure,updateEnclosure,
    getAllEnclosures,deleteEnclosure,
    getEnclosureById} = require('../controllers/enclosure')

//params
router.param("userId",getUserById);
router.param('enclosureId',getEnclosureById)
//routes
//create
router.post('/enclosures/create/:userId',isSignedIn,isAuthenticated,isAdmin,createEnclosure)

//read
router.get('/enclosures',getAllEnclosures)

//update
router.put('/enclosures/update/:userId',isSignedIn,isAuthenticated,isAdmin,updateEnclosure)

//delete
router.delete('/enclosures/delete/:userId',isSignedIn,isAuthenticated,isAdmin,deleteEnclosure)

module.exports = router