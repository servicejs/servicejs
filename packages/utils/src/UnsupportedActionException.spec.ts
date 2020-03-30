import { describe, it } from 'mocha';
import { expect } from 'chai';

import UnsupportedActionException from './UnsupportedActionException';

describe('UnsupportedActionException', () => {
  it('Without argument, it has no messsage', () => expect(new UnsupportedActionException().message).to.equal(''));
  it('With the argument, it has the custom message', () =>
    expect(new UnsupportedActionException('msg').message).to.equal('msg'));
});
