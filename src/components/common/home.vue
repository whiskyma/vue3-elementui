<template lang="pug">
    .home
        .avatar
        .userName(v-if="getInfo") {{getInfo.userName}}
        ul(v-if="getInfo")
            li 登录时间: 
            li {{$formatDate(getInfo.loginTime)}}
            li 登录地点: 
            li {{getInfo.ipAddr}}
            li 登录IP: 
            li {{getInfo.loginIp}}
        p(v-for="it in 200") 阿斯蒂芬阿斯蒂芬
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        components: {

        },
        data () {
            return {
                
            }
        },
        mounted(){
            
        },
        computed: {
            ...mapGetters(['getInfo'])
        },
        methods:{
            
        }
    }
</script>

<style lang="stylus" scoped>
    ul
        overflow: hidden;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding: 10px;
        margin-top 30px
        li
            float: left;
            width: 50%;
            color: #555;
            margin: 7px 0;
            &:nth-child(even)
                width 20%





</style>
