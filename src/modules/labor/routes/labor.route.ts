import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import authenticatedMiddleware from '@core/middlewares/authenticated.middleware';
import LaborController from '../controllers/labor.controller';

const laborRoutes = Router();
laborRoutes.use(authenticatedMiddleware);

laborRoutes.get('/', celebrate({
	[Segments.QUERY]: {
		name: Joi.string().allow(''),
		duration: Joi.number().integer().allow(''),
		active: Joi.boolean().allow(''),
		page: Joi.number().integer().allow(''),
		per_page: Joi.number().integer().allow(''),
	}
}), LaborController.list);

laborRoutes.get('/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	}
}), LaborController.search);

laborRoutes.post('/', celebrate({
	[Segments.BODY]: {
		name: Joi.string().required(),
		duration: Joi.number().integer().required(),
	}
}), LaborController.create);

laborRoutes.put('/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	},
	[Segments.BODY]: {
		name: Joi.string().required(),
	}
}), LaborController.update);

laborRoutes.patch('/active', celebrate({
	[Segments.BODY]: {
		ids: Joi.array().items(Joi.string().uuid().required()).required()
	}
}), LaborController.activeMany);

laborRoutes.patch('/active/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	}
}), LaborController.active);

laborRoutes.patch('/inactive', celebrate({
	[Segments.BODY]: {
		ids: Joi.array().items(Joi.string().uuid().required()).required()
	}
}), LaborController.inactiveMany);

laborRoutes.patch('/inactive/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	}
}), LaborController.inactive);

export default laborRoutes;