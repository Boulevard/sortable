import { module } from 'angular';

class App {

  constructor() {
    console.log('hello world!');
  }
}

export default module('app', []).component('app', {
  controller: App,
  templateUrl: 'components/app/app.html'
});
