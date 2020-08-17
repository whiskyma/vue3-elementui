import Vue from 'vue';
import { 
    formatDate, 
    trim, 
    link, 
    imgBg, 
    setItem, 
    getItem, 
    remItem,
    get,
    post 
} from './com';

Vue.prototype.$formatDate = formatDate;
Vue.prototype.$trim = trim;
Vue.prototype.$link = link;
Vue.prototype.imgBg = imgBg;
Vue.prototype.$setItem = setItem;
Vue.prototype.$getItem = getItem;
Vue.prototype.$remItem = remItem;
Vue.prototype.$get = get;
Vue.prototype.$post = post;