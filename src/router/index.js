
import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
//导入组件包
import homeContainer from '../components/Tabber/HomeContainer.vue'
import menberContainer from '../components/Tabber/MenberContainer.vue'
import searchContainer from '../components/Tabber/SearchContaienr.vue'
import shopcarContainer from '../components/Tabber/ShopcarContainer.vue'
import newsList from '../components/news/newsList.vue'
import newsInfo from '../components/news/newsInfo.vue'
import photoList from '../components/picture/picturelist.vue'
import photoInfo from '../components/picture/pictureinfo.vue'
import goodsList from '../components/goods/GoodsList.vue'
import goodsInfo from '../components/goods/GoodsInfo.vue'
import goodsDesc from '../components/goods/GoodDesc.vue'
import goodsComment from '../components/goods/GoodsComment.vue'
export default new Router({
  routes: [{
      path: '/',
      redirect: '/homeContainer'
    },
    {
      path: '/homeContainer',
      component: homeContainer
    },
    {
      path: '/menberContainer',
      component: menberContainer
    },
    {
      path: '/searchContainer',
      component: searchContainer
    },
    {
      path: '/shopcarContainer',
      component: shopcarContainer
    },
    {
      path:'/homeContainer/newslist',
      component:newsList
    },
    {
      path:'/homeContainer/newsinfo/:id',
      component:newsInfo
    },
    {
      path:'/homeContainer/photoList',
      component:photoList
    },
    {
      path:'/homeContainer/photoinfo/:id',
      component:photoInfo
    },
    {
      path:'/homeContainer/goodsList',
      component:goodsList
    },
    {
      path:'/homeCotainer/goodsDesc/:id',
      component:goodsDesc,
      name:'goodsDesc'
    },
    {
      path:'/homeContainer/goodsInfo/:id',
      component:goodsInfo,
      name:'goodsInfo',
    },
    {
      path:'/homeContainer/goodsCommenr/:id',
      component:goodsComment,
      name:'goodsComment'
    }
  ],
  linkActiveClass:'mui-active'
})

