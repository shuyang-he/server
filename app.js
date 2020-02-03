const express = require('express');
const app = express();
const port = 8080;
const indexRouter = require('./routes/index');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const wss = new WebSocket.Server({ port: 8080 });


app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const data = JSON.parse(message.toString());
    console.log(data);
    const {command, path} = data;
    
    if (command === 'load') {
      fs.readFile(path, (err, res) => {
        ws.send(res);
      });
    }
    // if (command === 'subtract') {
    //   const res = x - y;
    //   ws.send(res);
    // }
  });
});

// app.use('/', indexRouter);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}!`);
// });
