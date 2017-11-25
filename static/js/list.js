window.list = { // init render & will append list-con into body
  init: function (list) {
    var str = '';
    for (var i = 0; i < list.length; i++) {
      str += this._getItem(list[i]);
    }
    var content = document.querySelector('.list-con');
    if (!content) {
      content = document.createElement('div');
      content.className = 'list-con';
      content.innerHTML = str;
      document.querySelector('body').insertBefore(content, document.querySelector('.footer'));
    } else {
      content.innerHTML = str;
    }
  },
  _getItem: function (item) {
    var tips = this._getTips(item.tips)
    var result = '<div class="item container" data-path="' + item.path + '">' +
      '<div class="item-tit"data-path="' + item.path + '">' +item.title + tips + '</div>' +
      '<div class="item-text"data-path="' + item.path + '">' + item.description +
      '</div><div class="item-footer border-top"data-path="' + item.path + '">' + tips + '</div></div>';
    return result
  },
  _getTips: function (tips) {
    var str = tips.join('</span><span class="item-tip">')
    return '<span class="item-tip">' + str + '</span>'
  }
}
