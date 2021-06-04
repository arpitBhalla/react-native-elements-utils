const testHelper = require('../testHelper');

test('card transform test', () => {
  const { expected, actual } = testHelper('cardTransform', 'cardTransform');
  expect(expected).toEqual(actual);
});
