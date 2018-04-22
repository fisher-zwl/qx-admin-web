import Vue from 'vue'
import Router from 'vue-router'
import Login from '../main/Login.vue'
import Menu from '../main/Menu.vue'
import Admin from '../main/Admin.vue'
import Order from '../main/Order.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: Menu,
      children: [
        {
          path: '/',
          name: 'Order',
          component: Order
        }, {
          path: '/admin',
          name: 'admin',
          component: Admin
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
