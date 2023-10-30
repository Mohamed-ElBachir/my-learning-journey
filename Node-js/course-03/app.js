// OS modules

const os = require('os')

//const user = os.userInfo();
//console.log(user);
/*
Output: 
{
  uid: -1,
  gid: -1,
  username: 'name',
  homedir: 'C:\\Users\\name',
  shell: null
}
*/

//console.log(os.uptime());

const curruntOs = {
    name : os.type(),
    release : os.release(),
    memory : os.totalmem(),
    freeSp : os.freemem()
}

console.log(curruntOs);