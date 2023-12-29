import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import { authenticatedMiddleware } from '@core/middlewares';
import { ScheduleController } from '../controllers';

export const scheduleRoutes = Router();
scheduleRoutes.use(authenticatedMiddleware);

scheduleRoutes.get('/', celebrate({
	[Segments.QUERY]: {
		start_time: Joi.date().required(),
		end_time: Joi.date().required()
	}
}), ScheduleController.list);

scheduleRoutes.get('/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	}
}), ScheduleController.search);

scheduleRoutes.post('/', celebrate({
	[Segments.BODY]: {
		name: Joi.string().required(),
		start_time: Joi.date().required(),
		barber_id: Joi.string().uuid().required(),
		customer_id: Joi.string().uuid().required(),
		labors: Joi.array().items(Joi.string().uuid().required()).required(),
	}
}), ScheduleController.create);

scheduleRoutes.post('/', celebrate({
	[Segments.BODY]: {
		id: Joi.string().uuid(),
		start_time: Joi.date().required(),
		barber_id: Joi.string().uuid().required(),
		customer_id: Joi.string().uuid().required(),
		labors: Joi.array().items(Joi.string().uuid().required()).required(),
	}
}), ScheduleController.create);

scheduleRoutes.post('/validate', celebrate({
	[Segments.BODY]: {
		id: Joi.string().uuid(),
		start_time: Joi.date().required(),
		barber_id: Joi.string().uuid().required(),
		labors: Joi.array().items(Joi.string().uuid().required()).required(),
	}
}), ScheduleController.validate);

scheduleRoutes.put('/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	},
	[Segments.BODY]: {
		name: Joi.string().required(),
		start_time: Joi.date().required(),
		barber_id: Joi.string().uuid().required(),
		customer_id: Joi.string().uuid().required(),
		labors: Joi.array().items(Joi.string().uuid().required()).required(),
	}
}), ScheduleController.update);

scheduleRoutes.delete('/:id', celebrate({
	[Segments.PARAMS]: {
		id: Joi.string().uuid()
	}
}), ScheduleController.delete);
