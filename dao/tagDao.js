var createConnect=require('./dbutil');
function insertTag(tag,ctime,utime,success){
    var querySql="insert into tags (`tag`,`utime`,`ctime`) values (?,?,?)";
    var params=[tag,ctime,utime];
    createConnect().connect();
    createConnect().query(querySql,params,function(error,result){
        if(error==null){
            success(result)
        }else{
            console.log(error)
        }
    })
    createConnect().end();
}


function queryTag(tag,success){
    var querySql="select * from tags where tag=?";
    var params=[tag];
    createConnect().connect();
    createConnect().query(querySql,params,function(error,result){
        if(error==null){
            success(result)
        }else{
            console.log(error)
        }
    })
    createConnect().end();
}


function queryAllTags(success){
    var querySql="select * from tags";
    var params=[];
    createConnect().connect();
    createConnect().query(querySql,params,function(error,result){
        if(error==null){
            success(result)
        }else{
            console.log(error)
        }
    })
    createConnect().end();
}


module.exports.insertTag=insertTag;
module.exports.queryTag=queryTag;
module.exports.queryAllTags=queryAllTags;

