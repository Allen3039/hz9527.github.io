## 概述
本仓库将集成所有发布的页面合集  
本页面只是一个目录供搜索这些页面  

## 开发
新的页面地址在`config.js`中配置  

### 关于config
|配置项|数据类型|作用|示例|备注|
|---|---|---|---|---|
|path|String|页面地址|'/timerunning'|只需要路由部分|
|target|String|标识页面类型，在跳转前读取ua对比，然后确定是否toast提示|'pc'|枚举类型，支持pc phone all|
|keyWords|Array|用于搜索匹配|['canvas', 'rollup', '文字识别']|部分匹配即可，即用户输入可以多于这个|
|tips|Array|展示在列表下tip|['demo', 'canvas']|具体查看注释|
|title|String|项目标题|rollup打包的canvas demo|—|
|description|String|简述项目|自动识别用户输入文案以canvas绘制该文案|—|
|swiper|Number|是否出现在swiper中及在swiper中位置|-1|-1为不展示|

### 关于代码
本项目将使用传统开发方式，即不使用babel，postcss及任何框架和库，因此项目中注意兼容性
