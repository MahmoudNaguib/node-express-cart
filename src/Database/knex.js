require('dotenv').config();
const environment = process.env.APP_ENV || 'development'
const config = require('../../knexfile')[environment];
const knex = require('knex')(config);
module.exports = knex;