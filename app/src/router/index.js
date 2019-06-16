import Vue from 'vue'
import Router from 'vue-router'
import config from './getConfig.js'

Vue.use(Router)
export default new Router({
	mode: 'history',
	routes: config.map(item => ({
		path: '/' + item.time,
		component: () => import(`../pages/${item.file}`)
	})).concat([{
		path: '*',
		redirect: '/' + config[0].time
	}])
})
