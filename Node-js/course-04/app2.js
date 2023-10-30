// Asynchronous read and write files

const {readFile , writeFile} =  require('fs');

readFile('./content/me.txt','utf-8',(err,result)=>{


    var myResult;

    if(err){
        console.log(err);
        return result
    }else{
        myResult=result
        console.log(result);
        readFile('./content/myFolder/me.txt','utf-8',(err2,result2)=>{
            if(err2){
                console.log(err2);
                return
            }
            myResult2 = result2
        })
    }
});