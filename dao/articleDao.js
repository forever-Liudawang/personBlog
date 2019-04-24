var createConnect=require('./dbutil');
function insertArticle(title,views,tags,utime,ctime,content,success){
    var querySql="insert into blog (`title`,`views`,`tags`,`utime`,`ctime`,`content`) values (?,?,?,?,?,?)";
    var params=[title,views,tags,utime,ctime,content];
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

function queryBlogById(id,success) {
    var querySql="select * from blog where id = ?";
    var params=[id];
    createConnect().connect();
    createConnect().query(querySql,params,function(error,result){
        console.log("result",result)
        if(error==null){
            success(result)
        }else{
            console.log(error)
        }
    })
    createConnect().end();
}

function addViews(id,success){
    var querySql="update blog set views=views+1 where id=?";
    var params=[id];
    createConnect().connect();
    createConnect().query(querySql,params,function(error,result){
        console.log("result",result)
        if(error==null){
            success(result)
        }else{
            console.log(error)
        }
    })
    createConnect().end();
}

function queryBlogByPage(page,pageSize,success){
    var querySql="select * from blog order by id desc limit ?,?";
    var params=[page*pageSize,pageSize];
    createConnect().connect();
    createConnect().query(querySql,params,function(error,result){
        console.log("result",result)
        if(error==null){
            success(result)
        }else{
            console.log(error)
        }
    })
    createConnect().end();
}

function queryHotBlog(size,success){
    var querySql="select * from blog order by id desc limit ?";
    var params=[size];
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


function queryNewMark(size,success){
    var querySql="select * from comments order by id desc limit ?";
    var params=[size];
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

function queryBlogCount(success){
    var querySql="select count(1) as count from blog";
    createConnect().connect();
    createConnect().query(querySql,function(error,result){
        if(error==null){
            success(result)
        }else{
            console.log(error)
        }
    })
    createConnect().end();
}



function queryTagByTagId(tagId,success) {
    var querySql="select * from tags where id = ?";
    createConnect().connect();
    createConnect().query(querySql,tagId,function(error,result){
        if(error==null){
            success(result)
        }else{
            console.log(error)
        }
    })
    createConnect().end();
}

function queryBlogByBlogTag(tag,success){
    var querySql="select * from blog where tags = ?";
    createConnect().connect();
    createConnect().query(querySql,tag,function(error,result){
        if(error==null){
            success(result)
        }else{
            console.log(error)
        }
    })
    createConnect().end();
}
function queryAllBlog(success){
    var querySql="select * from blog";
    createConnect().connect();
    createConnect().query(querySql,function(error,result){
        if(error==null){
            success(result)
        }else{
            console.log(error)
        }
    })
    createConnect().end();
}
module.exports.queryBlogById=queryBlogById;
module.exports.queryBlogCount=queryBlogCount;
module.exports.queryBlogByPage=queryBlogByPage;
module.exports.insertArticle=insertArticle;
module.exports.queryAllBlog=queryAllBlog;
module.exports.addViews=addViews;
module.exports.queryHotBlog=queryHotBlog;
module.exports.queryNewMark=queryNewMark;
module.exports.queryTagByTagId=queryTagByTagId;
module.exports.queryBlogByBlogTag=queryBlogByBlogTag;


