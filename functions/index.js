const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

module.exports.handler = serverless(app);