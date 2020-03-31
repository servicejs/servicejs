import * as sinon from 'sinon';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import AbstractPublicEventEmitter from './AbstractPublicEventEmitter';

interface TestEventMap {
  testEvent(a: string, b: string, c: string): void;
}

class TestEventEmitter extends AbstractPublicEventEmitter<TestEventMap> {
  public emit(event: 'testEvent', a: string, b: string, c: string) {
    return super.emit(event, a, b, c);
  }
}

describe('AbstractPublicEventEmitter', () => {
  const eventHandler = sinon.fake();
  const testEventEmitter = new TestEventEmitter();

  it('can register an event handler with on()', () =>
    expect(testEventEmitter.on('testEvent', eventHandler)).to.equal(testEventEmitter));
  it('can register an event handler with addListener()', () =>
    expect(testEventEmitter.addListener('testEvent', eventHandler)).to.equal(testEventEmitter));
  it('can register an event handler with once()', () =>
    expect(testEventEmitter.once('testEvent', eventHandler)).to.equal(testEventEmitter));
  it('can emit an event with emit()', () =>
    expect(testEventEmitter.emit('testEvent', 'a', 'b', 'c')).to.equal(testEventEmitter));
  it('will trigger the correct number of invokations', () => expect(eventHandler.callCount).to.equal(3));
  it('handles one-time handlers correctly', () => {
    testEventEmitter.emit('testEvent', 'a', 'b', 'c');
    return expect(eventHandler.callCount).to.equal(5);
  });
  it('can unregister an event handler with off()', () =>
    expect(testEventEmitter.off('testEvent', eventHandler)).to.equal(testEventEmitter));
  it('can unregister an event handler with removeListener()', () =>
    expect(testEventEmitter.removeListener('testEvent', eventHandler)).to.equal(testEventEmitter));
});
