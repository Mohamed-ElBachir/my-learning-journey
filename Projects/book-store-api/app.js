const express = require('express');
const BooksPath = require('./routes/books')
const authorsPath = require('./routes/authors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

// Connection To DB
mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log("connection to MongoDB"))
.catch((errror)=>console.log("Connection Failed to MongoDB!: ",errror))
// init App
const app = express()

// Apply Middlewares
app.use(express.json())

//Routes

app.use("/api/books",BooksPath);
app.use("/api/authors",authorsPath);

// Running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`));

