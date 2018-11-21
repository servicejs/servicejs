import { IClass } from "./function";

/**
 * Applies mixins to a class by injecting prototype properties of the mixin classes into the target's prototype
 * From https://www.typescriptlang.org/docs/handbook/mixins.html
 *
 * @param derivedCtor
 * @param baseCtors
 */
export function applyMixins<
  Mixins extends Mixin[],
  Mixin extends IClass<any, any>,
  T extends IClass<any, any>
>(targetConstructor: T, mixinConstructors: Mixins) {
  mixinConstructors.forEach((mixinConstructor) => {
    Object.getOwnPropertyNames(mixinConstructor.prototype).forEach((name) => {
      targetConstructor.prototype[name] = mixinConstructor.prototype[name];
    });
  });
}

/**
 * Applies mixins to a class by injecting prototype properties of the mixin classes into the target's prototype
 * From https://www.typescriptlang.org/docs/handbook/mixins.html
 *
 * @param derivedCtor
 * @param baseCtors
 */
// tslint:disable-next-line:ban-types
export const mixin: <Mixins extends Mixin[], Mixin extends IClass<any, any>>(
  ...mixinConstructors: Mixins
) => ClassDecorator = ((mixinConstructors: any[]) => (targetConstructor: any) =>
  applyMixins(targetConstructor, mixinConstructors)) as any;
