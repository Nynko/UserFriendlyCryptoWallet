export class TypedError<T extends string> extends Error {
  type: T;

  constructor(type: T, e?: Error) {
    super(e?.message);
    this.name = 'TypedError';
    this.type = type;
    Object.setPrototypeOf(this, TypedError.prototype);
  }

  toString() {
    return this.type;
  }

  toStringComplete() {
    return `[${this.name}] ${this.type} ${this.message ? ':' : ''} ${
      this.message
    }`;
  }

  getStackTraceIfExit(): string | undefined {
    return this.stack;
  }
}
