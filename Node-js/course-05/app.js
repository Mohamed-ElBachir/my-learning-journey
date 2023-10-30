// http model 

const http = require('http');

const server = http.createServer( (req,res )=>{

    console.log(req);
    res.write('Welcome in our web server');
    res.end();
} );

server.listen(3000);