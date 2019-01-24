<template>
    <div class="goods-list">

        <div class="goods-item" v-for="item in info" :key="item.id" @click="getDetail(item.id)">
         
            <img :src="item.img_url" alt="">
            <h2>{{item.title}}</h2>
            <div class="infos">
                <p class="price">
                    <span class="new">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>
                        热卖中
                    </span>
                    <span>
                       剩 {{item.stock_quantity}}件
                    </span>
                </p>
            </div>
        </div>  
        <el-button type="danger" plain @click="getMore">加载更多</el-button>
    </div> 
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            info :[],
            number:1    
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            this.$http.get("api/getgoods?pageindex="+this.number).then((result) => {
                if(result.body.status===0){
                    console.log(result);
                    this.info=this.info.concat(result.body.message);
                }
            },(result)=>{
                Toast("读取失败")
            }).catch((err) => {
                
            });
        },
        getMore(){
            this.number++;
            this.getGoodsList();
        },
        getDetail(id){
            //使用js进行路由导航
             // 1. 最简单的
            // this.$router.push("/home/goodsinfo/" + id);
            // 2. 传递对象
            // this.$router.push({ path: "/homeContainer/goodsinfo/" + id });
            // 3. 传递命名的路由
            this.$router.push({name:"goodsInfo",params:{id}})
        }
    }

}
</script>        


<style scope>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
} 
.goods-item{
    width: 49%;
    border: 1px solid #cccccc;
    margin:4px 0px;
    padding: 3px;
    box-shadow: 0 0 4px grey;
}
.goods-list img{  
    width:100%;
}  
.goods-list h2{
    font-size: 14px;
    line-height:18px;
    overflow: hidden;
    height: 34px;
}
.infos{
    background-color: #eee;
    width: 100%
}
.new{
    color: red;
    font-size: 16px;
    font-weight: bold;
}
.old{
    text-decoration: line-through;
    font-size: 14px;
    color: #8f8f94;
    margin-left:10px;
}
.sell{
    display: flex;
    justify-content: space-between;
    margin-bottom: 0px;
}
.el-button--danger.is-plain{
    width: 100%;
    font-size: 19px;
}
</style>