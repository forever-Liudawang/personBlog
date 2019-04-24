var articleDao=require('../dao/articleDao');
var getNowTime=require('../util/getNowTime');
var insertTagMapingBlogDao=require('../dao/tagMapingBlogDao');
var commentDao=require('../dao/commentDao');
var resp=require("../util/resp");
var url=require('url');
var captcha=require('svg-captcha')
function insertComment(request,response){
    var params=url.parse(request.url,true).query;
    console.log('insertComment params',params)
    commentDao.insertComment(parseInt(params.bid),params.parent,params.parent_name,params.user_Name,params.content,params.email,getNowTime(),getNowTime(),function (res) {
        console.log(res)
        response.writeHead(200);
        response.write(resp("success","添加成功",null))
        response.end();
    })
}

function randomCode(request,response){
    var img=captcha.create({fontSize:30,with:100,height:34});
    response.writeHead(200);
    response.write(resp("success","添加成功",img))
    response.end();
}


function  queryMarkByBlogId(request,response) {
    var params=url.parse(request.url,true).query;
    commentDao.queryMarkByBlogId(params.bid,function(res){
                console.log(res)
                response.writeHead(200);
                response.write(resp("success","添加成功",res))
                response.end();
    })
}


function  queryCountCommentById(request,response) {
    var params=url.parse(request.url,true).query;
    commentDao.queryCountCommentById(params.bid,function(res){
        console.log(res)
        response.writeHead(200);
        response.write(resp("success","添加成功",res))
        response.end();
    })
}
var path=new Map();
path.set('/insertComment',insertComment);
path.set('/queryCountCommentById',queryCountCommentById);
path.set('/randomCode',randomCode);
path.set('/queryMarkByBlogId',queryMarkByBlogId);

module.exports.path=path;