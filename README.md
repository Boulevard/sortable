# Sortable

Sortable is an AngularJS module for sorting an arbitrary set of UI elements by dragging them.

* [License](#license)
* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
* [Caveats](#caveats)
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

#### Using npm and a Module Bundler (webpack or Browserify or jspm)

In addition, this package may be installed using npm.

```
npm install blvd-sortable --save
```

You may use Browserify to inject this module into your application.

```javascript
angular.module('myApp', [require('blvd-sortable')]);
```
## Usage


#### Basic Usage

```html
<div>Rank your favorite junk food.</div>

<ol sortable>
  <li>Reeses Peanut Butter Cup</li>
  <li>Hostess Twinkies</li>
  <li>Ben & Jerry's Ice Cream</li>
</ol>
```

#### Responding to drag events

```javascript
class SortableController {
  canSort = true;

  onDragStart = (element) => {
    ...
  }
  
  onDragMove = (element) => {
    ...
  }

  onDragEnd = (element, newIndex, oldIndex, sequence) => {
    ...
  }
}
```

```html
<div>Rank your favorite junk food.</div>

<ol sortable="$ctrl.canSort" drag-start="$ctrl.onDragStart" drag-move="$ctrl.onDragMove" drag-end="$ctrl.onDragEnd">
  <li>Reeses Peanut Butter Cup</li>
  <li>Hostess Twinkies</li>
  <li>Ben & Jerry's Ice Cream</li>
</ol>
```

## Caveats

Fixed elements are normally positioned relative to the initial containing block established by the viewport; however, when an ancestor of the element has a `transform`, `perspective`, or `filter` property it becomes the containing element. This complicates computing the position of the element being dragged. One solution may be to move the element being dragged to the document body, but that could conflict with computed css styles. For now I would recommend adding the following `dragStart` callback to manually correct the element's position.

```javascript
function onDragStart(element) {
  // obtain the culprit element
  var transformedElement = document.querySelector('[style="transform: ..."]');
  var bounds = transformedElement.getBoundingClientRect();

  // correct the element's position
  element.css('left', element.css('left').slice(0, -2) - bounds.left + 'px');
  element.css('top', element.css('top').slice(0, -2) - bounds.top + 'px');
}
```

## API Documentation

> Don't forget to kebab-case attributes in your template (e.g. `dragEnd` should be written `drag-end` in your template).

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
