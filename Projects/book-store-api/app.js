const express = require('express');
// init App
const app = express()

// Apply Middlewares
app.use(express.json())

const books =[
    {
        id:1,
        title:"Black Swan",
        author:"Nassim Taleb",
        description:"About Black Swan",
        price:10,
        cover :"soft cover"
    },
    {
        id:2,
        title:"Rich Dad Poor Dad",
        author:"Robert Kiyosaki",
        description:"About Rich dad and poor dad ",
        price:12,
        cover :"soft cover"
    },
]




app.get("/api/books",(req ,res)=>{
    res.status(200).json(books);
})

app.get("/api/books/:id",(req ,res)=>{
    const book = books.find(b=> b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json(book)
    }else{
        res.status(404).json({message:"Book not found"});
    }
});


app.post('/api/books',(req , res)=>{
    console.log(req.body)
    
    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.price,
        description:req.body.description,
        price: req.body.price,
        cover: req.body.cover
    }

    books.push(book);
    res.status(201).json(book) // 201 => created successfully
})

// Running the server
const PORT = 5000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));

