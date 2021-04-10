import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {getRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {deleteRequest} from "@/utils/api";
import {postKeyValueRequest} from "@/utils/api";
import {postRequest} from "@/utils/api";
import 'font-awesome/css/font-awesome.min.css'

Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;


// Vue.config.productionTip = false
Vue.use(ElementUI);

// router.beforeEach((to, from, next) => {
//     if (to.path == "/" || to.path == 'login'){
//         next();
//     }else {
//         if (window.sessionStorage.getItem("user")){
//             // initMenu(router,store);
//             next();
//         }else {
//             console.log(to)
//             next("/login?redirect=" + to.path)
//         }
//     }
// })

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
