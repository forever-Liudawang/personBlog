var left=new Vue({
        el:'#content_left',
        data:{
            content:'I believe that if one always looked at the skies, one would end up with wings.',
            page:1,
            pageSize:7,
            count:100,
            pageNumList:[],
            articleList:[
                {
                    title:'PC端微信(2.6.6.28)防撤回',
                    content:'此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...',
                    data:'2019-04-15',
                    views:101,
                    tags:'微信',
                    id:1,
                    link:'',
                },
                {
                    title:'PC端微信(2.6.6.28)防撤回',
                    content:'此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...',
                    data:'2019-04-15',
                    views:101,
                    tags:'微信',
                    id:1,
                    link:'',
                },
                {
                    title:'PC端微信(2.6.6.28)防撤回',
                    content:'此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...',
                    data:'2019-04-15',
                    views:101,
                    tags:'微信',
                    id:1,
                    link:'',
                },
                {
                    title:'PC端微信(2.6.6.28)防撤回',
                    content:'此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...',
                    data:'2019-04-15',
                    views:101,
                    tags:'微信',
                    id:1,
                    link:'',
                }
            ]
        },
    computed:{
            jumpTo:function (){
                return function (page) {
                    console.log(page,this.pageSize)
                    this.getPage(page,this.pageSize)
                }
            },
            generatePageTool:function () {
                return function(){
                    var nowPage=this.page;
                    var pageSize=this.pageSize;
                    var totalCount=this.count;
                    var result=[];
                    result.push({text:'<<',page:1});
                    if(nowPage>2){
                        result.push({text:nowPage-2,page:nowPage-2})
                    }
                    if(nowPage>1){
                        result.push({text:nowPage-1,page:nowPage-1});
                    }
                        result.push({text:nowPage,page:nowPage})
                    if(nowPage+1<=(totalCount+pageSize-1)/pageSize){
                        result.push({text:nowPage+1,page:nowPage+1})
                    }
                    if(nowPage+2<=(totalCount+pageSize-1)/pageSize){
                        result.push({text:nowPage+2,page:nowPage+2})
                    }
                        result.push({text:'>>',page:parseInt((totalCount+pageSize-1)/pageSize)})
                        this.pageNumList=result
                        return result
                }
            },
            getPage:function (){
                return function(page,pageSize){
                    var reg=location.search
                    var id=reg.split('=')[1];
                    console.log(reg,id)
                    if(reg==""&&!id){
                        console.log('进来了')
                        axios({
                            method:'GET',
                            url:'/queryBlogByPage?page='+(page-1)+"&pageSize="+parseInt(pageSize)
                        }).then(function (res) {
                            var list=[];
                            var result=res.data.data
                            for(var i=0;i<result.length;i++){
                                var temp={};
                                temp.title=result[i].title;
                                temp.views=result[i].views;
                                temp.content=result[i].content;
                                temp.tags=result[i].tags;
                                temp.data=result[i].ctime;
                                temp.link="/blogDetail.html?bid="+result[i].id
                                list.push(temp)
                            }
                            left.articleList=list;
                            left.page=page;
                        }).catch(function (error) {
                            console.log(error)
                        })

                    }else{
                        axios({
                            method:'GET',
                            url:'queryTagByTagId?tagId='+id
                        }).then(function (res) {
                            var list=[];
                            var result=res.data.data
                            console.log('result======++++',result)
                            for(var i=0;i<result.length;i++){
                                var temp={};
                                temp.title=result[i].title;
                                temp.views=result[i].views;
                                temp.content=result[i].content;
                                temp.tags=result[i].tags;
                                temp.data=result[i].ctime;
                                temp.link="/blogDetail.html?bid="+result[i].id
                                list.push(temp)
                            }
                            left.articleList=list;
                            left.page=page;
                        }).catch(function (error) {
                            console.log(error)
                        })

                    }


                    axios({
                        method:'GET',
                        url:'/queryBlogCount',
                    }).then(function(res){
                        left.count=res.data.data[0].count
                        left.generatePageTool();

                    })

                }
            },

    },
    created:function () {
        axios({
            method:'GET',
            url:'/getSing'
        }).then(function (res) {
            var data=res.data.data[0].content
            left.content=data;
        }).catch(function (error) {
            console.log(error)
        });
        this.getPage(this.page,this.pageSize)
    }

})