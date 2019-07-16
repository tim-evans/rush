import * as gravity from '../src/gravity';

describe('gravity', () => {
  test.each(
    Object.keys(gravity)
  )('%s', direction => {
    expect((gravity as any)[direction]).toMatchSnapshot();
  });
});
