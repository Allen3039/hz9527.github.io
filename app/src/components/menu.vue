<template lang="html">
  <div class="menu" @click='handlerClick'>
    <div class='menu-tit'>目录</div>
    <div class="item" v-for='(item, ind) in menu' :key='item.key'>
      <div :class="['item-type', item.unwind ? 'item-type-up' : '']" :data-ind='ind'>{{item.key}}</div>
      <div class="item-con" v-show='item.unwind'>
        <div :class="['item-tit', curItem === '/' + info.time ? 'item-cur' : '']"
          v-for='info in item.list' :key='info.time' :data-time="info.time">
          {{info.title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from '../router/config.js'
const MenuConf = new Map(['js', 'css', '框架', '工程化', '踩坑', '其他'].map((key, i) => [key, -i - 1]))
const MenuDefault = '其他'
export default {
  data () {
    return {
      menu: this.initMenu(),
      curItem: ''
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (v) {
        this.curItem = v.path
      }
    }
  },
  methods: {
    handlerClick (e) {
      if ('time' in e.target.dataset && this.curItem !== '/' + e.target.dataset['time']) {
        this.goDetail('/' + e.target.dataset['time'])
      } else if ('ind' in e.target.dataset) {
        this.toggleType(e.target.dataset['ind'])
      }
    },
    goDetail (path) {
      this.$router.push(path)
    },
    toggleType (ind) {
      let item = this.menu[ind]
      item.unwind = !item.unwind
      this.$set(this.menu, ind, item)
    },
    initMenu () {
      let result = []
      Config.forEach(item => {
        let type = MenuConf.has(item.type) ? item.type : MenuDefault
        let ind = MenuConf.get(type)
        if (ind < 0) {
          result[-ind - 1] = {
            key: type,
            unwind: false,
            list: [item]
          }
          MenuConf.set(type, -ind - 1)
        } else {
          result[ind].list.push(item)
        }
      })
      return result.filter(item => item)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/variable.scss';
  .menu {
    .menu-tit {
      padding: 10px 0;
      border-bottom: 1px solid $border-c;
      text-align: center;
    }
  }
  .item {
    cursor: pointer;
    &:last-child {
      .item-tit:last-child {border-bottom-width: 1px;}
    }
    .item-type {
      padding: 5px 0 5px 10px;
      background: $bg-c;
      border-bottom: 1px solid $border-c;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        right: 20px;
        top: 50%;
        margin-top: -5px;
        width: 10px;
        height: 10px;
        box-sizing: border-box;
        border-top: 1px solid $border-c;
        border-right: 1px solid $border-c;
        transform: rotate(135deg);
        transform-origin: 71.5% 28.5%;
      }
    }
    .item-type-up {
      &:after {
        transform: rotate(-45deg);
      }
    }
    .item-tit {
      padding: 5px;
      margin-left: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid $border-c;
      &:last-child {border-bottom-width: 0;}
    }
    .item-cur {
      color: #f55;
    }
  }
</style>
