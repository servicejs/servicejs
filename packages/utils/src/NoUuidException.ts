import ExtendableError from 'ts-error';

export default class NoUuidException extends ExtendableError {
  constructor(message = 'No UUID in response') {
    super(message);
  }
}
