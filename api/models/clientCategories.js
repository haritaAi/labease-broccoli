const mongoose = require('mongoose')

const clientCategorySchema = new mongoose.Schema({
    name :String,    
})

module.exports = mongoose.model("ClientCategories",clientCategorySchema)