// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './axios'
import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
// import Storage from '../config/storageConfig.js'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
