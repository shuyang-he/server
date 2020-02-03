const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const data = JSON.parse(message.toString());
    console.log(data);
    const {command, x, y} = data;
    
    if (command === 'add') {
      const res = x + y;
      ws.send(res);
    }
    if (command === 'subtract') {
      const res = x - y;
      ws.send(res);
    }
  });
});