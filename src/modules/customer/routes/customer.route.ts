import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import CustomerController from '../controllers/customer.controller';

const customerRoutes = Router();

customerRoutes.get('/', celebrate({
	[Segments.QUERY]: {
		name: Joi.string().allow(''),
		phone: Joi.string().allow(''),
		email: Joi.string().allow(''),
		active: Joi.boolean().allow(''),
		page: Joi.number().integer().allow(''),
		per_page: Joi.number().integer().allow(''),
	}
}), CustomerController.list);

customerRoutes.get('/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid(),
	}
}), CustomerController.search);

customerRoutes.post('/', celebrate({
	[Segments.BODY]: {
		name: Joi.string().required(),
		phone: Joi.string().required(),
		email: Joi.string().required(),
	}
}), CustomerController.create);

customerRoutes.put('/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid(),
	},
	[Segments.BODY]: {
		name: Joi.string().required(),
		phone: Joi.string().required(),
		email: Joi.string().required(),
	}
}), CustomerController.update);

customerRoutes.patch('/active', celebrate({
	[Segments.BODY]: {
		ids: Joi.array().items(Joi.string().uuid().required()).required()
	}
}), CustomerController.activeMany);

customerRoutes.patch('/active/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	}
}), CustomerController.active);

customerRoutes.patch('/inactive', celebrate({
	[Segments.BODY]: {
		ids: Joi.array().items(Joi.string().uuid().required()).required()
	}
}), CustomerController.inactiveMany);

customerRoutes.patch('/inactive/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	}
}), CustomerController.inactive);

export default customerRoutes;