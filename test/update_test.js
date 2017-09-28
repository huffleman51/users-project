const assert = require('assert');
const User = require('../src/user');
const decscribe = require('mocha').describe;

describe('Updating records', () => {

  let joe;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    joe.save()
      .then(() => done());
  });

  it('instance type using set and save', (done) => {
    // console.log(joe);

    // Set is used when you want to change a property on a model instance
    // But the value is not updated in the database
    joe.set('name', 'Alex');

    // To persist the name change to the database, you need to call dave
    joe.save()
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      })
    // console.log(joe);
  })

});