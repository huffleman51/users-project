const describe = require('mocha').describe;
const assert = require('assert');
const User = require('../src/user');

describe('deleting a user', () => {

  let joe;

  beforeEach((done) => {

    // Insert a User for the tests
    joe = new User({ name: 'Joe' } );
    joe.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {

    joe.remove()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {

    // Remove a bunch of records with some given criteria
    User.remove({name: 'Joe'})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findOneAndRemove', (done) => {

    User.findOneAndRemove({name: 'Joe'})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {

    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  })
})