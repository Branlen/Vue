<template>
    <div class="goods-info">
        <transition @before-enter="beforeEnter" 
        @enter="enter"
        @after-enter="afterEnter" >
            <div class="ball" v-show="ball_flag" ref="ball"></div>
        </transition>
        
        <!-- 商品轮播图区域  -->
       <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-swipe :auto="4000">
                            <mt-swipe-item v-for="item in lunbotu" :key="item.src">
                                <img :src="item.src" alt="">
                            </mt-swipe-item>
                        </mt-swipe>
					</div>
				</div>
			</div>
        <!-- 商品购买区域    -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="nowPrice">￥{{goodsInfo.sell_price}}</span> 
                    </p>
                    <p>购买数量：<numbox class="number" @getCount ="getSelectedCount"  :max="goodsInfo.stock_quantity"></numbox>  
                        
                    </p>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button style="margin-left:7px" type="danger" size="small" @click="addTocar">加入购物车</mt-button>
                    
                </div>
            </div>
          
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
                    <p>上架情况：{{ goodsInfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="getDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large"  plain @click="getComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div> 
</template>

<script>
import numbox from '../comment/goodsinfo_numberbox.vue'
export default {
    data(){
        return {
            id:this.$route.params.id,
            lunbotu:[],
            goodsInfo:{},
            selectedCount:1,
            ball_flag:false
        }
    },
    created(){
        this.getLunbotu();
        this.getGoodsInfo();

    },
    methods:{
        getLunbotu(){
            this.$http.get("api/getthumimages/" + this.id).then(result => {
                if (result.body.status === 0) {
                // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
                result.body.message.forEach(item => {
                item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
    })},
        //得到商品信息
        getGoodsInfo(){
            this.$http.get("api/goods/getinfo/" + this.id).then((result)=>{
                if(result.body.status===0){
                    console.log(result);
                    this.goodsInfo = result.body.message[0];
                }
            })
        },
        getDesc(id){
          
            this.$router.push({name:"goodsDesc", params:{id}})
        },
        getComment(id){
            this.$router.push({name:"goodsComment", params:{id}})
        },
        getSelectedCount(count){
            //当子组件把选中的数量传递给父组件的时候。把选中的值保存到data上；
            this.selectedCount = count;
            console.log('父组件拿到的数量值'+this.selectedCount)
        },
        addTocar(){
            this.ball_flag = !this.ball_flag;
            var goodsInfos = {
                id:this.id,
                count:this.selectedCount, 
                price:this.goodsInfo.sell_price,
                selected:true};
                console.log(goodsInfos);
            this.$store.commit("getCarInfo" ,goodsInfos);
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)"
        },
        enter(el,done){
          
            el.offsetWidth;
            //由于在不同分辨率下，小球移动的位置就不准确去，需要把小球移动的位置写活，找出里面不变的东西
            //得到小球dom元素，返回一个矩形对象
            var ball = this.$refs.ball.getBoundingClientRect(); 
            
            //得到徽章的dom元素，返回一个矩形对象
            var badge = document.getElementById('badge').getBoundingClientRect();

            const xDist = badge.left-ball.left;
            const yDist = badge.top - ball.top

            el.style.transform=`translate(${xDist}px,${yDist}px)`;
            el.style.transition ="all 1s cubic-bezier(.59,-0.38,.67,.74)";
            done();
        },
        afterEnter(el){
           this.ball_flag = !this.ball_flag;
        }
       
    },
    components:{
        numbox
    }
}
</script>        


<style scope>
.goods-info{
    background-color: #eee;
    position: relative;
    overflow: hidden;
    /* 奇怪的元素，不懂 */
}
.mint-swipe{
    text-align: center;
    height: 200px;
}
.mint-swipe img{
    height: 100%;
  
}
.mui-card-footer {
    display: block;
   
  } 
.mui-card-footer button {
    margin: 15px 0;
}
.nowPrice{
    color:red;
    font-weight: bold;

}
.number{
    display: inline;
}
.ball{
    width: 15px;
    height: 14px;
    background-color:red;
    position: absolute;
    z-index: 100;
    border-radius: 15px;
    /* background: url('../../images/timg.jpg') no-repeat; */
    background-size: 100% 98%;
    left:148px;
    top: 367px;
    /* transform: translate(90px,215px); */
}
</style>