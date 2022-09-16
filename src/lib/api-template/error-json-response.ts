class ErrorJsonResponseBase {
  readonly code: number;
  readonly message: string;
  readonly description?: string;

  constructor(code: number, message: string, description?: string) {
    this.code = code;
    this.message = message;
    this.description = description;
  }
}

class FieldErrorJsonResponse extends ErrorJsonResponseBase {
  readonly field: string;

  constructor(field: string, ...args: ConstructorParameters<typeof ErrorJsonResponseBase>) {
    super(...args);
    this.field = field;
  }
}

type FieldErrorJsonResponses = readonly FieldErrorJsonResponse[];

class ErrorJsonResponse extends ErrorJsonResponseBase {
  readonly errors?: FieldErrorJsonResponses;

  constructor(code: number, message: string, description?: string, errors?: FieldErrorJsonResponses) {
    super(code, message, description);
    this.errors = errors;
  }
}

export {
  ErrorJsonResponse,
  ErrorJsonResponseBase,
  FieldErrorJsonResponse,
  type FieldErrorJsonResponses
};
