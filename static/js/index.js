function InitEvent (el, cb, arg, context) {
  var that = this;
  el.onclick = function (e) {
    var path = e.target.dataset.path || e.target.parentNode.dataset.path;
    if (path) {
      function next () {
        window.location = 'https://hz9527.github.io' + path;
      }
      if (typeof cb === 'function') {
        arg = arg || [];
        arg.push(path);
        arg.push(next);
        cb.apply(context, arg);
      } else {
        next();
      }
    }
  }
};

// return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ppo.ua('l'));
// return lower ? window.navigator.userAgent.toLowerCase() : window.navigator.userAgent;

window.ctrlObj = {
  target: null,
  init: function () {
    this._initHead();
    var that = this;
    window.onload = function () {
      window.list.init(window.config)
      window.swiper.init(window.config, that.target)
      new InitEvent(document.querySelector('.list-con'))// toast arg context  next will push into arg
      new InitEvent(document.querySelector('.swiper-con'), function (path, next) {
        if (!window.swiper.drag) {
          // toast
          window.toast.check(window.config, path, that.target, next);
        }
      })
    };
  },
  _initHead: function () {
    this.target = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(window.navigator.userAgent.toLowerCase()) ?
      'phone' : 'pc';
    if (this.target === 'phone') {
      var meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no';
      document.querySelector('head').appendChild(meta);
    }
  }
}

window.ctrlObj.init();
