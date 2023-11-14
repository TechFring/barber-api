import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import ErrorHandler from '@core/models/error-handler.model';
import { config } from '@core/config';

export default function authenticatedMiddleware(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new ErrorHandler('Token de autenticação necessário', 401);
	}

  try {
		if (!authHeader.startsWith('Bearer')) {
			throw new Error();
		}

		const [, token] = authHeader.split(' ');
    const { sub } = verify(token, config.jwt.secret);
    request.user = { id: sub as string };
    return next();
  } catch {
    throw new ErrorHandler('Token de autenticação inválido', 401);
  }
}