import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { initMenu } from './api/menu'

Vue.config.productionTip = false
Vue.use(ElementUI);


import { postRequest } from "@/api/request";
import { getRequest } from "@/api/request";
import { putRequest } from "@/api/request";
import { deleteRequest } from "@/api/request";

import store from '@/store'


Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;


router.beforeEach((to, from, next) => {

  if (window.sessionStorage.getItem('token')) {
    initMenu(router, store)

    if (!window.sessionStorage.getItem('user')) {
      return getRequest('/admin/info').then(resp => {
        if (resp) {
          window.sessionStorage.setItem('user',JSON.stringify(resp))
          next()

        }
      })


    }

    next()
  } else {

    if(to.path=='/'){
      next()
    }else{
      next('/?redirect='+to.path)
    }
  }

})

new Vue({
  router,
  store,


  render: h => h(App)
}).$mount('#app')
