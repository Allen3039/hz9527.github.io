import Vue from 'vue'
import Router from 'vue-router'
import config from './config.js'

Vue.use(Router)

export default new Router({
  routes: config.map(item => ({
    path: '/',
    component: () => import(`../pages/${item.file}`)
  }))
})
