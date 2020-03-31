import Application from './Application';

/** Abstract base Application class with a static main helper */
export default abstract class AbstractApplication implements Application {
  public static main<T extends new (...args: A) => Application, A extends any[]>(this: T, ...args: A) {
    const app = new this(...args);
    return app.main();
  }
  protected constructor() {}
  public abstract main(): void;
}
