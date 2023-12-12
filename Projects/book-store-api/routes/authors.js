const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler")
const { Author ,validateCreateAuthor , validateUpdateAuthor } = require('../models/Author');

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
router.get("/",asyncHandler(
    async (req ,res)=>{
        const authorList = await Author.find()
        res.status(200).json(authorList);
    }
));

router.get("/:id",asyncHandler(
    async(req ,res)=>{
    const author = await Author.findById(req.params.id);
    if (author) {res.status(200).json(author)}
    else{res.status(404).json({message:"Author not found"})}


}));


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
router.put("/:id",async (req,res)=>{
    const {error} = validateUpdateAuthor(req.body)
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    try {
        const author = await Author.findByIdAndUpdate(req.params.id,{
            $set:{
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    nationality: req.body.nationality,
                    image: req.body.image,
            }
        },{new : true})
    
        res.status(200).json(author)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }

})


/* 
*   @desc  Delete an Author
*   @route  /api/authors/:id
*   @method DELETE
*   @access public

*/
router.delete("/:id",async(req,res)=>{
    try {
        const author = await Author.findById(req.params.id)
    if (author) {
        await Author.findByIdAndDelete(req.params.id)
        res.status(200).json({message : "author has been deleted "})
    }else{
        res.status(404).json({message : "author not found"})
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }
    

})

module.exports = router;