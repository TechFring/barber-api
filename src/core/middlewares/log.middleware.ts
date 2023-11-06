import { Request, Response, NextFunction } from 'express';

export default function logMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
	console.log({
		request,
		response
	})
	return next();
}
