window.toast = {
  cache: {},
  check: function (config, path, target, next) {
    if (!(path in this.cache)) {
      for (var i = 0; i < config.length; i++) {
        if (config[i].path === path) {
          this.cache[path] = {
            target: config[i].target
          }
          break;
        }
      }
    }
    if (this.cache[path].target === target) {
      next();
    } else {
      this._render(this._getText(this.cache[path]), next);
    }
  },
  _render: function (text, next) {
    var content = document.querySelector('.toast-con');
    if (content) {
      content.querySelector('.toast-text').innerHTML = text;
    } else {
      content = document.createElement('div');
      content.className = 'toast-con';
      content.style.display = 'none';
      content.innerHTML = this._getTem(text);
      document.querySelector('body').appendChild(content);
      this._initEvent(content, next);
    }
    this.next = next;
    content.style.display = 'block';
  },
  next: null,
  _initEvent: function (dom, next) {
    var that = this;
    dom.onclick = function (e) {
      if ('exec' in e.target.dataset) {
        var exec = e.target.dataset.exec;
        if (exec === 'confirm') {
          that.next();
        } else {
          dom.style.display = 'none';
        }
      }
    }
  },
  _getTem: function (text) {
    return '<div class="toast-panel"><div class="toast-text">'+ text +
    '</div><div class="toast-footer border-top"><span class="toast-cancel" data-exec="cancel">取消</span>' +
    '<span class="toast-confirm" data-exec="confirm">确认</span></div></div>'
  },
  _getText: function (target) {
    if (target === 'pc') {
      return '该项目是一个PC项目，您当前设备是移动端，是否确认继续访问？';
    } else {
      return '该项目是一个移动端项目，您当前设备是PC，是否确认继续访问？';
    }
  }
}
