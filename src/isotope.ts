import { isString, createElement } from './utils';

export class Isotope {
  private element: Element;
  
  constructor(element: Element | string) {
    this.element = isString(element) ? createElement(element) : element;
  }

  get DOMElement() {
    return this.element;
  }

  addClass(...classList: string[]) {
    classList.forEach((className) => {
      this.element.classList.add(className);
    });

    return this;
  }

  append(element: Isotope | Element | string) {
    if(isString(element)) {
      element = createElement(element);
    }

    this.DOMElement.appendChild(element instanceof Isotope ? element.DOMElement : element);

    return this;
  }
}

export default function (element: Element | string) {
  return new Isotope(element);
};