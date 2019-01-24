<template>
<!-- // 父传子的max的数据时，因为goodsInfo是异步操作得到的，故传进来的时候是空对象，‘
我们可以使用watch属性监听 来监听父组件传递过来的max值，不管watch会被触发几次，但是最后一次，
肯定是一个合法的max的数值 -->
    <div>
        <div class="mui-numbox" data-numbox-min='1' style="height:25px" >
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" @change="changeNumber" :value="idCount" ref="numbox" readonly/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    data(){
        return {}
    },
    mounted(){
        mui(".mui-numbox").numbox();
    },
    methods:{
        //当购买数量改变时，触发这一个函数；
        changeNumber(){
            this.$store.commit('updateCount',{
                id:this.id,
                count:this.$refs.numbox.value})
        }
    },
    props:['idCount','id']
    
}
</script>

<style scoped>

</style>
