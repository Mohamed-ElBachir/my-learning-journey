const express = require('express');
const BooksPath = require('./routes/books')
// init App
const app = express()

// Apply Middlewares
app.use(express.json())


//Routes

app.use("/api/books",BooksPath)

// Running the server
const PORT = 5000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));

