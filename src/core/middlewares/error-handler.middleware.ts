import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '@core/models';

export function errorHandlerMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
	console.error(error);

	if (error instanceof ErrorHandler) {
		return response.status(error.statusCode).json({
			status: 'error',
			message: error.message,
		});
	}

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
}
