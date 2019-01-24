// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routers from './router'
import app from './App.vue'



Vue.config.productionTip = false

//导入vue-resouce
import VueResorce from 'vue-resource'
Vue.use(VueResorce)
//设置请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//设置全局post时候表单的数据格式组织形式，application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true

//导入vue-lazy库；
// import VueLazyload from 'vue-lazyload'


// Vue.use(VueLazyload, {
//   error: './images/error.jpg',
//   loading: './images/timg.gif',
//   attempt: 1
// })

//导入vue-preview库
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// Vue.use(preview, {
//   mainClass: 'pswp--minimal--dark',
//   barsSize: {top: 0, bottom: 0},
//   captionEl: false,
//   fullscreenEl: false,
//   shareEl: false,
//   bgOpacity: 0.85,
//   tapToClose: true,
//   tapToToggleControls: false
// })



//导入moment时间处理
import moment from 'moment'
Vue.filter('dateFormat', function (datastr  ) {
  return moment(datastr).format("YYYY-MM-DD HH:mm:ss");
})


//导入mint-UI库
import MintUI from "mint-ui";
import 'mint-ui/lib/style.css'
Vue.use(MintUI);
// import { Lazyload } from 'mint-ui';

// Vue.use(Lazyload);

//导入MUI样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'


//导入elementUi库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


//导入vuex
import Vuex from 'vuex'

Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('cars')||'[]');
   //{id:88,price,count,selected} 
var store = new Vuex.Store({
  state:{
    car:car
  },
  mutations: {
    getCarInfo(state,goodsInfo){
      //{id:88,price,count,selected} 
      //1如果id相同时添加商品，
      var flag = false; 
      state.car.some(item=>{
        if(goodsInfo.id===item.id){
          item.count += goodsInfo.count;
          flag = true;
          return true;
        }
      })
      if(!flag){
        state.car.push(goodsInfo);
      };
      //更新car 之后。将得到的数组存储到本地的localStorage中
      localStorage.setItem('cars',JSON.stringify(state.car));
    },
    updateSelected(state,uSelect){
      state.car.some(item=>{
        if(item.id===uSelect.id){
          item.selected = uSelect.selected;
        }
      })
      localStorage.setItem('cars',JSON.stringify(state.car));
    },
    updateCount(state,uCount){
      state.car.some(item=>{
        if(item.id===uCount.id){
          item.count = parseInt(uCount.count);
          return true;
        }
      })
      //将数量关系更新到本地上去
      localStorage.setItem('cars',JSON.stringify(state.car));
    },
    removeGoods(state,id){
      state.car.some((item,i)=>{
        if(item.id===id){
          state.car.splice(i,1)
          return true;
        }
      })
      //将删除信息更新到本地上去
      localStorage.setItem('cars',JSON.stringify(state.car));
    }
  },
  getters:{
    getCount:function(state){var c=0;
        state.car.forEach(item=>{
        c+=parseInt(item.count);
        })
        return c;
      
    
    },
    //得到Car中的信息
    getShopMessage(state){
      return state.car;
    },
    getSelected(state){
       //得到{id：selected}的一个对象
      var o={};
      state.car.forEach(item=>{
       o[item.id] = item.selected;
      })
      return o;
    },
    getCountId(state){
      //得到{id：count}的一个对象
      var o={};
      state.car.forEach(item=>{
        o[item.id]=item.count;
      })
      return o;
    },
    getChooseCount(state){
      var number =0;
      state.car.forEach(item=>{
        if(item.selected){
          number+=item.count;
        }
      })
      return number;
    },
    getChooseMoney(state){
      var money =0;
      state.car.forEach(item=>{
        if(item.selected){
          money+=(item.count*item.price);
        }
      })
      return money;
    }
  }

})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: c => c(app),
  router:routers,
  store//将store挂载到实例中
})
