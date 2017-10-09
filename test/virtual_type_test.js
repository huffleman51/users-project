import User from '../src/user';
const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
const describe = require('mocha').describe;

chai.use((chaiAsPromised));

describe('Virtual Types', () => {

  it('postCount returns number of posts', async () => {

    const joe = new User({
      name: 'Joe',
      posts: [{title: 'New Title'}]
    });

    await joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        expect(user.postCount).to.equal(1);
      })
  });
})