'use strict';

function TodoList() {
  this.options = {
    dropzone: '<tr><td colspan="4">Drop</td></tr>'
  };
}

TodoList.prototype.onChange = function () {
  var item = this.todo && this.todo.toLowerCase();
  var isUnique = this.todos.every(function (todo) {
    return item !== todo.toLowerCase();
  });

  this.form.todo.$setValidity('unique', isUnique);
};

TodoList.prototype.remove = function (item) {
  var index = this.todos.indexOf(item);

  if(index !== -1) {
    this.todos.splice(index, 1);
  }
};

TodoList.prototype.submit = function () {
  if(!this.todo || this.form.$inValid) {
    return;
  }

  if(this.todos.push(this.todo)) {
    this.todo = '';
  }
};

TodoList.prototype.preventDrag = function (event) {
  event.stopPropagation();
};

angular.module('blvd').component('todoList', {
  bindings: {
    todos: '='
  },
  controller: TodoList,
  templateUrl: 'components/todoList/todoList.html'
});
