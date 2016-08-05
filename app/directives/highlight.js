'use strict';

angular.module('blvd').directive('hljs', function () {

  function postLink(scope, element) {

    scope.$watch('code', function (code) {
      element.html(hljs ? hljs.highlight(scope.lang, code).value : code);
    });
  }

  return {
    link: postLink,
    scope: {code: '@', lang: '@'},
    restrict: 'EAC'
  };
});