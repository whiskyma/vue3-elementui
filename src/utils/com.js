import Vue from 'vue'
import router from '@/router'
import request from './http'

// 时间戳转换
export const formatDate = ((value) => {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
})

// 清除首尾空的字符串
export const trim = ((val) => {
    return val&&val.replace(/\s/g, "").toLowerCase();
})

// 路由跳转
export const link = ((url) => {
    if(!url){return}
    if(/^http/.test(url)){
        window.open(url);
    }else{
        router.push(url);
    }
})

// 图片
export const imgBg = ((url) => {
    if (!url) {
        return false
    }
    if (!/^http/.test(url)) {
        if (url.indexOf("static_db") > -1) {
            url = WGURL.img + '' + url
        } else {
            url = WGURL.img + '' + 'public/' + url
        }
    }
    return 'background-image:url(' + url + ')'
})

// 存值
export const setItem = ((key, value) =>{
    if(typeof value === 'string'){
        localStorage.setItem(key, value);
    }else{
        localStorage.setItem(key, JSON.stringify(value));
    }
})

// 取值
export const getItem = ((key) =>{
    return key&&JSON.parse(localStorage.getItem(key)) || null;
})
// 删值
export const remItem = ((key) =>{
    if(key){
        localStorage.removeItem(key);
    }else{
        localStorage.clear();
    }
})

// get
export const get = ((url, param) =>{
    if(param){
        let nd="?";
        let xx = Object.entries(param);
        xx.forEach((val) => {
            if(val[1] || val[1] == 0){
                nd+=val[0]+'='+val[1]+'&'
            }
        });
        url = url+nd.replace(/&$/,'');
    }
    return request({url: url, method: 'get'})
})

// post
export const post = ((url, param) =>{
    if(param){
        return request({url: url, method: 'post',data: param})
    }
})