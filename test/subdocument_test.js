import User from '../src/user';
const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
const describe = require('mocha').describe;

chai.use(chaiAsPromised);

describe('Subdocuments', () => {

  it('can create a subdocument', async () => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'PostTitle'}]});

    await joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        expect(user.posts[0].title).to.equal('PostTitle');
      });
  });


});