var blogDetail=new Vue({
    el:"#blogDetail-left",
    data:{
        title:'',
        content:'',
        ctime:'',
        tags:'',
        views:'',
        randomCode:"",
        rightCode:"",
        markList:[],
        markCount:0
    },
    computed:{
        onComment:function(){
            return function () {
                var url=location.search.indexOf("?")>-1?location.search.split('?')[1].split('&'):"";
                if(url.length==0){
                    return;
                }
                var sureCode=document.getElementById("sureCode");
                var sureCode=sureCode.value;
                console.log(sureCode)
                console.log(blogDetail.rightCode)
                if(sureCode.toLowerCase()!=blogDetail.rightCode.toLowerCase()){
                    alert('验证码有误')
                    return;
                }

                var bid=0;
                for(var i=0;i<url.length;i++){
                    console.log(url[i].split('=')[0])
                    if(url[i].split('=')[0]=='bid'){
                        try {
                            bid=parseInt(url[i].split('=')[1])
                        }catch(e){
                            console.log(e)
                        }
                    }
                }
                var reply=document.getElementById("reply");
                var email=document.getElementById("email");
                var funName=document.getElementById('funName');
                var content=document.getElementById('comment_content');
                var replayName=document.getElementById('reply_name');

                var replyVal=reply.value;
                var emailVal=email.value;
                var funNameVal=funName.value;
                var contentVal=content.value;
                var replyNameVal=replayName.value;
                axios({
                    method:'GET',
                    url:'/insertComment?bid='+bid+'&parent='+ replyVal+'&parent_name='+replyNameVal +'&user_Name='+ funNameVal+'&email='+ emailVal+'&content='+contentVal
                }).then(function(res){
                    console.log(res)
                    alert('提交成功');
                    location.href="/index.html"
                })
            }
        },
        changeCode:function () {
            return function () {
                axios({
                    method:'GET',
                    url:'/randomCode',
                }).then(function(res){
                    blogDetail.randomCode=res.data.data.data
                    blogDetail.rightCode=res.data.data.text

                })
            }
        },
        reply:function () {
            return function (markId,user_name) {
                    document.getElementById("reply").value=markId;
                    document.getElementById("reply_name").value=user_name;
                    location.href="#comment"
            }
        }
    },
    method:{

    },
    created:function () {
        var url=location.search.indexOf("?")>-1?location.search.split('?')[1].split('&'):"";
        if(url.length==0){
            return;
        }
        var bid=0;
        for(var i=0;i<url.length;i++){
            console.log(url[i].split('=')[0])
            if(url[i].split('=')[0]=='bid'){
                try {
                    bid=parseInt(url[i].split('=')[1])
                }catch(e){
                    console.log(e)
                }
            }
        }
        axios({
            method:'GET',
            url:'/queryBlogById?bid='+bid
        }).then(function (res) {
            var result=res.data.data[0];
            blogDetail.title=result.title;
            blogDetail.content=result.content;
            blogDetail.views=result.views;
            blogDetail.tags=result.tags;
            blogDetail.ctiem=result.ctime;
        }).catch(function(e){
            console.log('请求失败')
        });

        axios({
            method:'GET',
            url:'/randomCode',
        }).then(function(res){
            blogDetail.randomCode=res.data.data.data;
            blogDetail.rightCode=res.data.data.text
        })


        axios({
            method:'GET',
            url:'/queryMarkByBlogId?bid='+bid,
        }).then(function(res){
            console.log(res)
            blogDetail.markList=res.data.data;
            for(var i=0;i<blogDetail.markList.length;i++){
                if(blogDetail.markList[i].parent>-1){
                    blogDetail.markList[i].options="回复@"+blogDetail.markList[i].parent_name
                }
            }
        }).catch(function(error){
            console.log(error)
        })

        axios({
            method:'GET',
            url:'/queryCountCommentById?bid='+bid
        }).then(function (res) {
            console.log(res)
            blogDetail.markCount=res.data.data[0].count
        })
    }
})