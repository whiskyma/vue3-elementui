import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@js/store'

// 引入样式和公共js
import '@styl/app.styl'
import '@js/index.js'

// 按需引入组件
import element from '@js/element'
Vue.use(element)

// 水波纹
import waves from '@pon/directive/waves'

// toast提示
import Toast from 'vue2-toast';
import 'vue2-toast/lib/toast.css';
Vue.use(Toast);

Vue.config.productionTip = false

SandVS = new Vue({
    router,
    store,
    render: h => h(App),
    data: {
        eventHub: new Vue()
    }
}).$mount('#app')
