require('dotenv').config();

const configValues = process.env;

const {DB_CONNECTION_URI} = configValues;

module.exports = {DB_CONNECTION_URI}