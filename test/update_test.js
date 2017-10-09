const User = require('../src/user');
const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Updating records', () => {

  let joe;

  beforeEach(async () => {
    joe = new User({name: 'Joe', likes: 0});
    await joe.save();
  });

  async function assertName(operation) {
    return operation
      .then(() => User.find({}))
      .then((users) => {
        expect(users.length).to.equal(1);
        expect(users[0].name).to.equal('Alex');
      });
  }

  it('instance type using set and save', async () => {
    // console.log(joe);

    // Set is used when you want to change a property on a model instance
    // But the value is not updated in the database
    joe.set('name', 'Alex');

    // To persist the name change to the database, you need to call dave
    // Good for making incremental updates to an object and then saving it later
    await assertName(joe.save());
    // console.log(joe);
  });

  it('A model instance can update', async () => {
    // Good for bulk updates to an object and update immediately
    await assertName(joe.update({name: 'Alex'}));
  });

  it('A model class can update', async () => {
    await assertName(User.update({name: 'Joe'}, {name: 'Alex'}));
  });

  it('A model class can update one record', async () => {
    await assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}));
  });

  it('A model class can find a record with an Id and update', async () => {
    await assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'}));
  });

  it('A User can have their postCount incremented by one', async () => {
    // For every user named Joe, update the postCount to something
    await User.update({name: 'Joe'}, {$inc: {likes: 1}})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        expect(user.likes).to.equal(1);
      });
  });

  it('TESTING1 A User can have their postCount incremented by one - using then(done, done)', (done) => {
    // For every user named Joe, update the postCount to something
    User.update({name: 'Joe'}, {$inc: {likes: 1}})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        expect(user.likes).to.equal(1);
      }).then(done, done);
  });

  it('TESTING2 A User can have their postCount incremented by one - returning a promise', () => {
    // For every user named Joe, update the postCount to something
    return User.update({name: 'Joe'}, {$inc: {likes: 1}})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        expect(user.likes).to.equal(1);
      });
  });

  it('TESTING3 A User can have their postCount incremented by one - using async wait', async () => {
    // For every user named Joe, update the postCount to something
    await User.update({name: 'Joe'}, {$inc: {likes: 1}})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        expect(user.likes).to.equal(1);
      });
  });
});