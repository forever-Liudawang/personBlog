var mapVue=new Vue({
    el:'#wrapper',
    data:{
        blogList:[],
    },
    computed:{
        blogClick:function () {

        }
    },
    created(){
            axios({
                method:'GET',
                url:'/queryAllBlog'
            }).then(function (res) {
                mapVue.blogList=res.data.data
                for(var i=0;i<mapVue.blogList.length;i++){
                    mapVue.blogList[i].hash="/blogDetail.html?bid="+mapVue.blogList[i].id
                }
            }).catch(function (err) {
                console.log(err);
            })
    }
})