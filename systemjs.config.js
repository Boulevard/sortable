// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md
(function (global, undefined) {

  var paths = {
    'npm:': 'node_modules/'
  };

  var map = {
    'react': 'npm:react/react.js',
    'angular': 'npm:angular/angular.js',
    'typescript': 'npm:typescript/lib/typescript.js'
  };

  var meta = {
    'angular': {
      format: 'global',
      exports: 'angular'
    }
  };

  var packages = {
    'app': { defaultExtension: 'ts' },
    'src': { defaultExtension: 'ts' },
  };

  var config = {
    map: map,
    meta: meta,
    paths: paths,
    packages: packages,
    transpiler: 'typescript'
  };

  System.config(config);

})(this);