import { generateToken } from '../src/functions/token';

test('generateToken', () => {
  expect(generateToken()).toHaveLength(36);
});
