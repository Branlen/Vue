<template>
    <div class="ShopContainer">
        <!-- 购物车列表区域 -->
        <div class="shopCarList">
            <div class="mui-card" v-for="(item,i) in shopCarList" :key="item.id">
			<div class="mui-card-content">
					<div class="mui-card-content-inner first"> 
                        <mt-switch @change="changeSelectd(item.id,$store.getters.getSelected[item.id])" v-model="$store.getters.getSelected[item.id]"></mt-switch>
						<img id="img" :src="item.thumb_path" >
                        <div class="info2">
                            <h1>{{item.title}}</h1>
                            <p><span class="red">￥{{item.sell_price}}</span> 
                            <numberbox :idCount="$store.getters.getCountId[item.id]" :id="item.id"></numberbox> 
                            <a href="#" @click.prevent="removeGoods(item.id,i)">删除</a></p>
                        </div>  
					</div>
				</div>
			</div>
        </div>
        <!-- 购物车结算区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner two">
					    <div class="jiesuan">
                            <p>总计（不含费用）</p>
                            <p>已勾选商品<span class="red" > {{$store.getters.getChooseCount}}</span>件 ,总价
                            <span class="red">￥{{$store.getters.getChooseMoney}}</span></p>
                        </div>
                        <mt-button type="danger" size="small">去结算</mt-button>
                        
					</div>
				</div>
			</div>
    </div>
</template>
<script>
import numberbox from '../comment/shopping_numberbox'
export default {
    data(){
        return{
            shopCarList:[],
            value:true
        }
    },
    created(){
        this.getshopCarList();
    },
    methods:{
        getshopCarList(){
            var idArr=[];
            this.$store.state.car.forEach(item=>idArr.push(item.id));
            this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then((result) => {
               if(result.body.status===0){
                   console.log(result);
                   this.shopCarList =result.body.message;
               }
            });
        },
        changeSelectd(id,val){
            console.log(val)
            this.$store.commit('updateSelected',{id ,selected:val});
        },
        removeGoods(id,index){
            //点击触发次函数，在仓库中删除信息
            this.$store.commit('removeGoods',id);
            //更新本地信息
            this.shopCarList.splice(index,1);
        }

    },
    components:{numberbox}
}
</script>

<style scope>
.ShopContainer{
    background-color: #eee;
    overflow: hidden;
}
.shopCarList .first{
    display: flex;
    align-items: center
}
#img{
    width: 60px;
}
.info2 h1{
    font-size: 14px;
}
.info2 p{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.red{
    color: red;
    font-weight: bold;
}

.two{
    display: flex;
    align-items: center;
    justify-content: space-around
}
.two .jiesaun{
    margin-right: 5px;
}
.two .red{
    color: red;
    font-size: 16px;
    font-weight: bold;
}
</style>
