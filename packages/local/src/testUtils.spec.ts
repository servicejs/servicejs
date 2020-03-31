export interface TestController {
  add(a: number, b: number): number;
}

const add = (a: number, b: number) => a + b;

export const createTestController = () => ({ add });
