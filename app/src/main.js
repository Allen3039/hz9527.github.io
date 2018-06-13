// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.filter('formatTime', v => {
	let time = new Date(v)
	return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
})

Vue.directive('toggle', {
	inserted (el) {
		let show = true
		el.innerHTML = '收起'
		el.onclick = () => {
			show = !show
			Array.prototype.forEach.call(el.parentNode.children, child => {
				if (child !== el) {
					child.style.display = show ? 'block' : 'none'
				} else {
					el.innerHTML = show ? '收起' : '展开'
				}
			})
		}
	},
	unbind (el) {
		el.onclick = null
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
