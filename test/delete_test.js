const User = require('../src/user');
const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('deleting a user', () => {

  let joe;

  beforeEach( async () => {

    // Insert a User for the tests
    joe = new User({ name: 'Joe' } );
    await joe.save();
  });

  it('model instance remove', async () => {

    await joe.remove()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        expect(user).to.equal(null);
      });
  });

  it('class method remove', async () => {

    // Remove a bunch of records with some given criteria
    await User.remove({name: 'Joe'})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        expect(user).to.equal(null);
      });
  });

  it('class method findOneAndRemove', async () => {

    await User.findOneAndRemove({name: 'Joe'})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        expect(user).to.equal(null);
      });
  });

  it('class method findByIdAndRemove', async () => {

    await User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        expect(user).to.equal(null);
      });
  })
})