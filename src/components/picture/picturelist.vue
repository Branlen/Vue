<template>
    <div>
        <!-- 顶部滑条区域 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item' ,item.id==0?'mui-active':''  ]" href="#item1mobile" data-wid="tab-top-subpage-1.html" v-for="item in category" :key="item.id" @click="getPhotoListByCateId(item.id)">
							{{item.title}}
						</a>
						
					</div>
				</div>

			</div>
        <!-- 照片信息的区域 -->
        <ul class="photo-list" >
      <router-link v-for="item in list" :key="item.id" :to="'/homeContainer/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
    </div>
</template>

<script>
var mui = require("../../lib/mui/js/mui.min.js");
import { Lazyload } from 'mint-ui';
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            category:[],
            list:[]
        }
    },
    created() {
        this.getImgcategory();
        this.getPhotoListByCateId(0)
    },
    mounted() {
        mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        getImgcategory(){
            this.$http.get('api/getimgcategory').then((result) => {
                if(result.body.status===0){
                    console.log(result);
                    this.category=result.body.message;
                    var all = {title:"全部",id:0}
                    this.category.unshift(all);
                }
               
            }).catch((err) => {
                
            });
        },
        getPhotoListByCateId(cateId){
            this.$http.get("api/getimages/" + cateId).then((result)=>{
                if(result.body.status===0){
                    console.log("result");
                    this.list=result.body.message;
                }
            },(result)=>{
                // Toast("读取失败")
            })
        }
        
    }
}
</script>

<style scope>
* {
    /* 允许在垂直的移动手势操作 */
  touch-action: pan-y;
} 
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.photo-list{
    list-style:none;
    /* background-color: white; */
    margin: 0px;
    padding: 10px;

}
.photo-list li{
    /* background-color: white; */
    position: relative;
    box-shadow: 0 0 8px #999;
    margin-bottom: 10px;
}

.photo-list li img{
    width: 100%;
    vertical-align: middle;

}

.info{
    color: white;
    text-align: left;
    position: absolute;
    bottom: 0px;
    background-color: rgba(0,0,0,0.4);
    max-height: 90px;

}
.info-title{
    font-size: 15px;
}
.info-body{
    font-size: 13px;
}
</style>