const app = require('./app');
const env = require('./config/env');
const { testConnection, syncDatabase } = require('./db/connection');
require('./models');

const port = normalizePort(env.port);
app.set('port', port);

async function startServer() {
  try {
    await testConnection();
    await syncDatabase();
  } catch (error) {
    console.error('No se pudo conectar a MySQL:', error.message);
    console.error('Verifica las variables DB_* en tu archivo .env');
    process.exit(1);
  }

  const server = app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });

  server.on('error', onError);
}

function normalizePort(value) {
  const parsedPort = Number.parseInt(value, 10);

  if (Number.isNaN(parsedPort)) {
    return value;
  }

  if (parsedPort >= 0) {
    return parsedPort;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requiere privilegios elevados`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} ya esta en uso`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

startServer();
