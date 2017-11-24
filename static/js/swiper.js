window.swiper = {
  colors: ['redBg', 'greenBg', 'blueBg'], // max 3
  timer: null,
  waitTime: 3000,
  moveTime: 1000,
  stepTime: 50,
  width: 0,
  transX: 0,
  stepWidth: 0,
  hasMove: 0, // -1 last to first 1 first to last
  init: function (config, target) { // target pc phone
    var list = this._initList(config);
    if (list) {
      this.render(list, target);
      if (list.length > 1) {
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
  _initAnimation: function (target, tWidth) {
    var dom = document.querySelector('.swiper-con');
    this._initEvent(dom, target, tWidth);
    this.stepWidth = this.moveTime / this.stepTime;
    this.wait(dom, tWidth);
  },
  move: function (dom, tWidth) {
    var that = this;
    this.timer = setTimeout(function () {
      var value = (that.transX + that.stepWidth) % that.width
      if (value >= that.stepWidth && value <= that.width - that.stepWidth) {
        that._move(dom, that.stepWidth, tWidth);
        that.move(dom, tWidth);
      } else {
        that._move(dom, that.width - that.transX % that.width, tWidth);
        clearTimeout(that.timer)
        that.timer = null;
        that.wait(dom, tWidth);
      }
    }, this.stepTime)
  },
  wait: function (dom, tWidth) {
    var that = this;
    this.timer = setTimeout(function () {
      clearTimeout(that.timer)
      that.timer = null;
      that.move(dom, tWidth);
    }, this.waitTime)
  },
  _initEvent: function (dom, target, tWidth) {
    var that = this;
    var preX, sx;
    if (target === 'pc') {
      dom.onmousemove = function (e) {
        if (e.buttons === 1) {
          if (that.timer) {
            clearTimeout(that.timer);
            that.timer = null;
            preX = e.offsetX;
            sx = that.transX;
          } else {
            that._move(dom, null, tWidth, sx + preX - e.offsetX);
          }
        } else if (!that.timer) {
          preX = null;
          that.move(dom, tWidth);
        }
      }
    }
  },
  _move: function (dom, m, tWidth, x) {
    if (typeof x === 'number') {
      this.transX = x;
    } else {
      this.transX += m;
    }
    // 如果<0将最后一项移到最前方；<-width移动整体； >tWidth-width将第一项移到最后；>tWidth移动整体
    if (this.transX < 0 && this.hasMove !== -1) {
      this.hasMove = -1
      this._moveItem(dom.lastChild, -tWidth);
    } else if (this.transX < -this.width) {
      this.hasMove = 0;
      this._moveItem(dom.lastChild, 0);
      this.transX = tWidth - this.width;
    } else if (this.transX > tWidth - this.width && this.hasMove !== 1) {
      this.hasMove = 1;
      this._moveItem(dom.firstChild, tWidth);
    } else if (this.transX > tWidth) {
      this.hasMove = 0;
      this._moveItem(dom.firstChild, 0);
      this.transX = 0;
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
