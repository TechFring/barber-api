import { Request, Response, NextFunction } from 'express';

export default function logMiddleware(request: Request, response: Response, next: NextFunction) {
	// console.log(request.method, request.baseUrl, request.statusCode, request.statusMessage);
	console.log({
		action: request.method,
		url: decodeURI(request.originalUrl),
	})
	return next();
}
