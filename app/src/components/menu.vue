<template lang="html">
  <div class="menu">
    目录
    <div class="item" v-for='item in list' :key='item.time'>
      {{item.title}}
    </div>
  </div>
</template>

<script>
import List from '../router/config.js'
export default {
  data () {
    return {list: List}
  }
}
</script>

<style lang="scss" scoped>
</style>
