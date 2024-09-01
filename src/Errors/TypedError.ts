export class TypedError<T extends string> extends Error {
  type: T;
  details: string | undefined;

  /**
   * @argument details: string - Runtime details about the error
   */
  constructor(type: T, details?: string, e?: Error) {
    super(e?.message);
    this.name = 'TypedError';
    this.type = type;
    this.details = details;
    Object.setPrototypeOf(this, TypedError.prototype);
  }

  /** Make sure this is compatible with translations */
  toString() {
    return `${this.type}${this.details ? ' ' + this.details : ''}`;
  }

  toStringComplete() {
    return `[${this.name}] ${this.type} ${this.details ? this.details : ''} ${
      this.message ? ':' : ''
    } ${this.message}`;
  }

  getStackTraceIfExit(): string | undefined {
    return this.stack;
  }
}
