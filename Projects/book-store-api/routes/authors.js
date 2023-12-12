const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Author } = require('../models/Author');

const authors = [
    {
    id : 1,
    firstName : "Nasim",
    lastName : "Taleb",
    nationality : "lebanon",
    image : " default-image.png"
    },
];

/* 
*   @desc  Get All authors
*   @route  /api/authors
*   @method GET
*   @access public

*/
router.get("/",async (req ,res)=>{
    try {
        const authorList = await Author.find()
        res.status(200).json(authorList);
    } catch (error) {
        res.status(500).json({message : "Something went wrong"})
    }
})

router.get("/:id",async(req ,res)=>{
    try {
        const author = await Author.findById(req.params.id);
    if (author) {
        res.status(200).json(author)
    }else{
        res.status(404).json({message:"Author not found"});
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Somthing went wrong"})
    }
    
});


router.post("/" ,async(req , res)=>{

    const {error} = validateCreateAuthor(req.body)
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }
    try {
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality:req.body.nationality,
            image: req.body.image,
            
        });
        const result =  await author.save();
    
        res.status(201).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }
     
})


/* 
*   @desc  Update a book
*   @route  /api/books/:id
*   @method PUT
*   @access public

*/
router.put("/:id",(req,res)=>{
    const {error} = validateUpdateBook(req.body)
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const author = authors.find(b=> b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json({message : "Author has been updated "})
    }else{
        res.status(404).json({message : "Author not found"})
    }

})


/* 
*   @desc  Delete an Author
*   @route  /api/authors/:id
*   @method DELETE
*   @access public

*/
router.delete("/:id",(req,res)=>{
    
    const author = authors.find(b=> b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json({message : "author has been deleted "})
    }else{
        res.status(404).json({message : "author not found"})
    }

})

//Validate create Author
function validateCreateAuthor(obj) {
    const schema = Joi.object({
        firstName :  Joi.string().trim().min(3).max(200).required(),
        lastName : Joi.string().min(3).trim().max(200).required(),
        nationality: Joi.string().trim().min(3).max(200).required(),
        image: Joi.string(),
        
    });

    return schema.validate(obj);
}

// Validate  Update Author
function validateUpdateBook(obj) {
    const schema = Joi.object({
        firstName :  Joi.string().trim().min(3).max(200),
        lastName : Joi.string().min(3).trim().max(200),
        nationality: Joi.string().trim().min(3).max(200),
        image: Joi.string(),
    });

    return schema.validate(obj);
}

module.exports = router;