import helper from './helper';

class Route {
  /**
   * @param  [string] pattern route pattern, e.g. @a/@b/@c
   * @param  [string] act     action after hit
   */
  constructor(pattern, act) {
    const trimedPattern = helper.trim(pattern);

    this.parts = trimedPattern.split('/');

    if (typeof act === 'function') {
      this.act = act;
    }
  }

  /**
   * Traveler will call this when get a new redirect path
   * @param  [string] url trimed url
   * @return [bool]
   */
  decide(url) {
    const urlParts = url.split('/');
    const params = [];

    if (urlParts.length !== this.parts.length) {
      return false;
    }

    for (let i = 0; i < urlParts.length; i += 1) {
      const isParam = /^@/.test(this.parts[i]);

      if (!isParam && (urlParts[i] !== this.parts[i])) {
        return false;
      }

      if (isParam) {
        params.push(urlParts[i]);
      }
    }

    if (typeof this.act === 'function') {
      this.act(...params); // put the url parts which has '@' into the callback
    }

    return true;
  }
}

export default Route;
