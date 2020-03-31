import { createTestController, TestController } from './testUtils.spec';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import createLocalService from './createLocalService';
import LocalService from './LocalService';

describe('createLocalService()', () => {
  const controller = createTestController();
  const localService = createLocalService<TestController, {}>(controller, {});
  it('returns a LocalService object', () => expect(localService instanceof LocalService).to.equal(true));
});
