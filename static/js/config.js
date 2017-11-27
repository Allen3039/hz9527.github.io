// tips 支持两个维度 1.方向（笔记、demo） 2.技术（如vue 代码片段 基础等）
window.config = [
  {
    path: '/timerunning',
    target: 'pc', // pc or phone or all & toast will warning
    keyWords: ['canvas', 'rollup', '文字识别'], // for search
    tips: ['demo', 'canvas'], // tips of this project
    title: 'rollup打包的canvas demo', // title of project
    description: '自动识别用户输入文案以canvas绘制该文案，使用rollup打包，未使用框架或库', // description for this project
    swiper: 1
  },
  {
    path: '/useful_code',
    target: 'phone', // pc or phone or all & toast will warning
    keyWords: ['code', 'base', '代码片段'], // for search
    tips: ['code', 'useful', 'loader'], // tips of this project
    title: '收集一些有用的代码片段', // title of project
    description: '收集一些常用的代码片段，项目除了本身意义外，项目使用了vue搭建，并使用node封装一个简单的模版引擎，将md文件自动转成vue并在router配置中插入生成的页面', // description for this project
    swiper: 2
  },
  {
    path: '/vue_demo',
    target: 'pc', // pc or phone or all & toast will warning
    keyWords: ['vue', 'vueApi'], // for search
    tips: ['vue', 'vue api'], // tips of this project
    title: '收集一些vue不常用不常见但可能很有用的api', // title of project
    description: '收集一些vue不常用不常见但可能很有用的api，如v-model指令，sync修饰符等', // description for this project
    swiper: 3
  },
  {
    path: '/myBooks',
    target: 'pc', // pc or phone or all & toast will warning
    keyWords: ['book', 'gitbook', 'note'], // for search
    tips: ['book', 'notes'], // tips of this project
    title: 'myBooks', // title of project
    description: '各种前端笔记包含基础，如js，css，es6等；框架如vue等，工程化等等相关笔记', // description for this project
    swiper: -1
  }
]
