// 入口js

import  Vue from 'vue'
import App from './App'
import store from './store'
import  router from './router'
import {Button} from 'mint-ui'
import './mock/mockServer' //加载mockServer即可


Vue.component(Button.name,Button)//注册全局组件
new Vue({
  el:'#app',
 render: h => h(App),
  router, //使用vue-router
  store //使用stroe

})
