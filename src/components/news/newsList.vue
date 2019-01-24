<template>
    <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/homeContainer/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class='mui-ellipsis'>
              <span>发表时间：{{ item.add_time | dateFormat }}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>

    </ul>
    </div>
</template>


<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            newslist:[]
        }
    },
    created(){this.getNewsList()},
    methods: {
        getNewsList(){
            this.$http.get('api/getnewslist').then((result) => {
                if(result.body.status==0){
                    console.log(result);
                    this.newslist=result.body.message;
                }
                
            },result=>{
                Toast("获取新闻列表失败")
            });
        }
    }

}
</script>


<style scoped>
.mui-media-body h1{
    font-size: 14px;
}
.mui-media-body p{
    margin-top:10px;
    font-size: 12px;
    display:flex;
    justify-content: space-between;
}
</style>
