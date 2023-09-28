import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("invalid request parameters");

    // Needed when extending a base class.
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((valErr) => {
      return {
        message: valErr.msg,
        field: valErr.param,
      };
    });
  }
}
