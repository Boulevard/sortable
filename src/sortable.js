'use strict';

var START_EVENT = 'ontouchstart' in document.documentElement ? 'touchstart' : 'mousedown';
var MOVE_EVENT = 'ontouchmove' in document.documentElement ? 'touchmove' : 'mousemove';
var END_EVENT = 'ontouchend' in document.documentElement ? 'touchend' : 'mouseup';

function Sortable($attrs, $element, $scope) {
  var self = this;

  /*
   * dropzone  [string] - By default, an empty element will be created
   *                      with the same tag name as the element being
   *                      dragged.
   *
   * sameSize  [bool]   - Make the dropzone the same size as the element
   *                      being dragged.
   *
   * threshold [float]  - The minimum distance the cursor must travel to
   *                      initiate a drag event.
   */
  var options = {
    dropzone: undefined,
    sameSize: true,
    threshold: 2
  };

  var dropzone;
  var selected;
  var position = {};

  if(self.options) {
    angular.extend(options, self.options);
  }

  if($attrs.sortable === '') {
    self.sortable = true;
  }

  function childCount() {
    return $element.children().length;
  }

  function createDropZone(element) {
    if(angular.isString(options.dropzone)) {
      dropzone = angular.element(options.dropzone);
    } else {
      dropzone = angular.element('<' + element.prop('localName') + '>');
    }

    dropzone.addClass('drop-zone');

    if(options.sameSize) {
      dropzone.css({
        height: element.prop('clientHeight') + 'px',
        width: element.prop('clientWidth') + 'px'
      });
    }

    element.after(dropzone);
  }

  function floatElement(element, children) {
    for(var i = 0; i < children.length; i++) {
      var child = children.eq(i);
      var childComputedStyle = child.data('sortable.computedStyle');

      child.css({
        height: childComputedStyle.height,
        width: childComputedStyle.width
      });
    }

    var bounds = element[0].getBoundingClientRect();
    var computedStyle = element.data('sortable.computedStyle');

    element.addClass('dragging').css({
      height: computedStyle.height,
      left: bounds.left - computedStyle.marginLeft.slice(0, -2) + 'px',
      pointerEvents: 'none',
      position: 'fixed',
      top: bounds.top - computedStyle.marginTop.slice(0, -2) + 'px',
      width: computedStyle.width,
      zIndex: 100
    });
  }

  function getChildFromPoint(point) {
    var children = $element.children();
    var hovering = document.elementFromPoint(point.x, point.y);

    for(var i = 0; i < children.length; i++) {
      if(children[i] === hovering || children[i].contains(hovering)) {
        return children[i];
      }
    }
  }

  function indexOf(child) {
    return Array.prototype.indexOf.call($element.children(), child[0]);
  }

  function magnitude(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
  }

  function mouseDown(event) {
    event.preventDefault();
    event.stopPropagation();

    selected = angular.element(event.currentTarget);

    position.x = event.pageX;
    position.y = event.pageY;

    document.addEventListener(MOVE_EVENT, mouseMove);
    document.addEventListener(END_EVENT, mouseUp);
  }

  function mouseMove(event) {
    event.preventDefault();

    var delta = {
      x: event.pageX - position.x,
      y: event.pageY - position.y
    };

    if(magnitude(delta) < options.threshold) {
      return;
    }

    if(!selected.hasClass('dragging')) {
      onDragStart(selected, selected.children());
    }

    onDragMove(event, selected, delta);
  }

  function mouseUp(event) {
    document.removeEventListener(MOVE_EVENT, mouseMove);
    document.removeEventListener(END_EVENT, mouseUp);

    if(selected.hasClass('dragging')) {
      onDragEnd(event, selected, selected.children());
    }
  }

  function onDragEnd(event, child, grandChildren) {
    var oldIndex = child.data('sortable.index');
    var newIndex = indexOf(dropzone);

    // because the element being dragged is never removed
    if(newIndex > oldIndex) {
      newIndex--;
    }

    restoreStyle(child.removeClass('dragging'));

    for(var i = 0; i < grandChildren.length; i++) {
      restoreStyle(grandChildren.eq(i));
    }

    if(angular.isArray(self.sequence)) {
      dropzone.remove();

      $scope.$apply(function () {
        self.sequence.splice(newIndex, 0, self.sequence.splice(oldIndex, 1)[0]);
      });
    } else {
      dropzone.replaceWith(child);
    }

    if(angular.isFunction(self.dragEnd)) {
      self.dragEnd(child, newIndex, oldIndex, self.sequence);
    }
  }

  function onDragMove(event, child, delta) {
    child.css('transform', 'translate(' + delta.x + 'px, ' + delta.y+ 'px)');

    var point = {x: event.pageX, y: event.pageY};
    var sibling = getChildFromPoint(point);

    if(sibling && sibling !== dropzone[0]) {
      updateDropZone(point, sibling);
    }

    if(angular.isFunction(self.dragMove)) {
      self.dragMove(child);
    }
  }

  function onDragStart(child, grandChildren) {
    remeberStyle(child);

    for(var i = 0; i < grandChildren.length; i++) {
      remeberStyle(grandChildren.eq(i));
    }

    floatElement(child, grandChildren);
    createDropZone(child.data('sortable.index', indexOf(child)));

    if(angular.isFunction(self.dragStart)) {
      self.dragStart(child);
    }
  }

  function remeberStyle(element) {
    element.data('sortable.style', element.attr('style') || '');

    if(!element.data('sortable.computedStyle')) {
      element.data('sortable.computedStyle', window.getComputedStyle(element[0]));
    }
  }

  function restoreStyle(element) {
    element.attr('style', element.data('sortable.style'));
  }

  function updateDropZone(cursor, sibling) {
    var offsetY = cursor.y - sibling.getBoundingClientRect().top;
    var midPoint = sibling.clientHeight >> 1;

    // if the cursor is past the midpoint of the element, insert
    // the dropzone after the element
    if(offsetY > midPoint) {
      if(sibling.nextElementSibling !== dropzone[0]) {
        $element[0].insertBefore(dropzone[0], sibling.nextElementSibling);
      }
    } else if(sibling.previousElementSibling !== dropzone[0]) {
      $element[0].insertBefore(dropzone[0], sibling);
    }
  }

  $scope.$watch(childCount, function (childCount) {
    if(childCount) {

      var children = $element.children();

      if(self.sortable) {
        children.on(START_EVENT, mouseDown);
      }
    }
  });

  $scope.$watch('$sortable.sortable', function (sortable) {
    var children = $element.children();

    if(sortable) {
      children.on(START_EVENT, mouseDown);
    } else {
      children.off(START_EVENT, mouseDown);
    }
  });
}

Sortable.$inject = ['$attrs', '$element', '$scope'];

angular.module('sortable', []).directive('sortable', function () {
  return {
    controller: Sortable,
    controllerAs: '$sortable',
    bindToController: {
      options: '=?',
      dragEnd: '=?',
      dragMove: '=?',
      dragStart: '=?',
      sequence: '=?ngModel',
      sortable: '=?'
    }
  };
});
