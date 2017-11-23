window.swiper = {
  init (config, target) { // target pc phone
    var swiperList = [];
    for (var i = 0; i < config.length; i++) {
      if (config[i].swiper > -1) {
        swiperList.push({
          title: config[i].title,
          description: config[i].description,
          tips: config[i].tips,
          path: config[i].path,
          target: config[i].target,
          swiper: config[i].swiper
        });
      }
    }
    if (swiperList.length > 0) {
      swiperList.sort(function (pre, next) {
        return pre.swiper - next.swiper
      })
      this.render(swiperList, target)
    }
  },
  render (list, target) {

  }
}
