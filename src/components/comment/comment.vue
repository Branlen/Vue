<template>
    <div>
        <h3>发表评论</h3>
        <hr>
        <textarea name="" placeholder="请输入你要添加的内容（最多可吐槽120字）" id="" cols="30" rows="5" v-model="commentContent" ></textarea>
        <button class="mint-button mint-button--primary mint-button--large" @click="addComments"> <label class="mint-button-text">发表评论</label></button>  

            <!-- 评论的内容  -->
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="i">
                <div class="cmt-title">
                第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
            </div>
        </div>
        </div>

        
        
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
       
</template> 

<script>
import Toast from 'mint-ui'
export default {
    data() {
        return {
            pageindex:1,
            comments:[],
            commentContent:''
        }
    },
    props:['id'],
    created() {
        this.getCommentList()
    },
    methods: {
        getCommentList(){  
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then((result) => {
                console.log(result)
                if(result.body.status==0){
                    this.comments=this.comments.concat(result.body.message);
                }
            },(result) =>{
                Toast("获取评论失败")
            })
            },
        getMore(){
            this.pageindex++;
            this.getCommentList();
        },
        addComments(){
            if(this.commentContent.trim().length==0){
                return Toast("评论的内容不能为空")
            }
            this.$http.post("api/postcomment/"+this.id,{content:this.commentContent.trim()}).then((result) => {
                if(result.body.status==0){
                    var cmt ={
                        user_name:'匿名用户',
                        add_time:Date.now(),
                        content:this.commentContent.trim()
                    };
                    this.comments.unshift(cmt);
                    this.commentContent=" ";
                }
            });
        }      
    },
}
</script>

<style scope>
.cmt-list{
    margin-top: 5px;
}
.cmt-title{ 
    background-color: gray;
    font-size: 14px;
}
.cmt-body{
    padding-left: 10px;font-size:16px 
}

</style>