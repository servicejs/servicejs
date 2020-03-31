import * as chai from 'chai';
import * as sinon from 'sinon';
import { createTestController, TestController } from './testUtils.spec';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import createLocalServiceClient from './createLocalServiceClient';

chai.use(chaiAsPromised);

describe('createLocalServiceClient()', () => {
  const controller = createTestController();
  const add = sinon.spy(controller.add);
  controller.add = add;
  const localServiceClient = createLocalServiceClient<TestController>(controller);
  it('returns a (Proxy) object', () => expect(typeof localServiceClient === 'object').to.equal(true));
  it('calls the method on the controller (if defined)', () =>
    expect(
      (async () => {
        await localServiceClient.add(1, 2);
        return add.calledOnceWith(1, 2);
      })(),
    ).to.eventually.equal(true));
  it('calls the method on the controller (if defined) and returns the result', () =>
    expect(localServiceClient.add(1, 2)).to.eventually.equal(3));
});
