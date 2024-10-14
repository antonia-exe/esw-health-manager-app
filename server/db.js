const { Pool } = require('pg');

const pool = new Pool({
  user: 'antonia',
  host: 'localhost',
  database: 'database',
  password: '1234',
  port: 5432, // A porta padrão do PostgreSQL
});

// Testando a conexão
pool.connect()
  .then(() => console.log('Conectado ao PostgreSQL'))
  .catch(err => console.error('Erro ao conectar ao PostgreSQL', err));

module.exports = pool; // Exporte a conexão para ser usada em outras partes do app
