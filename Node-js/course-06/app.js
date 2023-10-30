// sending responses

const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res)=>{

    const url = req.url;
    const method = req.method
    if (url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action ="/message" method ="POST"> <input type ="text"> <button type = "submit">Submit</button> </input> </form></body>');
        res.write('</head>')
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
        
        const body =[] ;
        req.on('data',(chunk)=>{
            console.log(chunk)
            body.push(chunk);
        });
        req.on()
        fs.writeFileSync('message.txt','DUMMY');
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    }


    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello From my Node.js Server </h1></body>');
    res.write('</head>')
    res.end();

});

server.listen(3000)