'use strict';

function App() {
  this.todos = [
    'Win lottery',
    'Go sky diving',
    'Eat one gallon of icecream'
  ];
}

angular.module('blvd').component('app', {
  controller: App,
  templateUrl: 'components/app/app.html'
});
