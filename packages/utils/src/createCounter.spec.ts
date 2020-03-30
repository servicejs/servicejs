import { describe, it } from 'mocha';
import { expect } from 'chai';

import createCounter from './createCounter';

describe('createCounter()', () => {
  const counter = createCounter();
  it('returns a function', () => expect(typeof counter === 'function').to.equal(true));
  it('The counter first returns 0', () => expect(counter()).to.equal(0));
  it('The counter then returns 1', () => expect(counter()).to.equal(1));
});
