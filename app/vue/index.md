## observer 整体实现

1. Watcher 用于收集依赖，当依赖的 数据 被 set 时 通过 dep.subs[i]update() 执行相应变化
  * Watcher 可以是 vm computed watch
  * Watcher 调用 get 时通过 设置 Dep.target 将 dep 添加到自己的 deps 里，并将该 watcher 添加到 dep 的 subs 里
  * Observer 被 set 时 调用 dep.subs[i]update()
2. Dep 用于管理 Observer 与 Watcher 之间的发布订阅关系
3. Observer
