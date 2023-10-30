const {readFile} = require('fs');
console.log('Start the first task');


readFile('./content/mohamed.txt','utf-8',(err,result)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(result);
    console.log('Complete first task ');
})

console.log('End system set the new task ')

setInterval(()=>{
    console.log('Hi there ');
},2000)

console.log('second task')