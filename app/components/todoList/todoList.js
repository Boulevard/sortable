'use strict';

function TodoList() {

}

TodoList.prototype.remove = function (item) {
  var index = this.todos.indexOf(item);

  if(index !== -1) {
    this.todos.splice(index, 1);
  }
};

TodoList.prototype.submit = function () {
  if(!this.todo) {
    return;
  }

  this.form.todo.$setValidity('unique', this.todos.indexOf(this.todo) === -1);

  if(this.form.$valid && this.todos.push(this.todo)) {
    this.todo = '';
  }
};

angular.module('blvd').component('todoList', {
  bindings: {
    todos: '='
  },
  controller: TodoList,
  templateUrl: 'components/todoList/todoList.html'
});
