var dao=require('../dao/singDao');
var getNowTime=require('../util/getNowTime');
var resp=require("../util/resp");
var path=new Map();
function editSing(request,response){
    request.on('data',function (data) {
            dao.insertSing(getNowTime(),data.toString(),function (error,result) {
                response.writeHead(200);
                response.write(resp("success","添加成功",null))
                response.end();
            })
    })
}

function getSing(request,response){
        dao.getSing(function (result) {
            console.log(result)
            response.writeHead(200);
            response.write(resp("success","添加成功",result));
            response.end();
        })
}
path.set('/editSing',editSing);
path.set('/getSing',getSing)
module.exports.path=path