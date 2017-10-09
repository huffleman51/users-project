const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(() => {
    mongoose.connection.openUri('mongodb://localhost/users_test');
// mongoose.connect('mongodb://localhost/users_test', {useMongoClient: true});

    mongoose.connection
      .once('open', () => { })
      .on('error', (error) => {
          console.warn('Error', error);
      });
});

beforeEach( async () => {
    //Drop User Collection before running any tests
    await mongoose.connection.collections.users.drop(() => {});
    await mongoose.connection.collections.comments.drop(() => {});
    await mongoose.connection.collections.blogposts.drop(() => {});
});
