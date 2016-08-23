export function isString(foo:  any): foo is string {
  return typeof foo === 'string';
}

export function createElement(template: string): Element {
  let div = document.createElement('div');
  div.innerHTML = template;
  return div.firstElementChild;
}

export function extend(dest: Object, ...srcs: Object[]): Object  {
  srcs.forEach((src) => {
    for(let prop in src) {
      dest[prop] = src[prop];
    }
  });

  return dest;
}
