import $, { Isotope } from '../isotope';
import Timeline from '../timeline/timeline';
import { extend } from '../utils';

type view = 'calendar' | 'timeline';

interface Options {
  end?: Date;
  view?: view;
  start?: Date;
}

class Scheduler {
  private options: Options;

  view: Timeline;

  private defaultOptions(): Options {
    let now = new Date();

    return {
      end: now,
      view: 'calendar',
      start: now
    };
  }

  constructor(options: Options) {
    this.options = extend({}, this.defaultOptions(), options);
    this.setView(this.options.view);
  }

  get end() {
    return this.options.end;
  }

  setView(view: view) {
    if(view === 'calendar') {
      this.view = new Timeline(this.options);
    } else {
      this.view = new Timeline(this.options);
    }
  }

  get start() {
    return this.options.start;
  }
}

export default Scheduler;
