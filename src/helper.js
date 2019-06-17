/**
 * remove '/' from head and tail
 * @param  [string] path target string
 * @return [string]      trimed string
 */
function trim(path) {
  return path.toString()
    .replace(/\/+$/, '').replace(/^\/+/, '');
}

export default { trim };
