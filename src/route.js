class Route {
  /**
   * @param  [string] pattern route pattern, e.g. @a/@b/@c
   * @param  [string] act     action after hit
   */
  constructor(pattern, act) {
    this.pattern = pattern.replace('/', '');

    if (typeof act === 'function') {
      this.act = act;
    }
  }

  /**
   * Traveler will call this when get a new redirect path
   * @param  [url] url
   * @return [bool]
   */
  decide(url) {
    const parts = url.split('/');
    const params = this.pattern.split('@');

    params.shift();

    if (parts.length === params.length) {
      if (typeof this.act === 'function') {
        this.act(...parts); // 分別帶入各個參數
      }

      return true;
    }

    return false;
  }
}

export default Route;
