import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import './typeorm';
import routes from './routes';
import { errorHandlerMiddleware } from './middlewares';

process.env.TZ = 'America/Sao_Paulo';

const app = express();

app.use(cors());
app.use(logger('common'));
app.use(express.json());
app.use(pagination);
app.use(routes);

app.use(errors());
app.use(errorHandlerMiddleware);

app.listen(3333, () => {
	console.log('Server started on port 3333! 🚀')
});