const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Schema (the structure of the article)
const articleSchema = new Schema({
    userNameee : String
})

// Create a model based on that schema 
const Mydata = mongoose.model('Mydataa',articleSchema);


//Export the model 
module.exports = Mydata;