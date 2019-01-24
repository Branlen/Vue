<template>
    <div>
        <comment :id="id"></comment>         
    </div>
</template>

<script>
import comment from '../comment/comment.vue'
export default {
    data(){
        return {id:this.$route.params.id}
    },
    methods:{
    },
    components:{
        comment
    }
}
</script>

<style scoped>

</style>
