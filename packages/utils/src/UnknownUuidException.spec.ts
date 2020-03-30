import { describe, it } from 'mocha';
import { expect } from 'chai';

import UnknownUuidException from './UnknownUuidException';

describe('UnknownUuidException', () => {
  it('has the correct message', () => expect(new UnknownUuidException(0).message).to.equal('Unknown UUID `0`'));
});
