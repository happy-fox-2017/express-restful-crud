var addTodo = function () {
  window.location.href = '/todos/add';
};

var editTodo = function (id) {
  window.location.href = '/todos/edit/' + id;
};

var deleteTodo = function (id) {
  var deleteConfirmation = confirm('Todo with id: ' + id + ', will be deleted!');
  if (deleteConfirmation) {
    window.location.href = '/todos/delete/' + id;
  }
};

var viewTodo = function (todoId) {
  window.location.href = '/todos';
};
