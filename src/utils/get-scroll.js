export function getScroll(target, top) {
  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';
  let ret = target[prop];
  if (typeof ret !== 'number') {
    ret = window.document.documentElement[method];
  }
  return ret;
}

