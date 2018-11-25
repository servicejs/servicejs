/**
 * Result type
 */

export interface IResultBase<ResultType> {
  readonly type: () => ResultType;
}

export interface IResultMapResult<
  ResultMap,
  ResultType extends keyof ResultMap
> extends IResultBase<ResultType> {
  readonly value: () => ResultMap[ResultType];
}

export function resultIs<ResultMap, TestedResultType extends keyof ResultMap>(
  testedResultType: TestedResultType,
  result: IResultMapResult<ResultMap, keyof ResultMap>,
): result is IResultMapResult<ResultMap, TestedResultType> {
  return result.type() === testedResultType;
}

export class Result<ResultMap, ResultType extends keyof ResultMap>
  implements IResultMapResult<ResultMap, ResultType> {
  public readonly type: () => ResultType;
  public readonly value: () => ResultMap[ResultType];

  constructor(type: ResultType, value: ResultMap[ResultType]) {
    this.type = () => type;
    this.value = () => value;
  }

  public is<TestedResultType extends keyof ResultMap>(
    testedResultType: TestedResultType,
  ): this is IResultMapResult<ResultMap, TestedResultType> {
    return resultIs(testedResultType, this);
  }

  public if<TestedResultType extends keyof ResultMap>(
    testedResultType: TestedResultType,
    action: (value: ResultMap[TestedResultType]) => any,
  ): this {
    if (this.is(testedResultType)) {
      action(
        ((this as Result<ResultMap, keyof ResultMap>) as Result<
          ResultMap,
          TestedResultType
        >).value(),
      );
    }
    return this;
  }
}

//
// Binary Result
//

export type SuccessResultType = "success";
export type FailureResultType = "failure";

export type BinaryOutcomeResultType<NonSuccessResultType = FailureResultType> =
  | SuccessResultType
  | NonSuccessResultType;

export interface IBinaryResultBase<NonSuccessResultType = FailureResultType>
  extends IResultBase<BinaryOutcomeResultType<NonSuccessResultType>> {}

export interface IBinaryResultMap<T, F> {
  success: T;
  failure: F;
}

export type SuccessType<
  BinaryResultMapType extends IBinaryResultMap<any, any>
> = BinaryResultMapType extends IBinaryResultMap<infer T, infer F> ? T : never;
export type FailureType<
  BinaryResultMapType extends IBinaryResultMap<any, any>
> = BinaryResultMapType extends IBinaryResultMap<infer T, infer F> ? F : never;

export interface IBinaryResult<
  ResultMap extends IBinaryResultMap<any, any>,
  ResultType extends keyof ResultMap
> extends IResultMapResult<ResultMap, ResultType> {}

export interface IBinarySuccessResult<
  ResultMap extends IBinaryResultMap<any, any>
> extends IBinaryResult<ResultMap, SuccessResultType> {}
export interface IBinaryFailureResult<
  ResultMap extends IBinaryResultMap<any, any>
> extends IBinaryResult<ResultMap, FailureResultType> {}

// tslint:disable-next-line:max-classes-per-file
export class BinaryResult<
  ResultMap extends IBinaryResultMap<any, any>,
  ResultType extends keyof ResultMap
> extends Result<ResultMap, ResultType>
  implements IBinaryResult<ResultMap, ResultType> {
  public static success<ResultMap extends IBinaryResultMap<any, any>>(
    successValue: SuccessType<ResultMap>,
  ) {
    return new this<ResultMap, SuccessResultType>("success", successValue);
  }
  public static failure<ResultMap extends IBinaryResultMap<any, any>>(
    failureValue: FailureType<ResultMap>,
  ) {
    return new this<ResultMap, FailureResultType>("failure", failureValue);
  }

  public isSuccess(): this is BinaryResult<ResultMap, SuccessResultType> {
    return this.type() === "success";
  }

  public isFailure(): this is BinaryResult<ResultMap, FailureResultType> {
    return this.type() === "failure";
  }

  public ifSuccess(action: (value: SuccessType<ResultMap>) => any): this {
    return this.if("success", action);
  }

  public ifFailure(action: (value: FailureType<ResultMap>) => any): this {
    return this.if("failure", action);
  }
}

//
// TernaryResult
//

export type ErrorResultType = "error";
export type FailureOrErrorResultType = FailureResultType | ErrorResultType;

export type TernaryOutcomeResultType<
  NonSuccessResultType = FailureOrErrorResultType
> = BinaryOutcomeResultType<NonSuccessResultType>;

export interface ITernaryResultBase<
  NonSuccessResultType = FailureOrErrorResultType
> extends IResultBase<TernaryOutcomeResultType<NonSuccessResultType>> {}

export interface ITernaryResultMap<T, F, E> extends IBinaryResultMap<T, F> {
  error: E;
}

export type ErrorType<
  TernaryResultMapType extends ITernaryResultMap<any, any, any>
> = TernaryResultMapType extends ITernaryResultMap<infer T, infer F, infer E>
  ? E
  : never;

export interface ITernaryResult<
  ResultMap extends ITernaryResultMap<any, any, any>,
  ResultType extends keyof ResultMap
> extends IResultMapResult<ResultMap, ResultType> {}

export interface ITernarySuccessResult<
  ResultMap extends ITernaryResultMap<any, any, any>
> extends ITernaryResult<ResultMap, SuccessResultType> {}
export interface ITernaryFailureResult<
  ResultMap extends ITernaryResultMap<any, any, any>
> extends ITernaryResult<ResultMap, FailureResultType> {}
export interface ITernaryErrorResult<
  ResultMap extends ITernaryResultMap<any, any, any>
> extends ITernaryResult<ResultMap, ErrorResultType> {}

// tslint:disable-next-line:max-classes-per-file
export class TernaryResult<
  ResultMap extends ITernaryResultMap<any, any, any>,
  ResultType extends keyof ResultMap
> extends BinaryResult<ResultMap, ResultType>
  implements ITernaryResult<ResultMap, ResultType> {
  public static success<ResultMap extends ITernaryResultMap<any, any, any>>(
    successValue: SuccessType<ResultMap>,
  ) {
    return new this<ResultMap, SuccessResultType>("success", successValue);
  }
  public static failure<ResultMap extends ITernaryResultMap<any, any, any>>(
    failureValue: FailureType<ResultMap>,
  ) {
    return new this<ResultMap, FailureResultType>("failure", failureValue);
  }
  public static error<ResultMap extends ITernaryResultMap<any, any, any>>(
    errorValue: ErrorType<ResultMap>,
  ) {
    return new this<ResultMap, ErrorResultType>("error", errorValue);
  }

  public isSuccess(): this is TernaryResult<ResultMap, SuccessResultType> {
    return this.type() === "success";
  }

  public isFailure(): this is TernaryResult<ResultMap, FailureResultType> {
    return this.type() === "failure";
  }

  public isError(): this is TernaryResult<ResultMap, ErrorResultType> {
    return this.type() === "error";
  }

  public ifError(action: (value: ErrorType<ResultMap>) => any): this {
    return this.if("error", action);
  }
}
