import Route from './route';

class Traveler {
  constructor() {
    this.routes = [];
    this.root = '/';
    this.mode = (window.history.pushState) ? 'history' : 'hash';

    // listen
    window.addEventListener('popstate', this.listen.bind(this));
  }

  // send current url to the routes
  listen() {
    let cur = this.current();

    if (this.mode === 'hash') {
      cur = cur.replace('#', '');
    }

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
  go(path, replace) {
    const trimPath = Traveler.trim(path);

    let url = this.root + trimPath;

    if (this.mode === 'hash') {
      url = `${Traveler.trim(this.root)}#${trimPath}`;
    }

    if (replace) {
      window.history.replaceState(null, null, url);
    } else {
      window.history.pushState(null, null, url);
    }

    this.listen();
  }

  setRoot(rootPath) {
    this.root = '/';

    if (typeof rootPath === 'string' && rootPath !== '') {
      this.root = `/${Traveler.trim(rootPath)}/`;
    }
  }
}

export { Traveler, Route };
