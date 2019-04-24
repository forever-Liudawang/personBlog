var createConnect=require('./dbutil');
function insertSing(ctime,content,success){
    var querySql="insert into every_day (ctime,content) values (?,?)";
    var params=[ctime,content];
    createConnect().connect();
    createConnect().query(querySql,params,function(error,result){
        if(error==null){
            success()
        }else{
            console.log(error)
        }
    })
    createConnect().end();
}

function getSing(success){
    var querySql="select * from every_day order by id desc limit 1";
    createConnect().connect();
    createConnect().query(querySql,function(error,result){
        console.log(result)
        if(error==null){
            success(result)
        }else{
            console.log(error)
        }
    })
    createConnect().end();
}

module.exports.insertSing=insertSing;
module.exports.getSing=getSing;