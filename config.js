var fs=require('fs');
var globalConf={};
var confArr=fs.readFileSync('./server.conf').toString().split('\r\n')
for(var i=0;i<confArr.length;i++){
    globalConf[confArr[i].toString().split('=')[0]]=confArr[i].toString().split('=')[1]
}
module.exports=globalConf;

