<template>
	<div id="app">
		<Menu class='menu' />
		<div class="content">
			<router-view/>
		</div>
	</div>
</template>

<script>
import Menu from './components/menu.vue'
export default {
	name: 'App',
	components: {
		Menu
	}
}
</script>

<style lang='scss'>
@import './styles/reset.scss';
@import './styles/common.scss';
</style>
