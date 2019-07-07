## 序
其实自己也算是一个github中度用户，但一直除了写一些自娱自乐的demo外并没有去做什么贡献，但又考虑了下自己的水平及兴趣，不如做一个博客吧。  
其实之前这个仓库也算是一个博客站，但是还是比较简单，所以决定更改这个仓库，原项目在old分支上。  
具体这个博客写些什么其实也没完全想好，大概目前会划分js、css、框架、工程化、踩坑、其他，六个模块  

## 开发说明
1. 博客系统使用vue开发
2. 写博客在`src/pages`新建md即可（目前是当md符合编译条件会自动编译生成路由等）
3. 发布使用`npm run release`(在app目录下)

### markdown文件说明
1. 标题使用`##`
2. 文章类型使用`<b class='type'></b>`
3. 关键字部分使用`<b class='kw'></b>`

### feature规划
- [x] 自动生成配置文件，用于路由及搜索使用
- [x] 自动生成更新时间，嵌入markdown文件，根据更新时间在目录栏展示
  -[ ] 单独文件保持，不再保存到 md 文件
- [x] 自定义markdown－loader，支持锚点，自动生成文章大纲，自动注入一些class等
- [x] 自定义页面是否显示（dev可见，prod不可见）
- [x] 支持页面间跳转和 iframe 接入
- [ ] 演示代码沙盒
- [ ] gitment 接入 & mta 接入
  * https://github.com/imsun/gitment
  https://blog.julysong.com/2018/09/26/gitment/
  http://www.coldcrack.me/2018/07/18/Next_Gittalk/
  https://vssue.js.org/zh/demo/
  * https://mta.qq.com/mta/overview/ctr_all_app_new?tab=2
- [ ] 开发首页并支持配置
- [ ] 动画效果
- [ ] 移动端适配
