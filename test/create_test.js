const User = require('../src/user');
const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Creating Records', () => {

    it('saves a user',async () => {
      // Create a new User object
      const joe = new User({name: 'Joe'});
      // console.log(joe);

      // Save User to database
      await joe.save()
        .then(() => {
          // Has Joe been saved to the database? Joe is not new, he has been saved
            // Asset Test to make sure that User was saved to the database
          expect(joe.isNew).to.equal(false);
        });
    })
});