import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Userinfo from '../views/Userinfo.vue'
import Edit from '../views/Edit.vue'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import SetCategory from '../views/SetCategory.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Home

  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      keepalive: true
    }
  },
  {
    path: '/setCategory',
    name: 'setCategory',
    component: SetCategory,
    meta: {
      keepalive: true
    }
  },
  {
    path: '/article/:id',
    name: 'article',
    component: Article
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: Userinfo,
    meta:{
      istoken:true
    }
  },
  {
    path: '/edit',
    name: 'dit',
    component: Edit,
    meta:{
      istoken:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由导航守卫 没有携带token来访问页面强制跳转到登录页面 相当于一个拦截器
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 一个函数代表放行
  //next() next('/login)
  // if(to.path === '/login') return next()
  //获取token
  // const tokenStr = window.localStorage.getItem('token')
  // if(!tokenStr) return next('/login')
  // next()
  //上面是所有的路径都要验证token 没有token就返回登录页面
  //下面是route对象中的meta带有istoken的才需要验证，就是说也一些是可以公开访问的
  if (!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken == true) {
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})

export default router
