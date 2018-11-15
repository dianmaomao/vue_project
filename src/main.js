// 入口js

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import './mock/mockServer' // 加载mockServer即可
import loading from './common/images/loading.gif'
import './filters' // 加载过滤器

Vue.component(Button.name, Button)// 注册全局组件
Vue.use(VueLazyload, {
  loading
})
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 使用vue-router
  store // 使用stroe

})
