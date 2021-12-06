// server.js
const PORT = process.env.TEST_SERVER_PORT ?
  Number(process.env.TEST_SERVER_PORT) :
  8080;

const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.listen(PORT, function(err) {
  if (err) console.log(err);
  console.log('Server listening on PORT', PORT);
});
