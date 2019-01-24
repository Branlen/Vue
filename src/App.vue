<template>
    <div id="appContainer">
        <!-- //这是应用的头部 -->
    <mt-header fixed title="黑马程序员·Vue项目">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>


        <!-- //这是网页的内容部分 -->
		<transition >
			<router-view></router-view>
			
		</transition>



        <!-- //这是网页底部切换部分 -->
        <nav class="mui-bar mui-bar-tab">
			<routerLink to="/homeContainer" id="defaultTab" class="mui-tab-item-llb" href="tab-webview-subpage-about.html">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</routerLink>
			<routerLink to="/menberContainer" class="mui-tab-item-llb" href="tab-webview-subpage-chat.html">
                <span class="mui-icon mui-icon-contact"></span>
				
				<span class="mui-tab-label">会员</span>
			</routerLink>
			<routerLink to="/shopcarContainer" class="mui-tab-item-llb" href="tab-webview-subpage-contact.html">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                <span id="badge" class="mui-badge"> {{$store.getters.getCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</routerLink>
			<routerLink to="/searchContainer" class="mui-tab-item-llb" href="tab-webview-subpage-setting.html">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</routerLink>
		</nav>
    </div>
</template> 

<script>
export default {
   data(){return{flag:false}},
   created() {
	   this.flag= this.$route.path==='/homeContainer'? false : true;
   },
   methods:{
	   goBack(){
		   console.log(this.$router)
		   console.log(this.$route)
		   this.$router.go(-1);
	   }
   },
   watch: {
	   "$route.path":function(newVal){
		   if(newVal==='/homeContainer'){
			   this.flag=false;
		   }else{
			   this.flag=true;
		   }
	   }
   } 
}
</script>

<style scope>
#appContainer{
	margin-top: 40px;
	margin-bottom: 50px;
	background-color: #fff;
	overflow-x: hidden;

}
.mint-header .is-fixed{
	z-index: 99;
}
.v-enter{
	opacity: 0.5;
	transform: rotate3d(60,100,0,30deg);

}
.v-leave{
	opacity: 0;
	transform: translateX(-100%);

}
.v-enter-active,.v-leave-active{
	transition: all 0.5s ease;
	position: absolute
}
.mui-bar{
	z-index: 99;
}
/* // 该类名，解决 tabbar 点击无法切换的问题 */
.mui-bar-tab .mui-tab-item-llb.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-llb {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>
