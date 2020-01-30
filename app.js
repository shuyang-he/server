const express = require('express');
const app = express();
const port = 8080;
const indexRouter = require('./routes/index');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('server received: %s', message);
    if (message > 9) {
      ws.send('Server: This number has two digits.');
    } else {
      ws.send('Server: This number has one digit.');
    }
  });
});

app.use('/', indexRouter);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}!`);
// });
