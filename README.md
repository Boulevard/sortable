# Sortable

Sortable is an AngularJS module for sorting an arbitrary set of UI elements by dragging them.

* [License](#license)
* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
* [API Documentation](api-documentation)

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
## Usage

```html
<div>Rank your favorite junk food.</div>

<ol sortable>
  <li>Reeses Peanut Butter Cup</li>
  <li>Hostess Twinkies</li>
  <li>Ben & Jerry's Ice Cream</li>
</ol>
```

## API Documentation

#### Attributes

| Attribute                              | Type         | Details |
| :------------------------------------- | :----------- | :------ |
| `dragEnd`   <br> <sub>(optional)</sub> | `Function`   | Callback function on drag end. (see below for arguments) |
| `dragMove`  <br> <sub>(optional)</sub> | `Function`   | Callback function on drag move. (see below for arguments) |
| `dragStart` <br> <sub>(optional)</sub> | `Function`   | Callback function on drag start. (see below for arguments) |
| `ngModel`   <br> <sub>(optional)</sub> | `Array`      | The array will be reordered as elements are sorted in the UI. |
| `options`   <br> <sub>(optional)</sub> | `Object`     | Configurable options. (see below for details) |
| `sortable`  <br>                       | `expression` | Will enable sorting if empty or evaluates to true. |

#### Callbacks

`dragStart(element)`

| Argument   | Type      | Details |
| :--------- | :-------- | :------ |
| `element`  | `jqLite`  | The element being dragged. |

`dragMove(element)`

| Argument   | Type      | Details |
| :--------- | :-------- | :------ |
| `element`  | `jqLite`  | The element being dragged. |

`dragEnd(element, newIndex, oldIndex, [sequence])`

| Argument   | Type      | Details |
| :--------- | :-------- | :------ |
| `element`  | `jqLite`  | The element being dragged. |
| `newIndex` | `Integer` | The new index of the element. |
| `oldIndex` | `Integer` | The old index of the element. |
| `sequence` | `Array`   | A reference to the sequence. Requires `ngModel` |

#### Options 

| Property    | Type      | Details |
| :---------- | :-------- | :------ |
| `dropzone`  | `String`  | Provide a template for the drop zone. By default an empty element with the same tag name as the element being dragged will be created. |
| `sameSize`  | `Boolean` | Will make the dropzone the same size as the element being dragged. The default is `true` |
| `threshold` | `Number`  | The magnitude, in pixels, the user must drag before initiating a drag. The default is `2` |

#### Styling

The element being dragged will have the `dragging` class.
The drop zone will have the `drop-zone` class.
