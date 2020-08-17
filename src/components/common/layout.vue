<template lang="pug">
    .layout
        .left(:style="{backgroundColor: bgColor}",:class="{'l-close':coll}")
            .logo(@click="$link('table')",:class="{'logo_s':coll}")
            .menu
                el-menu.el-menu-demo(:default-active='act',:collapse="coll",:unique-opened="true",:collapse-transition="false")
                    template(v-for="it in menuList")
                        el-menu-item(:index="it.index",v-if="!it.child",@click="tabClick(it)",v-waves)
                            i.el-icon-help
                            span {{it.title}}
                        el-submenu(:index="it.index",v-if="it.child")
                            template(slot='title')
                                i.el-icon-help
                                span {{it.title}}
                            template(v-for="item in it.child")
                                el-menu-item(:index="item.index",@click="tabClick(item)",v-waves)
                                    i.el-icon-help
                                    span {{item.title}}

        .right(:class="{'r-close':coll}")
            .view-head
                i(@click="coll=!coll",:class="!coll?'el-icon-s-fold':'el-icon-s-unfold'")
                span 首页
                .userbox
                    .avatar
                    .userName(v-if="getInfo") {{getInfo.userName}}
                    .dropdown
                        p(v-waves,@click="$toast.center('功能未开发,敬请期待!!!')") 更换主题
                        p(@click="dialogVisible=true,t=1") 修改密码
                        p(@click="dialogVisible=true,t=2") 退出登录
            .view-nav
                el-tabs(v-model="act",type="card",closable,@tab-click="clickTab",@tab-remove="clickRemove")
                    el-tab-pane(v-for="(item, inx) in tabList",:key="item.name",:label="item.title",:name="item.name")
            .view-con
                transition(name="display")
                    router-view
        //- 提示框
        el-dialog(:title="t==1?'修复登录密码':'提示'",:visible.sync="dialogVisible",width="25%",:close-on-click-modal="false")
            span(v-if="t==2") 确定是否退出登录?
            el-form(label-width="90px",v-else)
                el-form-item(label="原密码")
                    el-input(v-model="option.lodpwd",placeholder="请输入原密码",clearable,type="password",show-password)
                el-form-item(label="新密码")
                    el-input(v-model="option.newpwd",placeholder="请输入新密码",clearable,type="password",show-password)
                el-form-item(label="确认新密码")
                    el-input(v-model="option.confirmpwd",placeholder="请确认新密码",clearable,type="password",show-password)
            span.dialog-footer(slot='footer')
                el-button(@click='dialogVisible = false') 取 消
                el-button(type='primary', @click="dialogVisible=false;$store.dispatch('clearAll')",v-if="t==2") 确 定
                el-button(type='primary', @click="confirm",v-else) 确 定

</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        components: {

        },
        data () {
            return {
                coll: false,
                menuList: [{
                    index: 'home',
                    title: '首页',
                    path: 'home'
                },{
                    index: 'table',
                    title: '表格',
                    child: [{
                        index: 'table/table1',
                        title: '表格1',
                        path: 'table/table1'
                    },{
                        index: 'table/table2',
                        title: '表格2',
                        path: 'table/table2'
                    }]
                },{
                    index: 'form',
                    title: '表单',
                    child: [{
                        index: 'form/form1',
                        title: '表单1',
                        path: 'form/form1'
                    },{
                        index: 'form/form2',
                        title: '表单2',
                        path: 'form/form2'
                    }]
                },{
                    index: 'grop',
                    title: '表组',
                    child: [{
                        index: 'grop/grop1',
                        title: '表组1',
                        path: 'grop/grop1'
                    },{
                        index: 'grop/grop2',
                        title: '表组2',
                        path: 'grop/grop2'
                    }]
                }],
                act: '/home',
                tabList: this.$getItem('tabList')?this.$getItem('tabList'):[],
                routePath: this.$route.path,
                dialogVisible: false,
                t: 1,
                option: {
                    lodpwd: '',
                    newpwd: '',
                    confirmpwd: ''
                }
            }
        },
        mounted(){
            this.filterMenu()
            if(!localStorage.getItem('tabList')){
                this.tabList = [{
                    title: this.$route.name,
                    name: this.$route.path.substring(1,this.$route.path.length)
                }]
                this.$setItem('tabList',this.tabList);
            }
        },
        methods:{
            tabClick(it){
                this.$link('/'+it.path);
                this.tabList.push({
                    title: it.title,
                    name: it.path
                })
                this.tabList = this.sort(this.tabList);
                this.$setItem('tabList',this.tabList);
            },
            filterMenu(){
                this.act = this.routePath.substring(1,this.routePath.length);
            },
            clickTab(targetName){
                this.$link('/'+targetName.name)
            },
            clickRemove(targetName){
                let el = this.tabList.length;
                this.tabList.forEach((item, inx) =>{
                    if((item.name==targetName)&&inx>0){
                        if(this.act==targetName){
                            this.act = this.tabList[inx-1].name;
                            this.$link('/'+this.act);
                        }
                        this.tabList.splice(inx,1)
                        this.$setItem('tabList',this.tabList);
                    }
                })
            },
            // 对象去重
            sort(arr){
                let temp = arr.map((item) => {
                    return JSON.stringify(item);
                });
                temp = Array.from(new Set(temp));
                return temp.map((item) => {
                    return JSON.parse(item);
                });
            },
            confirm(){
                alert(12)
            }
        },
        computed: {
            ...mapGetters(['bgColor','getInfo'])
        },
        watch: {
            $route(to,from,next){
                this.routePath = to.path
                this.filterMenu()
            }
        }
    }
</script>

<style lang="stylus">

</style>
