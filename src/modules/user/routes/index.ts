import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import { UserController } from '../controllers';
import { authenticatedMiddleware } from '@core/middlewares';
import { UserLevelEnum } from '../enums';

export const userRoutes = Router();

const level = Joi.number().valid(UserLevelEnum.Operator, UserLevelEnum.Moderator, UserLevelEnum.Admin);

userRoutes.get('/', authenticatedMiddleware, celebrate({
	[Segments.QUERY]: {
		name: Joi.string().allow(''),
		login: Joi.string().allow(''),
		level: level.allow(''),
		page: Joi.number().integer().allow(''),
		per_page: Joi.number().integer().allow(''),
	}
}), UserController.list);

userRoutes.get('/:id', authenticatedMiddleware, celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid(),
	}
}), UserController.search);

userRoutes.post('/', authenticatedMiddleware, celebrate({
	[Segments.BODY]: {
		name: Joi.string().required(),
		login: Joi.string().required(),
		password: Joi.string().required(),
		level: level.required(),
	}
}), UserController.create);

userRoutes.put('/:id', authenticatedMiddleware, celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid(),
	},
	[Segments.BODY]: {
		name: Joi.string().required(),
		login: Joi.string().required(),
		password: Joi.string().allow(''),
		level: level.required(),
	}
}), UserController.update);

userRoutes.patch('/active', authenticatedMiddleware, celebrate({
	[Segments.BODY]: {
		ids: Joi.array().items(Joi.string().uuid().required()).required()
	}
}), UserController.activeMany);

userRoutes.patch('/active/:id', authenticatedMiddleware, celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	}
}), UserController.active);

userRoutes.patch('/inactive', authenticatedMiddleware, celebrate({
	[Segments.BODY]: {
		ids: Joi.array().items(Joi.string().uuid().required()).required()
	}
}), UserController.inactiveMany);

userRoutes.patch('/inactive/:id', authenticatedMiddleware, celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	}
}), UserController.inactive);

userRoutes.post('/auth', celebrate({
	[Segments.BODY]: {
		login: Joi.string().required(),
		password: Joi.string().required(),
	}
}), UserController.auth);
