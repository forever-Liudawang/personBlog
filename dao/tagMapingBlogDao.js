var createConnect=require('./dbutil');
function insertTagBlogMaping(tagId,blogId,ctime,utime,success){
    var querySql="insert into tag_blog_mapping (tag_id,blog_id,ctime,utime) values (?,?,?,?)";
    var params=[tagId,blogId,ctime,utime];
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
module.exports.insertTagBlogMaping=insertTagBlogMaping;