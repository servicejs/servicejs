import * as chai from 'chai';
import * as sinon from 'sinon';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import createServiceClientProxy from './createServiceClientProxy';

chai.use(chaiAsPromised);

interface TestController {
  add(a: number, b: number): number;
}

describe('createServiceClientProxy()', () => {
  const handler = sinon.fake();

  const serviceProxy = createServiceClientProxy<TestController>(handler);
  it('returns a (Proxy) object', () => expect(typeof serviceProxy === 'object').to.equal(true));
  it('calls the handler when any field is called', () =>
    expect(
      (async () => {
        await serviceProxy.add(1, 2);
        return handler.calledOnceWith('add', [1, 2]);
      })(),
    ).to.eventually.equal(true));
  it('throws an UnsupportedActionException when trying to set a property', () =>
    expect(() => {
      serviceProxy.add = async (a: number, b: number) => a + b;
    }).to.throw());
});
