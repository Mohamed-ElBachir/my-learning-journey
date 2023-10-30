//Sync file 

const {readFileSync , writeFileSync} = require('fs')
const  Mohamed = readFileSync('./content/me.txt','utf-8');
const test = readFileSync('./content/myFolder/text.txt','utf-8')

console.log(Mohamed,test);

writeFileSync('./content/result.txt', `Mohamed : ${Mohamed}, test : ${test}`, {flag: 'a'})


const result = readFileSync('./content/result.txt','utf-8')
console.log(result);