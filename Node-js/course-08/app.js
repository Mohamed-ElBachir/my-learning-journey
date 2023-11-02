const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 3000;
app.use(express.urlencoded({extended:true}))
const Mydata = require('./models/mydataSchema')
app.set('view engine','ejs');

app.get('/', (req ,res)=>{
   /* res.sendFile('./views/home.html',{root:__dirname}); */ // path must be absolute or specify root to res.sendFile
   Mydata
   .find()
   .then((result)=>{res.render('home',{mytitle : 'Home Page', arr :  result})})
   .catch((err)=>{console.log(err)})
   
   
   
})

app.get('/index.html', (req ,res)=>{
    res.send('<h1>sending request seccesfully</h1> '); 
})



mongoose
.connect('mongodb+srv://achourmedbachir:ljgd8VYI2Y73O7w4@cluster0.ucdx4hf.mongodb.net/all-data?retryWrites=true&w=majority')
.then(()=>{
    app.listen(port, ()=>{
        console.log(`http://localhost:${port}/`)
    })
})
.catch((err)=>{console.log(err)});

app.post('/',(req ,res)=>{
    console.log(req.body);

    const mydata = new Mydata(req.body);

    mydata
    .save()
    .then(()=>{
        res.redirect('/index.html')

    }).catch((err)=>{
        console.log(err);
    });

})

