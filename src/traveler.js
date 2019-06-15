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

class Traveler {
  constructor() {
    this.routes = [];
    this.root = '/';

    // listen
    window.addEventListener('popstate', this.listen.bind(this));
  }

  // send current url to the routes
  listen() {
    const cur = this.current();

    this.notify(cur);
  }

  // get the current url
  current() {
    let fragment = '';

    fragment = Traveler.trim(decodeURI(window.location.pathname + window.location.hash));

    fragment = fragment.replace(/\?(.*)$/, '');
    fragment = this.root !== '/' ? fragment.replace(Traveler.trim(this.root), '') : fragment;

    return Traveler.trim(fragment);
  }

  // remove '/' from head and tail
  static trim(path) {
    return path.toString()
      .replace(/\/+$/, '').replace(/^\/+/, '');
  }

  // send the url to routes
  notify(url) {
    // 逐一對routes檢查
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].decide(url)) {
        return true;
        // 如果中了，就不用繼續
        break;
      }
    }

    return false;
  }

  // register the route
  register(route) {
    if (!(route instanceof Route)) {
      return false;
    }

    this.routes.push(route);
    return true;
  }

  // travel to the path
  go(path) {
    const url = this.root + path;
    window.history.pushState(null, null, url);

    this.listen();
  }

  setRoot(rootPath) {
    this.root = `/${Traveler.trim(rootPath)}/`;
  }
}

export { Traveler, Route };
