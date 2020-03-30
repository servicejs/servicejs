/**
 * Service
 */

export class Service<P, S> {
  public static new<P, S>(props: P, initialState?: S) {
    const s: Service<P, S> = new this(props, initialState);
    s.nextAction();
    return s;
  }

  protected readonly props: P;
  protected state: S;

  protected constructor(props: P, initialState?: S) {
    this.props = props;
    this.state = initialState || this.computeInitialStateFromProps(props);
  }

  protected async nextAction(): Promise<any> {
    // Intentionally blank
  }

  protected computeInitialStateFromProps(props: P): S {
    return {} as S;
  }
}

export type ServicePropsType<T extends Service<any, any>> = T extends Service<
  infer P,
  infer S
>
  ? P
  : never;
export type ServiceStateType<T extends Service<any, any>> = T extends Service<
  infer P,
  infer S
>
  ? S
  : never;
