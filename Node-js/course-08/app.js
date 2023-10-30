const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 3000;

app.get('/', (req ,res)=>{
    res.sendFile('./views/home.html',{root:__dirname}); // path must be absolute or specify root to res.sendFile
})



mongoose
.connect('mongodb+srv://achourmedbachir:ljgd8VYI2Y73O7w4@cluster0.ucdx4hf.mongodb.net/all-data?retryWrites=true&w=majority')
.then(()=>{
    app.listen(port, ()=>{
        console.log(`http://localhost:${port}/`)
    })
})
.catch((err)=>{console.log(err)});