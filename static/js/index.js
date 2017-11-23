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
  return function () {
    var path;
    if (path = target.dataset.path || target.parentNode.dataset.path) {
      window.location = 'https://hz9527.github.io' + path
    }
  }
}

// return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ppo.ua('l'));
// return lower ? window.navigator.userAgent.toLowerCase() : window.navigator.userAgent;

window.onload = function () {
  window.list.init(window.config)
  new InitEvent(document.querySelector('.list-con'))// toast arg context  next will push into arg
}
