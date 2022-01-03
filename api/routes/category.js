const express = require('express');
const router = express.Router();


const {getCategories,createCategory} = require('../controllers/category')

router.get('/category',getCategories)

router.post('/category/create',createCategory)

module.exports = router;