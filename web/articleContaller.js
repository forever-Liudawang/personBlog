var articleDao=require('../dao/articleDao');
var getNowTime=require('../util/getNowTime');
var insertTagMapingBlogDao=require('../dao/tagMapingBlogDao');
var tagDao=require('../dao/tagDao');
var resp=require("../util/resp");
var url=require('url');
var path=new Map();

function insertArticle(request,response){
    var params=url.parse(request.url,true).query;
    console.log("params-------",params)
    var tags=params.tag.replace(/ /g,"").replace("，",",");
    request.on('data',function (data) {
        articleDao.insertArticle(params.title,0,params.tag,getNowTime(),getNowTime(),data.toString(),function (result) {
            response.writeHead(200);
            response.write(resp("success","添加成功",null))
            response.end();
            var blogId=result.insertId;
            var tagList=tags.split(",");
            for(var i=0;i<tagList.length;i++){
                if(tagList[i]==""){
                    continue;
                }
                queryTag(tagList[i],blogId)

            }

        })
    })
}


function queryBlogByPage(request,response){
    var params=url.parse(request.url,true).query;
    console.log("params",params)
    articleDao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),function(result){
        for(var i=0;i<result.length;i++){
            result[i].content=result[i].content.replace(/img[\w\W]*"/,"");
            result[i].content=result[i].content.substring(0,300);
        }
        response.writeHead(200);
        response.write(resp("success","添加成功",result))
        response.end();
    })
}


function queryBlogById(request,response){
    var params=url.parse(request.url,true).query;
    console.log("params",params)
    articleDao.queryBlogById(parseInt(params.bid),function(result){
        response.writeHead(200);
        response.write(resp("success","添加成功",result))
        response.end();
        articleDao.addViews(params.bid,function (res) {
            console.log(res)
        })
    })
}


function queryAllBlog(request,response){
    articleDao.queryAllBlog(function (res) {
        response.writeHead(200);
        response.write(resp("success","添加成功",res))
        response.end();
    })
}


function queryHotBlog(request,response) {
    articleDao.queryHotBlog(5,function(res){
        response.writeHead(200);
        response.write(resp("success","添加成功",res))
        response.end();
    })
}


function queryNewMark(request,response) {
    articleDao.queryNewMark(5,function(res){
        response.writeHead(200);
        response.write(resp("success","添加成功",res))
        response.end();
    })
}

function queryBlogCount(request,response){
    articleDao.queryBlogCount(function(result){
        response.writeHead(200);
        response.write(resp("success","添加成功",result))
        response.end();
    })
}
function queryTag(tag,blogId){
    tagDao.queryTag(tag,function(result){
            if(result==null||result.length==0){
                insertTag(tag,blogId)
            }else{
                insertTagMapingBlogDao.insertTagBlogMaping(result[0].id,blogId,getNowTime(),getNowTime(),function () {
                    
                })
            }
    })
}


function queryTagByTagId(request,response){
    var params=url.parse(request.url,true).query;
    console.log("params-----",params)
    articleDao.queryTagByTagId(params.tagId,function(res){
        console.log('res=======',res[0].tag)
        var tag=res[0].tag
        articleDao.queryBlogByBlogTag(tag,function (res) {
            console.log("res=====+++++",res)
            response.writeHead(200);
            response.write(resp("success","添加成功",res))
            response.end();
        })

    })
}
function insertTag(tag,blogId){
    tagDao.insertTag(tag,getNowTime(),getNowTime(),function(result){
        insertTagMappingBlog(result.insertId,blogId,getNowTime(),getNowTime())
    })
}
function insertTagMappingBlog(tagId,blogId,ctime,utime){
    insertTagMapingBlogDao.insertTagBlogMaping(tagId,blogId,ctime,utime,function(result){

    })
}
path.set('/queryBlogById',queryBlogById);
path.set('/queryBlogCount',queryBlogCount);
path.set('/insertArticle',insertArticle);
path.set('/queryBlogByPage',queryBlogByPage);
path.set('/queryAllBlog',queryAllBlog);
path.set('/queryHotBlog',queryHotBlog);
path.set('/queryNewMark',queryNewMark);
path.set('/queryTagByTagId',queryTagByTagId);
module.exports.path=path;