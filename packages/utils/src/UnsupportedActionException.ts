import ExtendableError from 'ts-error';

export default class UnsupportedActionException extends ExtendableError {
  constructor(message?: string) {
    super(message);
  }
}
