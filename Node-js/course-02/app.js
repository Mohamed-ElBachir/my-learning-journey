/*
console.log(__dirname); //output: D:\projects\learning\Node-js\course-02


console.log(__filename); // output : D:\projects\learning\Node-js\course-02\app.js


setInterval(()=>{
    console.log('Hello World')
},1000)  // it gonna show th message Hello world each 1s 
*/


const names = require('./modules')
const funcs = require('./function')
const objs = require('./objects')

funcs('Lord')
funcs(names.name1);
funcs(names.name1);



//console.log(names)