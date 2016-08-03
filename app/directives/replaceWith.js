'use strict';

angular.module('blvd').directive('replaceWith', function ($http, $templateCache, $compile) {

  function postLink(scope, element, attrs) {
    $http.get(scope.$eval(attrs.replaceWith), {cache: $templateCache}).success(function (template) {
      element.replaceWith($compile(template)(scope));
    });
  }

  return {
    link: postLink
  };
});