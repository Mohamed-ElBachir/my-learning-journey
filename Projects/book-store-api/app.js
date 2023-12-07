const express = require('express');
const Joi = require('joi')
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
    }
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


app.post("/api/books" ,(req , res)=>{
    /*
    if (!req.body.title || req.body.title <3) {
        return res.status(400).json("title is required and must be more than 3 characters")
    }
    we can use this code but for each key so we gonna write alot of code .
    we have a better solution whoch is using a libreray called JOI 
    */
    const schema = Joi.object({
        title :  Joi.string().trim().min(3).max(200).required(),
        author : Joi.string().min(3).trim().max(200).required(),
        description: Joi.string().trim().min(3).max(500).required(),
        price: Joi.number().min(0).required(),
        cover : Joi.string().trim().required()
    });

    const{ error }=schema.validate(req.body);
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }

    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        description:req.body.description,
        price: req.body.price,
        cover: req.body.cover
    };

    books.push(book);
    res.status(201).json(book) // 201 => created successfully
})

// Running the server
const PORT = 5000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));

