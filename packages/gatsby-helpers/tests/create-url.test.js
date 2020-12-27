const { createUrl } = require('../index');

describe('createPath', () => {
  it('base with trailing /', () => {
    expect(createUrl('https://www.example.com/', '/path/to/something/')).toBe(
      'https://www.example.com/path/to/something/'
    );
  });

  it('base without trailing /', () => {
    expect(createUrl('https://www.example.com', '/path/to/something/')).toBe(
      'https://www.example.com/path/to/something/'
    );
  });

  it('path without trailing /', () => {
    expect(createUrl('https://www.example.com', '/path/to/something')).toBe(
      'https://www.example.com/path/to/something/'
    );
  });

  it('path without leading /', () => {
    expect(createUrl('https://www.example.com', 'path/to/something/')).toBe(
      'https://www.example.com/path/to/something/'
    );
  });
});
