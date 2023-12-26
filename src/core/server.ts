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

process.env.TZ = 'America/Sao_Paulo';

(async function() {
	const app = express();
	const port = 3333;

	try {
		await waitPort({ host: process.env.DB_HOST, port: +(process.env.DB_PORT as string), timeout: 20000 });
		await runMigrations();

		createConnection();

		app.use(cors());
		app.use(logger('common'));
		app.use(express.json());
		app.use(pagination);
		app.use(routes);

		app.use(errors());
		app.use(errorHandlerMiddleware);
	
		app.listen(port, () => console.log(`Serviço ouvindo a porta ${port}`));
	} catch (err) {
		console.error(`Ocorreu um erro durante a inicialização da porta ${port}: ${err}`);
    process.exit(1);
	}
})();
