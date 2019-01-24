<template>
<!-- // 父传子的max的数据时，因为goodsInfo是异步操作得到的，故传进来的时候是空对象，‘
我们可以使用watch属性监听 来监听父组件传递过来的max值，不管watch会被触发几次，但是最后一次，
肯定是一个合法的max的数值 -->
    <div>
        <div class="mui-numbox" data-numbox-min='1' >
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChangeed" ref="numbox"/>
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
        console.log(this.max);
    },
    methods:{
        //每当文本框的数据修改的时候，立即把最新的数据，通过事件调用，传递给父组件
        countChangeed(){
            this.$emit("getCount",parseInt(this.$refs.numbox.value))
        }
    },
    props:["max"],
    watch:{
        //属性监听
        max:function(newVal,oldVal){
            //使用js api 设置number的最大值
            mui('.mui-numbox').numbox().setOption('max',newVal);
        }
    }
}
</script>

<style scoped>

</style>
