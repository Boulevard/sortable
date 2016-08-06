'use strict';

function touchDirective(touchEvent) {
  if(!('on' + touchEvent in document.documentElement)) {
    return;
  }

  var directiveName = 'ng' + touchEvent.charAt(0).toUpperCase() + touchEvent.substr(1);

  angular.module('blvd').directive(directiveName, function($parse) {

    function compile(tElement, tAttrs) {
      var fn = $parse(tAttrs[directiveName], null, true);

      return function (scope, element) {
        element.on(touchEvent, function (event) {
          var callback = function () {
            fn(scope, {$event: event});
          };

          scope.$apply(callback);
        });
      };
    }

    return {
      restrict: 'A',
      compile: compile
    };
  });
}

['touchstart', 'touchmove', 'touchend'].forEach(touchDirective);
