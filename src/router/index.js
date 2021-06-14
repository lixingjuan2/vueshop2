import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Home = ()=>import('views/home/Home')
const Category = ()=>import('views/category/Category')
const Cart = ()=>import('views/cart/Cart')
const ProFile = ()=>import('views/profile/ProFile')


// 1. 安装插件
Vue.use(VueRouter)

// 2. 创建对象
const routes = [ // 映射关系
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: ProFile
  },
  
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3. 导出对象
export default router