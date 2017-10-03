import User from '../src/user';
import Post from '../src/post'
const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
const describe = require('mocha').describe;

chai.use(chaiAsPromised);

describe('Subdocuments', () => {

  it('can create a subdocument', async () => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'PostTitle'}]}
    );

    await joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        expect(user.posts[0].title).to.equal('PostTitle');
      });
  });

  it('Can add sub documents to an existing record', async () => {

    const joe = new User({
      name: 'Joe',
      posts: []
    });

    await joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        user.posts.push({title: 'New Post'});
        return user.save();
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        expect(user.posts[0].title).to.equal('New Post');
      })
  });

  it('Can remove an existing sub document', async () => {
    // const post = new Post({title: 'To Be Removed'});
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'To Be Removed'}]
    });

    await joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        const post = user.posts[0];
        user.posts.remove(post);
        return user.save();
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        expect(user.posts.length).to.equal(0);
      })
  });
});