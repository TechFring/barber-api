import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import { authenticatedMiddleware } from '@core/middlewares';
import { LogController } from '../controllers';

export const logRoutes = Router();
logRoutes.use(authenticatedMiddleware);

logRoutes.get('/', celebrate({
	[Segments.QUERY]: {
		description: Joi.string().allow(''),
		created_at: Joi.date().raw().allow(''),
		page: Joi.number().integer().allow(''),
		per_page: Joi.number().integer().allow(''),
	}
}), LogController.list);
