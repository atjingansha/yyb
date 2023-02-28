import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true
  }
]

const router = new VueRouter({
  routes
})



//解决重复点击导航时，控制台报错
const originlPush=VueRouter.prototype.push
VueRouter.prototype.push=function push(location){
  return originlPush.call(this,location).catch(err=>err)
}


export default router
