'use strict';

angular.module('blvd', ['sortable']).run(function () {
  if(hljs) {
    hljs.configure({
      languages: ['javascript', 'json', 'css', 'html'],
      tabReplace: '  '
    });
  }
});
