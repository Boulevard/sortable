import Scheduler from '../../../src/scheduler/scheduler.ts';
import { module } from 'angular';

class Calendar {
  constructor($element) {
    let cal = new Scheduler({
      end: new Date(),
      view: 'timeline',
      start: new Date()
    });

    $element.append(cal.view.element.DOMElement);
  }
}

export default module('calendar', []).component('calendar', {
  controller: Calendar
});
