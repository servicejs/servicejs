import * as chai from 'chai';
import * as sinon from 'sinon';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import createLocalService from '.';

chai.use(chaiAsPromised);

interface TestType {
  add(a: number, b: number): number;
  theAnswerToTheUniverseAndEverything: number;
}

describe('createLocalService()', () => {
  const add = sinon.spy((a: number, b: number) => a + b);
  const theAnswerToTheUniverseAndEverything = 42;
  const controller = { add, theAnswerToTheUniverseAndEverything };
  const localService = createLocalService<TestType>(controller);
  it('returns a (Proxy) object', () => expect(typeof localService === 'object').to.equal(true));
  it('calls the method on the controller (if defined)', () =>
    expect(
      (async () => {
        await localService.add(1, 2);
        return add.calledOnceWith(1, 2);
      })(),
    ).to.eventually.equal(true));
  it('calls the method on the controller (if defined) and returns the result', () =>
    expect(localService.add(1, 2)).to.eventually.equal(3));
  it('calls returns any static property via a 0-arg method', () =>
    expect(localService.theAnswerToTheUniverseAndEverything()).to.eventually.equal(
      theAnswerToTheUniverseAndEverything,
    ));
});
