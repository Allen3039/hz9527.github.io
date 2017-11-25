function InitEvent (el, cb, arg, context) {
  var that = this;
  el.onclick = function (e) {
    var path = e.target.dataset.path || e.target.parentNode.dataset.path;
    if (path) {
      function next () {
        window.location = 'https://hz9527.github.io' + path;
      }
      if (typeof cb === 'function') {
        var args = arg || [];
        args.push(path);
        args.push(next);
        cb.apply(context, args);
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
  timer: null,
  init: function () {
    this._initHead();
    var that = this;
    window.onload = function () {
      window.list.init(window.config)
      window.swiper.init(window.config, that.target)
      new InitEvent(document.querySelector('.list-con'), function (path, next) {
        window.toast.check(window.config, path, that.target, next);
      })// toast arg context  next will push into arg
      new InitEvent(document.querySelector('.swiper-con'), function (path, next) {
        if (!window.swiper.drag) { // toast
          window.toast.check(window.config, path, that.target, next);
        }
      })
    };
    window.onresize = function () {
      if (!that.timer) {
        that.timer = setTimeout(function () {
          clearTimeout(that.timer);
          that.timer = null;
          that._initHead();
          window.swiper.reset();
        }, 50)
      }
    }
  },
  _initHead: function () {
    this.target = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(window.navigator.userAgent.toLowerCase()) ?
      'phone' : 'pc';
    var meta = document.getElementById('viewPort');
    if (this.target === 'phone' && !meta) {
      meta = document.createElement('meta');
      meta.id = 'viewPort'
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no';
      document.querySelector('head').appendChild(meta);
    } else if (this.target === 'pc' && meta){
      document.removeChild(meta);
    }
  }
}

window.ctrlObj.init();
