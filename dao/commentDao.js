var createConnect=require('./dbutil');
function insertComment(blog_id,parent,parent_name,user_name,comments,email,ctime,utime,success){
    var querySql="insert into comments (blog_id,parent,parent_name,user_name,comments,email,ctime,utime) values (?,?,?,?,?,?,?,?)";
    var params=[blog_id,parent,parent_name,user_name,comments,email,ctime,utime];
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


function queryMarkByBlogId(blog_id,success){
    var querySql="select * from comments where blog_id = ?";
    var params=[blog_id];
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


function queryCountCommentById(blog_id,success){
    var querySql="select count(1) as count from comments where blog_id = ?";
    var params=[blog_id];
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
module.exports.queryCountCommentById=queryCountCommentById;

module.exports.insertComment=insertComment;
module.exports.queryMarkByBlogId=queryMarkByBlogId;