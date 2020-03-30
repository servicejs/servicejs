import * as chai from 'chai';
import * as sinon from 'sinon';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import createServiceProxy from './createServiceProxy';

chai.use(chaiAsPromised);

interface TestType {
  field(a: string, b: string, c: string): void;
}

describe('createServiceProxy()', () => {
  const handler = sinon.fake();

  const serviceProxy = createServiceProxy<TestType>(handler);
  it('returns a (Proxy) object', () => expect(typeof serviceProxy === 'object').to.equal(true));
  it('calls the handler when any field is called', () =>
    expect(
      (async () => {
        await serviceProxy.field('a', 'b', 'c');
        return handler.calledOnceWith('field', ['a', 'b', 'c']);
      })(),
    ).to.eventually.equal(true));
  it('throws an UnsupportedActionException when trying to set a property', () =>
    expect(() => {
      serviceProxy.field = async (a: string, b: string, c: string) => {};
    }).to.throw());
});
