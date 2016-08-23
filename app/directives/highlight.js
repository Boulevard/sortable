'use strict';

angular.module('blvd').directive('hljs', function () {

  function postLink(scope, element) {

    scope.$watch('code', function (code) {
      element.html(hljs.highlight(scope.lang, code).value);
    });
  }

  return {
    link: postLink,
    scope: {code: '@', lang: '@'},
    restrict: 'EAC'
  };
});