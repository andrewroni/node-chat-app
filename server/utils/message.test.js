const expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let message = { from: 'Andrew', text: 'Hello'}
    let res = generateMessage(message.from, message.text);

    expect(res).toMatchObject(message);
    expect(typeof res.createdAt).toBe('number');
  });
});
