'use strict';

angular.module('blvd', ['sortable']).run(function () {
  hljs.configure({
    languages: ['javascript', 'json', 'css', 'html'],
    tabReplace: '  '
  });
});
