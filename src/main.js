import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mixins'
import {keybox, openCallback} from './modules/keyboxExtension'
// 
keybox.open(window, openCallback)

//设备上调试
// let VConsole = require('vconsole')
// new VConsole()


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
