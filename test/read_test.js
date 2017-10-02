const User = require('../src/user');
const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Reading users out of the database', () => {

  let joe;

  beforeEach(async () => {
    // Insert a User for the tests
    joe = new User({ name: 'Joe' } );
    await joe.save();
  });

  it('finds all users with a name of joe', async () => {
    await User.find({ name: 'Joe' })
      .then((users) => {
        expect(users[0]._id.toString()).to.equal(joe._id.toString());
      })
  });

  it('find a user with a particular id', async () => {
    await User.findOne({ _id: joe._id  })
      .then((user) => {
        expect(user.name).to.equal('Joe');
      })
  })
});
