import Vue from 'vue'
import Router from 'vue-router'
import Login from '../main/Login.vue'
import Menu from '../main/Menu.vue'
import Admin from '../main/Admin.vue'
// import Order from '../main/Order.vue'
import Home from '../main/home.vue'
import Data_center from '../main/Data_center.vue'
import Contact_us from '../main/Contact_us.vue'
import About_us from '../main/About_us.vue'
import Products from '../main/Products.vue'
import Projects from '../main/Projects.vue'
import News from '../main/News.vue'
import Station from '../main/Station.vue'
import Station_psw from '../main/Station_psw.vue'
import Station_admin from '../main/Station_admin.vue'
import Station_copyright from '../main/Station_copyright.vue'
import Station_banner from '../main/Station_banner.vue'
import Message_board from '../main/Message_board.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'menu',
      component: Menu,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },{
          path: '/message-board',
          name: '留言管理',
          component: Message_board
        },{
          path: '/data-center',
          name: '数据中心',
          component: Data_center,
          children: [
            {
              path: '/contact-us',
              name: '联系我们',
              component: Contact_us
            }, {
              path: '/about-us',
              name: '关于我们',
              component: About_us
            }, {
              path: '/products',
              name: '产品中心',
              component: Products
            }, {
              path: '/projects',
              name: '案例展示',
              component: Projects
            }, {
              path: '/news',
              name: '新闻中心',
              component: News
            }
          ]
        },{
          path: '/station',
          name: '站点设置',
          component: Station,
          children: [
            {
              path: '/station-psw',
              name: '修改密码',
              component: Station_psw
            },{
              path: '/station-admin',
              name: '管理员管理',
              component: Station_admin
            },{
              path: '/station-copyright',
              name: '版权信息管理',
              component: Station_copyright
            },{
              path: '/station-banner',
              name: '轮播图片管理',
              component: Station_banner
            }
          ]
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
