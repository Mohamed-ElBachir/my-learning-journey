const express = require('express');
const BooksPath = require('./routes/books')
const authorsPath = require('./routes/authors');
const mongoose = require('mongoose');

// Connection To DB
mongoose
.connect("mongodb+srv://achourmedbachir:book-store-api@cluster0.fezjlmu.mongodb.net/")
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
const PORT = 5000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));

