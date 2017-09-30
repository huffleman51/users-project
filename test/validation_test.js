const assert = require('assert');
const User = require('../src/user');
const describe = require('mocha').describe;

describe('Validation records', () => {
  it('requires a user name', () => {
    const user = new User({name: undefined});

    const validationResult = user.validateSync();

    // console.log(validationResult);
    // console.log(validationResult.errors['name'].message);
    const { message } = validationResult.errors['name'];
    // console.log(`message: ${message}`);
    assert(message === 'Name is required.')
  });

  it('requires a user name longer than 2 characters', () => {
    const user = new User({name: 'Al'});
    const validationResult = user.validateSync();
    const { message } = validationResult.errors['name'];

    assert(message === 'Name must be greater than 2 characters');
  });
});

