const baseDir = process.env.TS_NODE === 'production' ? './dist' : './src';
const extension = process.env.TS_NODE === 'production' ? '.js' : '.ts';

module.exports = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [`${baseDir}/modules/**/entities/*${extension}`],
	migrations: [`${baseDir}/core/typeorm/migrations/*${extension}`],
	cli: {
		'migrationsDir': `${baseDir}/core/typeorm/migrations`
	},
}