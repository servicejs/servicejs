import { describe, it } from 'mocha';
import { expect } from 'chai';
import AbstractApplication from './AbstractApplication';

class SampleApplication extends AbstractApplication {
  constructor() {
    super();
  }
  public main() {}
}

describe('AbstractApplication', () => {
  it('.main() runs', () => expect(() => SampleApplication.main()).to.not.throw());
});
