require('dotenv').config();
module.exports = {
  testing: {
    client: 'mysql',
    connection: {
      host:process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:__dirname+'/src/Database/Migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory:__dirname+'/src/Database/Seeders',
    },
    debug:false,
  },
  development: {
    client: 'mysql',
    connection: {
      host:process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:__dirname+'/src/Database/Migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory:__dirname+'/src/Database/Seeders',
    },
    debug:false,
  },
  production: {
    client: 'mysql',
    connection: {
      host:process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:__dirname+'/src/Database/Migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory:__dirname+'/src/Database/Seeders',
    },
    debug:false,
  }
};
