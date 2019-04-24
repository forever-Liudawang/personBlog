var base=new  Vue({
    el:'#content_id',
    data:{
        tagList:[],
        hotList:[],
        remarkList:[]
    },
    computed:{
        randomColor:function (){
           return function () {
               var red=Math.random()*255;
               var green=Math.random()*255;
               var black=Math.random()*255;
               var rgb="rgb("+ red+","+ green+","+ black+")";
               return rgb
           }
        },
        randomFontSize:function () {
            return function(){
                var size=(Math.random()*22+10)+'px';
                return size
            }
        }
    },
    created(){
        axios({
            method:'GET',
            url:'/queryAllTags',
        }).then(function(res){
            console.log(res)
            base.tagList=res.data.data;
            for(var i=0;i<base.tagList.length;i++){
                base.tagList[i].href="/index.html?id="+base.tagList[i].id
            }
        }).catch(function (err) {
            console.log(err)
        })
        axios({
            method:'GET',
            url:'/queryHotBlog'
        }).then(function (res) {
            base.hotList=res.data.data
            for(var i=0;i<base.hotList.length;i++){
                base.hotList[i].link='/blogDetail.html?bid='+base.hotList[i].id
            }
        }).catch(function (err) {            console.log(err);

        })
        axios({
            method:'GET',
            url:'/queryNewMark'
        }).then(function (res) {
            base.remarkList=res.data.data
        }).catch(function (err) {
            console.log(err)
        })
    }
})