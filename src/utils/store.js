import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { post, get, setItem, getItem, remItem } from './com'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
        getInfo: getItem('getInfo')?getItem('getInfo'):null,
        menuList: getItem('menuList')?getItem('menuList'):null,
        bgColor: getItem('bgColor')?getItem('bgColor'):'#515a6e'
	},
	mutations: {
        SET_GETINFO: (state, getInfo) => {
            state.getInfo = getInfo;
        },
        SET_BGCOLOR: (state, bgColor) => {
            state.bgColor = bgColor;
        },
        SET_MENULIST: (state, menuList) => {
            state.menuList = menuList;
        }
	},
    getters:{
        getInfo: state => state.getInfo,
        menuList: state => state.menuList,
        bgColor: state => state.bgColor
    },
    actions: {
        // 账户登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                post('user/login', userInfo).then(res => {
                    if(res&&res.resCode==1){
                        setItem('getInfo',res.resObj);
                        commit('SET_GETINFO',res.resObj);
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 拉取菜单列表
        MenuList({ commit }, id) {
            return new Promise((resolve, reject) => {
                post('user/listMenu', id).then(res => {
                    if(res&&res.resCode==1){
                        setItem('menuList',res.resObj);
                        commit('SET_MENULIST',res.resObj);
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 清除所有的本地缓存
        clearAll({ commit }) {
            return new Promise((resolve) => {
                remItem();
                //清除储存在state中的值
                commit('SET_GETINFO', null)
                commit("SET_MENULIST", null)
                router.push('/login')
                resolve()
            })
        }
    }
})

export default store
