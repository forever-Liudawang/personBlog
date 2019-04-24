var articleDao=require('../dao/articleDao');
var getNowTime=require('../util/getNowTime');
var insertTagMapingBlogDao=require('../dao/tagMapingBlogDao');
var tagDao=require('../dao/tagDao');
var resp=require("../util/resp");

function queryAllTags(request,response){
    tagDao.queryAllTags(function(result){
                console.log(result)
                response.writeHead(200);
                response.write(resp("success","添加成功",result))
                response.end();
    })
}

var path=new Map();
path.set('/queryAllTags',queryAllTags)
module.exports.path=path;