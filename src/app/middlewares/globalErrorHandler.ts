import { ErrorRequestHandler } from "express";
import handleValidationError from "../../errors/handleValidationError";
import ApiError from "../../errors/ApiError";
import config from "../../config";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === "development"
    ? console.log(`globalErrorHandler ~ ${error}`)
    : console.log(`globalErrorHandler ~ ${error}`);
  let statusCode = 500;
  let message = "Something Went Wrong!";
  let errorMessages: IGenericErrorMessage[] = [];

  //Mongoose Validation Error
  if (error.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  //Custom Thrown Error Messages
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error.message,
          },
        ]
      : [];
  }

  //Inbuilt Error
  else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error.stack : undefined,
  });
};
