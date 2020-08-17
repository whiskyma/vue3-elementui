<template lang="pug">
    .login
        .model
            .box
                h3 后台管理系统-欢迎登录
                el-form(:model="ruleForm",:rules="rules",ref="ruleForm")
                    el-form-item(prop="userName")
                        el-input(v-model="ruleForm.userName",placeholder="请输入用户名",clearable)
                            template(slot="prepend")
                                i.el-icon-user
                    el-form-item(prop="password")
                        el-input(v-model="ruleForm.password",type="password",placeholder="请输入密码",clearable,show-password)
                            template(slot="prepend")
                                i.el-icon-unlock
                    span 账号密码随便输入即可登录
                    el-form-item
                        el-button(type="primary",@click="submitForm('ruleForm')",:loading="loading",v-waves) 登录
        
</template>

<script>
    import md5 from 'js-md5'
    import { mapGetters } from 'vuex'
    export default {
        components: {

        },
        data () {
            return {
                ruleForm: {
                    userName: null,
                    password: null
                },
                rules: {
                    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                },
                loading: false,
                getInfoes: {
                    userName: null,
                    loginIp: '192.168.2.45',
                    loginTime: Date.now(),
                    ipAddr: '亚洲'
                }
            }
        },
        mounted(){
            if(this.getInfo&&(/^\/login$/).test(this.$route.path)){
                this.$link('/home')
            }
        },
        computed: {
            ...mapGetters(['getInfo'])
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        this.loading = true;
                        this.ruleForm.password = md5(this.ruleForm.password);
                        // 以下仅本地测试
                        this.getInfoes.userName = this.ruleForm.userName;
                        this.$setItem('getInfo', this.getInfoes);
                        this.$store.commit('SET_GETINFO', this.getInfoes);
                        this.loading = false;
                        this.$link('/home');

                        // 以下正式操作
                        // this.$store.dispatch('Login', this.ruleForm).then(res =>{
                        //     if(res&&res.resCode == 1){
                        //         this.$toast.center('登录成功');
                        //         this.$store.dispatch('MenuList',{userId: res.resObj.userId}).then(res =>{})
                        //         this.$link('/home')
                        //     }else{
                        //         this.loading = false;
                        //         return false;
                        //     }
                        // }).catch(res =>{
                        //     this.loading = false;
                        // })
                    }else{
                        this.loading = false;
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="stylus">

</style>
