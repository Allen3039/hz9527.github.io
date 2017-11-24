function InitEvent (el, cb, arg, context) {
  !this.cb && cb && (InitEvent.prototype.cb = cb);
  this.arg = arg;
  this.context = context || null;
  var that = this;
  el.onclick = function (e) {
    var next = that.next(e.target);
    if (typeof that.cb === 'function') {
      that.cb.apply(that.context, (arg || []).push(next));
    } else {
      next();
    }
  }
};
InitEvent.prototype.next = function (target) {
  return function next () {
    var path;
    if (path = target.dataset.path || target.parentNode.dataset.path) {
      window.location = 'https://hz9527.github.io' + path;
    }
    target = null;
  }
}

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
