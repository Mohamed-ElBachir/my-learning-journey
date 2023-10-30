const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req ,res)=>{
    res.sendFile('./views/home.html',{root:__dirname}); // path must be absolute or specify root to res.sendFile
})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}/`)
})