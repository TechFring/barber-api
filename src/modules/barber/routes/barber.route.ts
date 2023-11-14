import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import authenticatedMiddleware from '@core/middlewares/authenticated.middleware';
import { BarberController } from '../controllers/barber.controller';

const barberRoutes = Router();
barberRoutes.use(authenticatedMiddleware);

barberRoutes.get('/', celebrate({
	[Segments.QUERY]: {
		name: Joi.string().allow(''),
		email: Joi.string().allow(''),
		document: Joi.string().allow(''),
		active: Joi.boolean().allow(''),
		page: Joi.number().integer().allow(''),
		per_page: Joi.number().integer().allow(''),
	},
}), BarberController.list);

barberRoutes.get('/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	},
}), BarberController.search);

barberRoutes.post('/', celebrate({
	[Segments.BODY]: {
		name: Joi.string().required(),
		email: Joi.string().required(),
		document: Joi.string().required(),
		date_birth: Joi.date().required(),
	}
}), BarberController.create);

barberRoutes.put('/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	},
	[Segments.BODY]: {
		name: Joi.string().required(),
		email: Joi.string().required(),
		document: Joi.string().required(),
		date_birth: Joi.date().required()
	}
}), BarberController.update);

barberRoutes.patch('/active', celebrate({
	[Segments.BODY]: {
		ids: Joi.array().items(Joi.string().uuid().required()).required()
	}
}), BarberController.activeMany);

barberRoutes.patch('/active/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	},
}), BarberController.active);

barberRoutes.patch('/inactive', celebrate({
	[Segments.BODY]: {
		ids: Joi.array().items(Joi.string().uuid().required()).required()
	}
}), BarberController.inactiveMany);

barberRoutes.patch('/inactive/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	},
}), BarberController.inactive);

export default barberRoutes;