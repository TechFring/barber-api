import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export async function runMigrations() {
  try {
    const connectionOptions = await getConnectionOptions();
    const connection: Connection = await createConnection(connectionOptions);

    await connection.runMigrations({ transaction: 'all' });
    await connection.close();

    console.log('Migrações aplicadas com sucesso');
  } catch (error) {
    console.error('Erro ao executar migrações:', error);
    process.exit(1);
  }
}