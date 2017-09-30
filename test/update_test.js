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

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance type using set and save', (done) => {
    // console.log(joe);

    // Set is used when you want to change a property on a model instance
    // But the value is not updated in the database
    joe.set('name', 'Alex');

    // To persist the name change to the database, you need to call dave
    // Good for making incremental updates to an object and then saving it later
    assertName(joe.save(), done);
    // console.log(joe);
  });

  it('A model instance can update', (done) => {
    // Good for bulk updates to an object and update immediately
    assertName(joe.update({name: 'Alex'}), done);
  });

  it('A model class can update', (done) => {
    assertName(
      User.update({name: 'Joe'}, {name: 'Alex'}),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, {name: 'Alex'}),
      done
    );
  });

  it('', (done) => {

    done();
  });
});