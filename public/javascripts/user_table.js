var addUser = function () {
  window.location.href = '/users/add';
};

var editUser = function (id) {
  window.location.href = '/users/edit/' + id;
};

var deleteUser = function (id) {
  var deleteConfirmation = confirm('User with id: ' + id + ', will be deleted!');
  if (deleteConfirmation) {
    window.location.href = '/users/delete/' + id;
  }

};
