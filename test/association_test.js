const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const chai = require('chai');
const expect = chai.expect;
const chiaAsPromised = require('chai-as-promised');

chai.use(chiaAsPromised);

describe('Associations', () => {

  let joe, blogPost, comment;

  beforeEach(async () => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is Great', content: 'Yep it really is'});
    comment = new Comment({content: 'Congrats on great post'});

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    await joe.save();
    await blogPost.save();
    await comment.save();
  });

  it('saves a relation between a user and a blog post', async () => {
    await User.findOne({name: 'Joe'})
      .populate('blogPosts')
      .then((user) => {
        expect(user.blogPosts[0].title).to.equal('JS is Great');
      })
  });

  it('saves a full relation graph', async () => {
    await User.findOne({name: 'Joe'})
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        expect(user.name).to.equal('Joe');
        expect(user.blogPosts[0].title).to.equal('JS is Great');
        expect(user.blogPosts[0].comments[0].content).to.equal('Congrats on great post');
        expect(user.blogPosts[0].comments[0].user.name).to.equal('Joe');
      })
  });
});

