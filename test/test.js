const chai = require('chai');
const models = require('../models');

const should = chai.should();
const USER_EMAIL = 'myyusuf1911@gmail.com';

describe('User', function() {

  describe('#create()', function() {
    before(function (done) {
      models.User.destroy({ where: {} }).then(() => done());
    });

    it('should create user without error', function (done) {

      models.User.create({
        email: USER_EMAIL,
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    after(function (done) {
      models.User.destroy({ where: {} }).then(() => done());
    });
  });

  describe('#createWithTodo()', function() {
    before(function (done) {
      models.User.destroy({ where: {} }).then(() => {
        models.Todo.destroy({ where: {} }).then(() => done());
      });
    });

    it('should create user with todo', function (done) {

      models.User.create({
        email: USER_EMAIL,
      })
      .then((user) => {
        models.Todo.create({
          title: 'Test',
          isComplete: false,
        }).then((todo) => {
          user.addTodo(todo)
          .then((userAfterAdd) => {
            userAfterAdd.getTodos()
            .then((todos) => {
              todos.should.have.lengthOf(1);
              done();
            });
          });
        });
      })
      .catch((err) => {
        done(err);
      });
    });

    after(function (done) {
      models.User.destroy({ where: {} }).then(() => {
        models.Todo.destroy({ where: {} }).then(() => done());
      });
    });
  });

});
