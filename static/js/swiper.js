window.swiper = {
  colors: ['redBg', 'greenBg', 'blueBg'], // max 3
  timer: null,
  waitTime: 3000,
  moveTime: 500,
  stepTime: 30,
  width: 0,
  transX: 0,
  stepWidth: 0,
  hasMove: 0, // -1 last to first 1 first to last
  index: 0,
  length: 0,
  drag: false,
  init: function (config, target) { // target pc phone
    var list = this._initList(config);
    if (list) {
      this.render(list, target);
      if (list.length > 1) {
        this.length = list.length
        this._initAnimation(target, list.length * this.width);
      }
    }
  },
  render: function (list, target) {
    var colorList = this.colors.slice().sort(function () {return Math.random() - 0.5});
    var con = '';
    this.width = window.innerWidth;
    for (var i = 0; i < list.length; i++) {
      con += this._getItem(list[i], target, colorList[i], this.width);
    }
    var content = document.querySelector('.swiper-con');
    if (!content) {
      content = document.createElement('div');
      content.className = 'swiper-con';
      content.innerHTML = con;
      var body = document.querySelector('body');
      body.insertBefore(content, body.firstChild);
    } else {
      content.innerHTML = con;
    }
    content.style.width =  list.length * this.width + 'px';
  },
  _initAnimation: function (target) {
    var dom = document.querySelector('.swiper-con');
    this._initEvent(dom, target);
    this.stepWidth = parseInt(this.width / this.moveTime * this.stepTime);
    this.wait(dom);
  },
  move: function (dom) {
    var that = this;
    this.timer = setTimeout(function () {
      var value = that.transX + that.stepWidth;
      value = Math.abs(value) % that.width;
      if (value >= that.stepWidth && value < that.width) {
        that._move(dom, that.stepWidth);
        that.move(dom);
      } else {
        clearTimeout(that.timer)
        that.timer = null;
        that._move(dom, true);
        that.wait(dom);
      }
    }, this.stepTime)
  },
  wait: function (dom) {
    var that = this;
    this.timer = setTimeout(function () {
      clearTimeout(that.timer)
      that.timer = null;
      that.move(dom);
    }, this.waitTime)
  },
  _initEvent: function (dom, target) {
    var that = this;
    var sx;
    if (target === 'pc') {
      dom.onmousedown = function (e) {
        if (that.timer && e.buttons === 1) {
          clearTimeout(that.timer);
          that.timer = null;
          sx = e.clientX;
          that.drag = true;
        }
      }
      document.addEventListener('mouseup', function () {
        if (!that.timer) {
          that.timer = setTimeout(function () {
            that.drag = false;
            that.move(dom);
          }, 100);
        }
      });
      dom.onmousemove = function (e) {
        if (that.drag && e.buttons === 1) {
          that._move(dom, sx - e.clientX);
          sx = e.clientX;
        }
      }
    } else {
      dom.addEventListener('touchstart', function (e) {
        if (that.timer) {
          clearTimeout(that.timer);
          that.timer = null;
          sx = e.touches[0].clientX;
        }
      });
      dom.addEventListener('touchmove', function (e) {
        that._move(dom, sx - e.touches[0].clientX);
        sx = e.touches[0].clientX;
      });
      var end = function end () {
        if (!that.timer) {
          that.move(dom);
        }
      }
      dom.addEventListener('touchend', end);
      dom.addEventListener('touchcancel', end);
    }
  },
  _move: function (dom, m) { // m move or fix Number Boolean
    var tWidth = this.length * this.width;
    if (typeof m === 'number') {
      this.transX += m;
      // 如果<0将最后一项移到最前方；<-width移动整体； >tWidth-width将第一项移到最后；>tWidth移动整体
      if (this.transX < 0 && this.hasMove !== -1) {
        this.hasMove = -1
        this._moveItem(dom.lastChild, -tWidth);
      } else if (this.transX <= -this.width && this.hasMove !== 0) {
        this.hasMove = 0;
        this._moveItem(dom.lastChild, 0);
        this.transX = tWidth - this.width;
      } else if (this.transX > tWidth - this.width && this.hasMove !== 1) {
        this.hasMove = 1;
        this._moveItem(dom.firstChild, tWidth);
      } else if (this.transX >= tWidth && this.hasMove !== 0) {
        this.hasMove = 0;
        this._moveItem(dom.firstChild, 0);
        this.transX = 0;
      }
    } else { // 从右往左 计算index
      if (this.transX < 0 || this.transX > tWidth - this.width) {
        this.index = 0;
      } else {
        this.index = Math.ceil(this.transX / this.width);
      }
      this.transX = this.width * this.index;
      if (this.hasMove !== 0) {
        if (this.hasMove === -1) {
          this._moveItem(dom.lastChild, 0);
        } else {
          this._moveItem(dom.firstChild, 0);
        }
        this.hasMove = 0;
      }
    }
    this._moveItem(dom, -this.transX)
  },
  _moveItem: function (dom, v) {
    dom.style['-webkit-transform'] = 'translate3d(' + v + 'px, 0, 0)';
    dom.style['-moz-transform'] = 'translate3d(' + v + 'px, 0, 0)';
    dom.style['-ms-transform'] = 'translate3d(' + v + 'px, 0, 0)';
    dom.style.transform = 'translate3d(' + v + 'px, 0, 0)';
  },
  _initList: function (config) {
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
    };
    if (swiperList.length > 0) {
      return swiperList.sort(function (pre, next) {
        return pre.swiper - next.swiper
      }).slice(0, 3);
    } else {
      return false
    }
  },
  _getItem: function (item, target, color, width) {
    return '<div style="width:'+ width +'px;" class="swiper-item ' + color +'" data-path="' + item.path +
    '"><div class="container" data-path="' + item.path + '">' +
    '<div class="swiper-tit">' + item.title + '</div><div class="swiper-text">' + item.description +'</div></div></div>'
  }
}
