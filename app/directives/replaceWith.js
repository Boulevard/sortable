'use strict';

angular.module('blvd').directive('replaceWith', function ($http, $templateCache, $compile) {
  'ngInject';

  function postLink(scope, element, attrs) {
    $http.get(scope.$eval(attrs.replaceWith), {cache: $templateCache}).then(function (response) {
      element.replaceWith($compile(response.data)(scope));
    });
  }

  return {
    link: postLink
  };
});