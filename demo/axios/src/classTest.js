function propDecorator(conf) {
  return function (target, name, descriptor) {
    return Object.assign(descriptor, conf)
  }
}
class Axios {
  @propDecorator({enumerable: false})
  parent = null;
  @propDecorator({enumerable: false})
  _conf = {};
  constructor(config, parent = null) {
    this.parent = parent && parent.constructor === Axios ? parent : null;
    this._conf = config;
  }

  @propDecorator({enumerable: true})
  get config() {
    console.log(this)
    return this.getConfig()
  }
  set config(v) {
    this._conf = v;
  }

  @propDecorator({enumerable: true})
  request(config) {

  }

  static mergeConf (conf1, conf2) {

  }

  getConfig() {
    let result = this._conf;
    if (this.parent) {
      result = Axios.mergeConf(result, this.parent.config)
    }
    result.test = 'test';
    return result
  }
}

let axios = new Axios({a: 1});
let axios2 = new Axios({});
console.log(axios.request, axios.config, axios2.config)
for (let key in axios) {
  console.log(key)
}
console.log(Object.keys(axios))
