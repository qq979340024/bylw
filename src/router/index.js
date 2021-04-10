import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Frame from "@/views/Frame";
import Home from "@/views/Home";
import Lost from "@/views/Lost";
import Find from "@/views/Find";
import Search from "@/views/Search";
import Skip from "@/views/Skip";
import Register from "@/views/Register";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Frame',
    component: Frame,
    children:[
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },{
        path: '/lost',
        name: 'Lost',
        component: Lost,
      },{
        path: '/find',
        name: 'Find',
        component: Find,
      },{
        path: '/search',
        name: 'Search',
        component: Search,
      }
    ],
  },{
    path: '/login',
    name: 'Login',
    component: Login,
  },{
    path: '/skip',
    name: 'Skip',
    component: Skip,
  },{
    path: '/register',
    name: 'Register',
    component: Register,
  }
]

const router = new VueRouter({
  routes
})

export default router
