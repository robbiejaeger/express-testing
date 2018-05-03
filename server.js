const express = require('express');
const app = express();

console.log(process.env);

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.send('Hello penguins.');
});

app.get('/api/v1/penguins', (request, response) => {
  database('penguins').select()
    .then((penguins) => {
      response.status(200).json(penguins);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`Testing app running on port ${app.get('port')}`);
});

module.exports = app;