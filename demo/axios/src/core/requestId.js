export default class RequestId {
  static cacheId = '0'
  constructor() {
    this.id = ''
    let i = RequestId.cacheId.length - 1;
    let id = '10';
    while (id === '10' && i >= 0) {
      id = (Number(RequestId.cacheId[i--]) + 1).toString();
      this.id = id[id.length - 1] + this.id;
    }
    this.id = (id === '10' ? '1' : RequestId.cacheId.slice(0, i)) + this.id;
    this.cacheId = this.id;
  }
}