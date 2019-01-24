<template>
    <div>

        <!-- 轮播图 -->
       <div class="block">
        <!-- <span class="demonstration">Click 指示器触发</span> -->
        <el-carousel trigger="click" height="200px">
             <el-carousel-item v-for="item in items" :key="item.id">
                <img :src="item.src" alt="">
             </el-carousel-item>
       </el-carousel>
        </div>
        <!-- 六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/homeContainer/newslist">
              <img src="../../images/menu1.png" alt="">
              <div class="mui-media-body">新闻资讯</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/homeContainer/photoList">
              <img src="../../images/menu2.png" alt="">
              <div class="mui-media-body">图片分享</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/homeContainer/goodsList">
              <img src="../../images/menu3.png" alt="">
              <div class="mui-media-body">商品购买</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../images/menu4.png" alt="">
              <div class="mui-media-body">留言反馈</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../images/menu5.png" alt="">
              <div class="mui-media-body">视频专区</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../images/menu6.png" alt="">
              <div class="mui-media-body">联系我们</div></a></li>
  </ul> 
    </div>
</template>


<script>
export default {
    data(){
        return{
            items:[
                {id:0,src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3219020459,2897232831&fm=27&gp=0.jpg"},
                {id:1,src:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2200761536,2974949667&fm=27&gp=0.jpg"},
                {id:2,src:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1636782330,4064775724&fm=27&gp=0.jpg"},
                {id:3,src:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1516002241,1404485935&fm=27&gp=0.jpg"}
            ]
        }
    }
}
</script>


<style scoped>

.el-carousel__item img {
    width:100%;

}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.mui-table-view,.mui-grid-view,.mui-grid-9{
    background-color: #fff;
    border:none;
}

.mui-table-view-cell{
    border: 0px;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{ 
    border:none;
    background-color: #fff;
}
.mui-table-view-cell img{
    width: 60px;
    height: 60px;
}
</style>
