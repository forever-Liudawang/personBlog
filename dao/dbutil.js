var mysql=require('mysql');
function createConnect(){
    var connection=mysql.createConnection({
        host:'10.21.14.77',
        password:"199800",
        user:"root",
        port:"3306",
        database:"myblog"
    })
    return connection
}
module.exports=createConnect;
