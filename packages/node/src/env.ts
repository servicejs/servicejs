import { isUndefined } from "@service/core";

export interface IEnvVar<T> {
  hasDefaultValue(): boolean;
  hasDefaultString(): boolean;
  isRequired(): boolean;
  require(): this & { isRequired(): true };
  optional(): this & { isRequired(): false };
  default(defaultValue: T): this & { isRequired(): false };
  defaultString(rawValue: string): this & { isRequired(): false };
  convert<U>(converter: (value: T) => U): IEnvVar<U>;
  get(): T | undefined | never;
}

export class EnvVar<T> implements IEnvVar<T> {
  public static new(name: string) {
    return new this<string>(name);
  }

  public static string(name: string) {
    return new this<string>(name);
  }

  public static int(name: string, radix: number = 10) {
    return new this<string>(name).convert((value) => parseInt(value, radix));
  }

  public static float(name: string) {
    return new this<string>(name).convert((value) => parseFloat(value));
  }

  public static boolean(name: string) {
    return new this<string>(name).convert((value) => {
      const lowerCaseValue = value.toLowerCase();
      switch (lowerCaseValue) {
        case "true":
        case "on":
        case "yes":
        case "1":
          return true;
        case "false":
        case "off":
        case "no":
        case "0":
          return false;
        default:
          throw new Error("Not a boolean");
      }
    });
  }

  protected state: {
    name: string;
    isRequired: boolean;
    defaultString?: string;
    defaultValue?: T;
    converter?: (value: string) => T;
  };

  protected constructor(name: string) {
    this.state = {
      isRequired: true,
      name,
    };
  }

  public hasDefaultValue() {
    return !isUndefined(this.state.defaultValue);
  }

  public hasDefaultString() {
    return !isUndefined(this.state.defaultValue);
  }

  public isRequired(): boolean {
    return this.state.isRequired;
  }

  public require(): this & { isRequired(): true } {
    this.state.isRequired = true;
    return this as any;
  }

  public optional(): this & { isRequired(): false } {
    this.state.isRequired = false;
    return this as any;
  }

  public default(
    defaultValue: T,
  ): this & { hasDefaultValue(): true } & { isRequired(): false } {
    this.state.defaultValue = defaultValue;
    this.state.isRequired = false;
    return this as any;
  }

  public defaultString(
    rawValue: string,
  ): this & { hasDefaultString(): true } & { isRequired(): false } {
    this.state.defaultString = rawValue;
    this.state.isRequired = false;
    return this as any;
  }

  public convert<U>(converter: (value: T) => U) {
    this.state.converter = (converter as any) as ((value: string) => T);
    return (this as any) as EnvVar<U>;
  }

  public get<
    This extends this &
      (
        | { isRequired(): true }
        | { hasDefaultString(): true }
        | { hasDefaultValue(): true })
  >(this: This): T;
  public get<This extends this>(this: This): T | undefined;
  public get() {
    let value = process.env[this.state.name];
    if (isUndefined(value)) {
      if (this.hasDefaultValue()) {
        return this.state.defaultValue;
      } else if (this.hasDefaultString()) {
        value = this.state.defaultString!;
      } else if (this.state.isRequired) {
        throw new Error(
          `Environment variable ${this.state.name} is required, but undefined.`,
        );
      } else {
        return undefined;
      }
    }
    if (!this.state.converter) {
      return value;
    }

    return this.state.converter(value);
  }
}

export type EnvVarMapType<ValueTypeMap extends object> = {
  [key in keyof ValueTypeMap]: EnvVar<ValueTypeMap[key]>
};

// tslint:disable-next-line:max-classes-per-file
export class EnvVarMap<ValueMap extends object> {
  public static new<ValueMap extends object>(map: EnvVarMapType<ValueMap>) {
    return new this<ValueMap>(map);
  }

  protected readonly map: EnvVarMapType<ValueMap>;
  constructor(map: EnvVarMapType<ValueMap>) {
    this.map = map;
  }

  public get() {
    const o: ValueMap = {} as ValueMap;
    const keys: Array<keyof ValueMap> = Object.keys(this.map) as any[];
    for (const key of keys) {
      o[key] = this.map[key].get();
    }
    return o;
  }
}
