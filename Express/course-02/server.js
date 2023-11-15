const express = require('express');

const app = express();

const PORT = 3000;

const friends = [{
    id :0,
    name : 'Issac Newton'
},{
    id :1,
    name : 'Sir Issac Newtoon'
}
]

app.get('/friends', (req , res)=>{
    res.json(friends)
})

app.get('/friends/:friendId', (req,res)=>{
    const friendId = Number(req.params.friendId);
    const firend = friends[friendId]; 
    if(firend){
        res.status(200).json(firend)
    }
    else{
        res.status(404).json({
            error : "friend does not exist "
        });
    }
})

app.get('/messages',(req,res)=>{
    res.send('<ul><li>Hello Albert!</li></ul>')
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });