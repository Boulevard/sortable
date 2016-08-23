import $, { Isotope } from '../isotope';
import * as React from 'react';

interface Options {
  end: Date;
  start: Date;
}

class Timeline {
  public element: JSX.Element;

  constructor(options: Options) {
    this.element = <div className="timeline"></div>;

    for(let day = options.start.getDate(); day <= options.end.getDate(); day++) {
      this.element.append('<div></div>');
    }
  }
}

export default Timeline;