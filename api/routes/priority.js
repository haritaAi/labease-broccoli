const express = require('express')
const router = express.Router();

const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {createPriority,updatePriority,
    getAllPriorities,deletePriority,
    getPriorityById} = require('../controllers/priority')

//params
router.param("userId",getUserById);

//routes
//create
router.post('/priorities/create/:userId',isSignedIn,isAuthenticated,isAdmin,createPriority)

//read
router.get('/priorities',getAllPriorities)

//update
router.put('/priorities/update/:userId',isSignedIn,isAuthenticated,isAdmin,updatePriority)

//delete
router.delete('/priorities/delete/:userId',isSignedIn,isAuthenticated,isAdmin,deletePriority)

module.exports = router