import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  const statusCode = err.statusCode || 500;
  // Use req.t for the generic error message.
  // Note: req.t might not be available if the error happens before the i18n middleware.
  // A more robust solution would involve a custom error class that carries the i18n key.
  // For now, this is a good starting point.
  const message = err.isOperational ? err.message : req.t('error.generic');

  res.status(statusCode).json({
    status: 'error',
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
