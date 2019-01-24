<template>
    <div>
        <h3>{{newsInfo.title}}</h3>
        <p id="p1">
            <span>发表时间:{{newsInfo.add_time|dateFormat}}</span>
            <span>点击{{newsInfo.click}}次</span>
        </p>
        <hr>
        <!-- //文章的内容部分 -->
        <div v-html="newsInfo.content"></div>
        <!-- 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>


<script>
import {Toast} from 'mint-ui'
import comment from '../../components/comment/comment.vue'
export default {
    data() {
        return {
            //获取传进来的ID
            id:this.$route.params.id,
            newsInfo:[]
        }
    },
    created() {
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then((result) => {
                if(result.body.status==0){
                    console.log(result);
                    this.newsInfo=result.body.message[0];
                }
            },result=>{
                Toast("读取新闻数据失误")
            });
        }
    },
    components:{
        "cmt-box":comment
    }
}
</script>


<style scoped>
h3{
    font-size: 16px;
   
}
#p1{
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    color: rgb(66,165,245);
    font-size: 13px;
}
</style>
