const mongoose = require('mongoose');
const beforeEach = require('mocha').beforeEach;
const before = require('mocha').before;

mongoose.Promise = global.Promise;

before(() => {
    mongoose.connection.openUri('mongodb://localhost/users_test');
// mongoose.connect('mongodb://localhost/users_test', {useMongoClient: true});

    mongoose.connection
      .once('open', () => { })
      .on('error', (error) => {
          console.warn('Error', error);
      });

    // //Drop User Collection before running any tests
    // mongoose.connection.collections.users.drop(() => {
    //     // Ready to run the next test!
    //     done();
    // });
});

beforeEach((done) => {
    //Drop User Collection before running any tests
    mongoose.connection.collections.users.drop(() => {
        // Ready to run the next test!
        done();
    });
});