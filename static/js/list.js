window.list = { // init render & will append list-con into body
  // init: function (config) { // init in index.js
  //   this.render(config);
  //   // if (typeof cb === 'function') {
  //   //   var swiperList = [];
  //   //   for (var i = 0; i < config.length; i++) {
  //   //     if (config[i].swiper > -1) {
  //   //       swiperList.push({
  //   //         title: config[i].title,
  //   //         description: config[i].description,
  //   //         tips: config[i].tips,
  //   //         path: config[i].path,
  //   //         target: config[i].target,
  //   //         swiper: config[i].swiper
  //   //       });
  //   //     }
  //   //   }
  //   //   swiperList.sort(function (pre, next) {
  //   //     return pre.swiper - next.swiper
  //   //   })
  //   //   cb(swiperList);
  //   // }
  // },
  render: function (list) {
    var str = '';
    for (var i = 0; i < list.length; i++) {
      str += this._getItem(list[i]);
    }
    var content = document.querySelector('.list-con');
    if (!content) {
      content = document.createElement('div');
      content.className = 'list-con';
      content.innerHTML = str;
      document.querySelector('body').appendChild(content);
    } else {
      content.innerHTML = str;
    }
  },
  _getItem: function (item) {
    var result = '<div class="item" ></div>'
    return result
  }
}
