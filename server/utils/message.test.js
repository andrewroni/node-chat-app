const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let message = { from: 'Andrew', text: 'Hello'}
    let res = generateMessage(message.from, message.text);

    expect(res).toMatchObject(message);
    expect(typeof res.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Admin';
    let latitude = 1;
    let longitude = 1;
    let url = 'https://www.google.com/maps?q=1,1';
    let res = generateLocationMessage(from, latitude, longitude);

    expect(res.from).toBe(from);
    expect(typeof res.createdAt).toBe('number');
    expect(res.url).toBe(url);
  });
});
