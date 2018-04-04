<template lang="html">
  <div class="menu" @click='handlerClick'>
    <div class='menu-tit'>目录</div>
    <Serach class='menu-search' />
    <div class="menu-con">
      <div class="item" v-for='(item, ind) in menu' :key='item.key'>
        <div :class="['item-type', item.unwind ? 'item-type-up' : '']" :data-ind='ind'>{{item.key}}</div>
        <div class="item-con" v-show='item.unwind'>
          <div :class="['item-tit', curItem === '/' + info.time ? 'item-cur' : '']"
            v-for='info in item.list' :key='info.time' :data-time="info.time">
            <span class='item-name ellipsis' :data-time="info.time">{{info.title}}</span>
            <b class='item-tag' :data-time="info.time" v-show='now - info.time < 1000 * 3600 * 24 * 3'>新</b>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-footer">
      design by hz
    </div>
  </div>
</template>

<script>
import Config from '../router/config.js'
import Serach from './search.vue'
const MenuConf = new Map(['js', 'css', '框架', '工程化', '踩坑', '其他'].map((key, i) => [key, -i - 1]))
const MenuDefault = '其他'
export default {
  data () {
    return {
      now: Date.now(),
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
            unwind: true,
            list: [item]
          }
          MenuConf.set(type, -ind - 1)
        } else {
          result[ind].list.push(item)
        }
      })
      return result.filter(item => item)
    }
  },
  components: {
    Serach
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/variable.scss';
  .menu {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .menu-tit, .menu-search, .menu-footer {
      flex-shrink: 0;
    }
    .menu-tit {
      padding: 10px 0;
      text-align: center;
    }
    .menu-search {
      width: 80%;
      margin: 0 auto 10px auto;
    }
    .menu-con {
      flex-grow: 1;
      overflow: auto;
    }
    .menu-footer {
      height: 50px;
      line-height: 50px;
      background-color: $bg-footer;
      color: #fff;
      text-align: center;
    }
  }
  .item {
    cursor: pointer;
    &:last-child {
      .item-type {border-bottom: 1px solid $border-c;}
      .item-tit:last-child {border-bottom-color: $border-c;}
    }
    .item-type {
      padding: 5px 0 5px 10px;
      background: $bg-c;
      border-top: 1px solid $border-c;
      border-bottom: 0;
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
      border-bottom: 1px solid $border-c;
      &:after {
        transform: rotate(-45deg);
      }
    }
    .item-tit {
      display: flex;
      padding: 5px 10px 5px 0;
      margin-left: 15px;
      border-bottom: 1px solid $border-c;
      &:last-child {border-bottom-color: transparent;}
      &:hover {
        .item-name {border-left-color: $theme-c;}
      }
      .item-name {
        padding:0 10px;
        flex-grow: 1;
        border-left: 2px solid transparent;
      }
      .item-tag {
        flex-shrink: 0;
        width: 18px;
        height: 18px;
        font-size: 12px;
        text-align: center;
        line-height: 18px;
        border: 1px solid $theme-c;
        border-radius: 50%;
        color: $theme-c;
      }
    }
    .item-cur {
      color: $theme-c;
    }
  }
</style>
