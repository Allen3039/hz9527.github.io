import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/test.md'
import test from './config.js'

Vue.use(Router)
console.log(test)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
