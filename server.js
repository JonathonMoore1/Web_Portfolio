const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 5000;
const app = express();

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }

    next();
  });
});

app.use(express.static(__dirname + '/playground'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/playground/index.html');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});