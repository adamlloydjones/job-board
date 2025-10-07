const { Client } = require('elasticsearch');

const esClient = new Client({
  host: process.env.ELASTICSEARCH_URL,
  log: 'error',
});

module.exports = esClient;
