export class TypedError<T extends string> extends Error {
  type: T;
  detail: string;

  constructor(type: T, detail?: string) {
    super(detail);
    this.name = 'TypedError';
    this.type = type;
    this.detail = detail || ' ';
    Object.setPrototypeOf(this, TypedError.prototype);
  }

  toString() {
    return `[${this.name}] ${this.type} - ${this.detail}: ${this.message}`;
  }

  getStackTraceIfExit(): string | undefined {
    return this.stack;
  }
}
