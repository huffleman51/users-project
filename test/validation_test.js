const User = require('../src/user');
const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Validation records', () => {

  const errorMessageNameGreaterThanTwoCharacters = 'Name must be greater than 2 characters';

  it('requires a user name', () => {
    const user = new User({name: undefined});

    const validationResult = user.validateSync();

    // console.log(validationResult);
    // console.log(validationResult.errors['name'].message);
    const { message } = validationResult.errors['name'];
    // console.log(`message: ${message}`);
    expect(message).to.equal('Name is required.');
  });

  it('requires a user name longer than 2 characters', () => {
    const user = new User({name: 'Al'});
    const validationResult = user.validateSync();
    const { message } = validationResult.errors['name'];

    expect(message).to.equal(errorMessageNameGreaterThanTwoCharacters);
  });

  it('disallows invalid records from being saved', async () => {

    const user = new User({name: 'Al'});
    await user.save()
      .catch((validationResult) => {
        const {message} = validationResult.errors['name'];
        expect(message).to.equal(errorMessageNameGreaterThanTwoCharacters);
      });
  });

  it('disallows invalid records from being saved', async () => {
    const user = new User({name: 'Al'});

    await user.save()
      .catch((validationResults) => {
        const {message} = validationResults.errors['name'];
        expect(message).to.equal(errorMessageNameGreaterThanTwoCharacters);
      });
  });

  // https://wietse.loves.engineering/testing-promises-with-mocha-90df8b7d2e35
  it('testing1 - using then(done, done)', (done) => {

    const user = new User({name: 'Al'});
    user.save()
      .catch((validationResult) => {
        const {message} = validationResult.errors['name'];
        expect(message).to.equal(errorMessageNameGreaterThanTwoCharacters);
      }).then(done, done);

  });

  it('testing2 - using return promise', () => {

    const user = new User({name: 'Al'});
    return user.save()
      .catch((validationResult) => {
        const {message} = validationResult.errors['name'];
        expect(message).to.equal(errorMessageNameGreaterThanTwoCharacters);
      });
  });

  it('testing3 - using async await', async () => {

    const user = new User({name: 'Al'});
    await user.save()
      .catch((validationResult) => {
        const {message} = validationResult.errors['name'];
        expect(message).to.equal(errorMessageNameGreaterThanTwoCharacters);
      });
  });

});

