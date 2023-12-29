import { Router } from 'express';
import { barberRoutes } from '@modules/barber/routes';
import { customerRoutes } from '@modules/customer/routes';
import { laborRoutes } from '@modules/labor/routes';
import { scheduleRoutes } from '@modules/schedule/routes';
import { userRoutes } from '@modules/user/routes';
import { logRoutes } from '@modules/logs/routes';

const routes = Router();

routes.use('/barber', barberRoutes);
routes.use('/customer', customerRoutes);
routes.use('/labor', laborRoutes);
routes.use('/schedule', scheduleRoutes);
routes.use('/user', userRoutes);
routes.use('/log', logRoutes);

export default routes;