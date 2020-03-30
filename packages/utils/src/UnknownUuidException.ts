import ExtendableError from 'ts-error';

export default class UnknownUuidException extends ExtendableError {
  constructor(uuid: any) {
    super(`Unknown UUID \`${uuid}\``);
  }
}
