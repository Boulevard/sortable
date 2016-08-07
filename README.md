# Sortable

Sortable is an AngularJS module for sorting an arbitrary set of UI elements by dragging them.

* [License](#license)
<!-- * [Demo](#demo) -->
* [Installation](#installation)

## License

This software is provided free of charge and without restriction under the [MIT License](LICENSE.md)

## Demo

https://boulevard.github.io/sortable

## Installation

#### Using Bower

This package is installable through the Bower package manager.

```
bower install blvd-sortable --save
```

In your `index.html` file, include the sortable module.

```html
<script type="text/javascript" src="bower_components/sortable/dist/sortable.min.js"></script>
```

Include the `sortable` module as a dependency in your application.

```javascript
angular.module('myApp', ['sortable']);
```

#### Using npm and Browserify (or JSPM)

In addition, this package may be installed using npm.

```
npm install blvd-sortable --save
```

You may use Browserify to inject this module into your application.

```javascript
angular.module('myApp', [require('sortable')]);
```
