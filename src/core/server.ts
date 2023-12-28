import dotenv from 'dotenv';
dotenv.config();
process.env.TZ = 'America/Sao_Paulo';

import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import waitPort from 'wait-port';
import { errors } from 'celebrate';
import { createConnection } from 'typeorm';
import { pagination } from 'typeorm-pagination';
import routes from './routes';
import { errorHandlerMiddleware } from './middlewares';
import { runMigrations } from './typeorm';

const APP_PORT = 3333;

const DB_HOST = process.env.DB_HOST!;
const DB_PORT = +(process.env.DB_PORT!);
const DB_TIMEOUT = 20000;

(async function() {
	const app = express();

	try {
		await waitPort({ host: DB_HOST, port: DB_PORT, timeout: DB_TIMEOUT });
		await runMigrations();

		createConnection();

		app.use(cors());
		app.use(logger('common'));
		app.use(express.json());
		app.use(pagination);
		app.use(routes);

		app.use(errors());
		app.use(errorHandlerMiddleware);
	
		app.listen(APP_PORT, () => console.log(`Serviço ouvindo a porta ${APP_PORT}`));
	} catch (err) {
		console.error(`Ocorreu um erro durante a inicialização da porta ${APP_PORT}: ${err}`);
    process.exit(1);
	}
})();
