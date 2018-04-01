<template lang="html">
  <div class="search">
    <input type="text" @input='handlerSearch' @blur="handlerInput('blur')" @focus="handlerInput('focus', $event)" placeholder='标题、标签、类型' />
    <div class="search-result" v-show='showResult'>
      <div class="no-result" v-show='result.length === 0'>暂无结果</div>
      <div class="result-item" v-for='item in result' :key='item.path' @click="handlerDetail(item.path)">
        <div class='item-tit ellipsis' v-html='item.title'></div>
        <div class="item-info ellipsis">
          <span class='item-type' v-html='item.type'>js</span>
          <span class='item-tips' v-for='tip in item.tips' v-html='tip' :key='tip'></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from '../router/config.js'
import Search from '../utils/search.js'
const BLUR_TIME = 200
const TIME = 300
export default {
  data () {
    return {
      showResult: false,
      result: [],
      $timer: null,
      $keyWord: ''
    }
  },
  methods: {
    handlerInput (type, e) {
      if (type === 'blur') {
        setTimeout(() => {
          this.showResult = false
        }, BLUR_TIME)
      } else {
        this.handlerSearch(e)
      }
    },
    handlerSearch (e) {
      this.$keyWord = e.target.value
      if (!this.$timer) {
        this.result = Search(this.$keyWord, Config)
        this.$timer = -1
        setTimeout(() => {
          this.$timer === -1 && (this.$timer = null)
        }, TIME)
      } else if (this.$timer === -1) {
        this.$timer = setTimeout(() => {
          this.result = Search(this.$keyWord, Config)
          this.$timer = null
        }, TIME)
      }
      if (e.target.value) {
        !this.showResult && (this.showResult = true)
      } else {
        this.showResult && (this.showResult = false)
      }
    },
    handlerDetail (path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/variable.scss';
  .search {
    position: relative;
    input {
      box-sizing: border-box;
      width: 100%;
      padding: 5px 15px;
      border-radius: 15px;
      border: 1px solid $border-c;
      &:focus {
        border-color: $tip-c;
      }
    }
  }
  .search-result {
    position: absolute;
    top: 100%;
    left: 0%;
    margin-top: 5px;
    width: 100%;
    max-height: 200px;
    overflow: auto;
    border: 1px solid $border-c;
    border-radius: 3px;
    background: #fff;
    z-index: 1000;
  }
  .no-result {
    text-align: center;
    padding: 10px;
    color: $light-c;
  }
  .result-item {
    margin: 5px 10px;
    padding: 3px 0 5px 0;
    border-bottom: 1px solid $border-c;
    cursor: pointer;
    &:last-child {
      border-bottom: 0;
    }
    .item-info {
      font-size: 12px;
      .item-type, .item-tips {
        display: inline-block;
        padding: 0px 5px;
      }
      .item-type {
        background: $bg-c;
      }
      .item-tips {
        border-radius: 8px;
        border: 1px solid $tip-c;
      }
    }
  }
</style>
