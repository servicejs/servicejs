import { describe, it } from 'mocha';
import { expect } from 'chai';

import NoUuidException from './NoUuidException';

describe('NoUuidException', () => {
  it('Without argument, it has the default message', () =>
    expect(new NoUuidException().message).to.equal('No UUID in response'));
  it('With the argument, it has the custom message', () => expect(new NoUuidException('msg').message).to.equal('msg'));
});
