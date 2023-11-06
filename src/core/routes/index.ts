import { Router } from 'express';
import barberRoutes from '@modules/barber/routes/barber.route';
import customerRoutes from '@modules/customer/routes/customer.route';
import laborRoutes from '@modules/labor/routes/labor.route';
import scheduleRoutes from '@modules/schedule/routes/schedule.route';

const routes = Router();

routes.use('/barber', barberRoutes);
routes.use('/customer', customerRoutes);
routes.use('/labor', laborRoutes);
routes.use('/schedule', scheduleRoutes);

export default routes;