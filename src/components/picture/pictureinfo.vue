<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p>
            <span>发表时间：{{photoinfo.add_time|dateFormat}}</span>
            <span> 点击：{{photoinfo.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图部分 -->
        <div class="thumbs">
            <vue-preview  :slides="list" @close="handleClose"></vue-preview>
        </div>
        <!-- <hr> -->

        <!-- 评论部分/ -->
        <commit-box :id="id" style="clear:left"></commit-box>       
    </div>
</template>

<script>
import commitBox from '../comment/comment.vue'
import {Toast} from "mint-ui"
export default {
    data(){
        return{
            id:this.$route.params.id,
            photoinfo:{},
            list:[],
            slide1: [
          {
            src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
            alt: 'picture1',
            title: 'Image Caption 1',
            w: 600,
            h: 400
          },
          {
            src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
            msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
            alt: 'picture2',
            title: 'Image Caption 2',
            w: 1200,
            h: 900
          }
        ],
        } 
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods: {
      getPhotoInfo(){
          this.$http.get("api/getimageInfo/" + this.id).then((result) => {
              if(result.body.status===0){
                  console.log(result);
                  this.photoinfo=result.body.message[0];   
              }
          },()=>{
              Toast("读取信息失败")
          })
          ;
      },
      getThumbs(){
          this.$http.get("api/getthumimages/"+this.id).then((result)=>{
              if(result.body.status===0){
                  console.log(result);
                  //循环，每个图片，补充图片的宽和高
                  result.body.message.forEach(item=>{
                      item.w=600;
                      item.h=400;
                      item.msrc=item.src;
                  });
                  this.list= result.body.message;
                }
          },()=>{
              Toast("读取失败")
          });
      },
      handleClose(){
          console.log('close event')
      }
    },
    components: {
        commitBox
    }

}
</script>

<style scope>
.photoinfo-container h3{
    font-size: 16px;
    padding:5px 0 5px 10px;
    
}
.photoinfo-container p{
    display: flex;
    font-size: 13px;
    color: rgb(66,165,245);
    justify-content: space-between;
}

.my-gallery{ 
    display: flex;
    flex-wrap: wrap;
    width: 100%
    
}
.my-gallery figure{
    margin: 5px;
    width: 100px;
    height: 100px;
}
.thumbs img{
    margin: 5px;
    box-shadow: 0 0 8px grey;
    width: 100px;
    height: 100px;
}
 
</style>