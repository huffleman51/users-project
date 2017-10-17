const User = require('../src/user');
const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Reading users out of the database', () => {

  let joe, maria, alex, zach;

  beforeEach(async () => {
    // Insert a Users for the tests
    alex = new User({name: 'Alex'});
    joe = new User({ name: 'Joe' } );
    maria = new User({name: 'Maria'});
    zach = new User({name: 'Zach'});

    // await alex.save();
    // await joe.save();
    // await maria.save();
    // await zach.save();

    await Promise.all([alex.save(), joe.save(), maria.save(), zach.save()]);
  });

  it('finds all users with a name of joe', async () => {
    await User.find({ name: 'Joe' })
      .then((users) => {
        expect(users[0]._id.toString()).to.equal(joe._id.toString());
      })
  });

  it('find a user with a particular id', async () => {
    await User.findOne({_id: joe._id})
      .then((user) => {
        expect(user.name).to.equal('Joe');
      })
  });

  it('can sotr, skip, and limit the result set', async () => {
    // -Alex- [Joe Maria] Zach
    await User.find({})
      .sort({name: 1})
      .skip(1)
      .limit(2)
      .then((users) => {
        expect(users.length).to.equal(2);
        expect(users[0].name).to.equal('Joe');
        expect(users[1].name).to.equal('Maria');
      });
  });
});
