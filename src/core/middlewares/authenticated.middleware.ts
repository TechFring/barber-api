import { instanceToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { ErrorHandler } from '@core/models';
import { config } from '@core/config';
import { UserRepository } from '@modules/user/repositories';

export async function authenticatedMiddleware(request: Request, response: Response, next: NextFunction): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new ErrorHandler('Token de autenticação necessário', 401);
	}

  try {
		const [, token] = authHeader.split(' ');
    const { sub } = verify(token, config.jwt.secret);
		const userRepository = getCustomRepository(UserRepository);
		const authUser = instanceToInstance(await userRepository.findByIdOrFail(sub as string));
    request.user = authUser;
    return next();
  } catch (err) {
    throw new ErrorHandler('Token de autenticação inválido', 418);
  }
}