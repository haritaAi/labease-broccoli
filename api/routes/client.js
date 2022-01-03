const express = require('express');
const router = express.Router();

//middlewares
const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {getClient,getClientById,
       getAllClients,createClient,
       updateClient,deleteClient,getNextClientSequence}  = require('../controllers/client')


//params

router.param("userId",getUserById);

//routes
//create
router.post('/clients/create/:userId',isSignedIn,isAuthenticated,isAdmin,getNextClientSequence,createClient);
//read
router.get('/clients/:clientId',getClientById);

router.get('/clients/:userId',getAllClients);

//update
router.put('/update/clients/:userId',isSignedIn,isAuthenticated,isAdmin,updateClient);

//delete
router.delete('/clients/:clientId/:userId',isSignedIn,isAuthenticated,isAdmin,deleteClient);

//Listing routes
router.get('/clients', getAllClients);


module.exports = router;