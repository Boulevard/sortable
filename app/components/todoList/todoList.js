'use strict';

function TodoList() {

}

angular.module('blvd').component('todoList', {
  bindings: {
    todos: '='
  },
  controller: TodoList,
  templateUrl: 'components/todoList/todoList.html',
});
