const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const chai = require('chai');
const expect = chai.expect;
const chiaAsPromised = require('chai-as-promised');

chai.use(chiaAsPromised);

describe('Middleware', () => {

  let joe, blogPost;

  beforeEach(async () => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is Great', content: 'Yep it really is'});

    joe.blogPosts.push(blogPost);

    await joe.save();
    await blogPost.save();
  });

  it('users clean up dangling blod posts on remove', async () => {

    await joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        expect(count).to.equal(0);
      });
  });
});
