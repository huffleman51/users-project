const describe = require('mocha').describe;

const assert = require('assert');
const User = require('../src/user');

describe('Creating Records', () => {
    it('saves a user', (done) => {
        // Create a new Usesr object
        const joe = new User({name: 'Joe'});
        // console.log(joe);

        // Save User to database
        joe.save()
          .then(() => {
            // Has Joe been saved to the database? Joe is not new, he has been saved
              // Asset Test to make sure that User was saved to the database
            assert(!joe.isNew);
            done();
          });
    })
});