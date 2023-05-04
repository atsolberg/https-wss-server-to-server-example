const https = require('https');
const express = require('express');
const {readFileSync} = require('fs');
const WebSocket = require('ws');

// Setup Web Server
const app = express();

const CERT_DIR = `${process.cwd()}/ssl_certs`;

const httpsServer = https.createServer({
  key: readFileSync(`${CERT_DIR}/key.pem`),
  cert: readFileSync(`${CERT_DIR}/cert.pem`),
}, app);

app.get('/ping', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://localhost:8001')
  res.send('pong')
});

httpsServer.listen('8002', () => {
  console.log('Dev server listening on port 8002');
})

// Setup Websocket Server
const wss = new WebSocket.Server({server: httpsServer});

function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

const sendWssPing = () => broadcast('wss ping');

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  ws.on('message', (data) => console.log('received: %s', data));
  ws.send('Hey Buddy');
});

setInterval(sendWssPing, 2000);