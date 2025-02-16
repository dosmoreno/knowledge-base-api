import { Request, Response, NextFunction } from 'express';

// Centralized error handler middleware
export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Optionally log the error (you can use a logging library here)
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Send a standardized error response
  res.status(statusCode).json({
    message,
    details: err.details || null, // Attach additional error details if available
  });
};
