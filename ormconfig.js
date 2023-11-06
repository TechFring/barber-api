module.exports = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	migrations: ['./src/core/typeorm/migrations/*.ts'],
	entities: ['./src/modules/**/entities/*.ts'],
	cli: {
		'migrationsDir': 'src/core/typeorm/migrations/'
	}
}