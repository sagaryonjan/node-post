require('dotenv').config();

// Default configuration for database connection
let connection = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8',
  timezone: 'UTC'
};

// For test environment
if (process.env.NODE_ENV === 'test') {
  connection = {
    ...connection,
    port: process.env.TEST_DB_PORT,
    host: process.env.TEST_DB_HOST,
    user: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME
  };
}

module.exports = {
  connection,
  client: process.env.DB_CLIENT,
  migrations: {
    directory: 'src/database/migrations',
    tableName: 'migrations',
  },
  seeds: {
    directory: 'src/database/seeds',
  },
};
