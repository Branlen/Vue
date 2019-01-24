<template>
    <div class="goodsDesc">
       <h3>{{goodsDesc.title}}</h3>
       <hr>
       <div class="content" v-html="goodsDesc.content"></div>
      
    </div> 
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{goodsDesc:{}}
        
    },
    created(){this.getGoodsDesc();},
    methods:{
        getGoodsDesc(){
            this.$http.get("api/goods/getdesc/" + this.$route.params.id).then((result) => {
                if(result.body.status===0){
                    console.log(result);
                    this.goodsDesc = result.body.message[0];
                }
            },(result)=>{
                Toast("读取失败")
            }).catch((err) => {
                
            });
        }
    }
}
</script>        


<style scope>
.goodsDesc>h3{
    font-size: 20px;
    text-align: center;
    margin: 14px 0;
    color:rgb(91, 99, 207);
}
.content img{
    width: 100%;
}
</style>