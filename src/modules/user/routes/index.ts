import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import { UserController } from '../controllers';
import { authenticatedMiddleware } from '@core/middlewares';

export const userRoutes = Router();

userRoutes.get('/', authenticatedMiddleware, celebrate({
	[Segments.QUERY]: {
		name: Joi.string().allow(''),
		username: Joi.number().integer().allow(''),
		admin: Joi.boolean().allow(''),
		active: Joi.boolean().allow(''),
		page: Joi.number().integer().allow(''),
		per_page: Joi.number().integer().allow(''),
	}
}), UserController.list);

userRoutes.post('/', authenticatedMiddleware, celebrate({
	[Segments.BODY]: {
		name: Joi.string().required(),
		login: Joi.string().required(),
		password: Joi.string().required(),
		admin: Joi.boolean().required(),
	}
}), UserController.create);

userRoutes.post('/auth', celebrate({
	[Segments.BODY]: {
		login: Joi.string().required(),
		password: Joi.string().required(),
	}
}), UserController.auth);
