const https = require('https');
const express = require('express');
const {readFileSync} = require('fs');

const app = express();

const CERT_DIR = `${process.cwd()}/ssl_certs`;

const httpsServer = https.createServer({
  key: readFileSync(`${CERT_DIR}/key.pem`),
  cert: readFileSync(`${CERT_DIR}/cert.pem`),
}, app);

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <script>
          function sendHttpsPing() {
            console.log('sending ping')
            const req = new XMLHttpRequest();
            req.addEventListener('load', ({target}) => console.log(target.response));
            req.open('GET', 'https://localhost:8002/ping');
            req.send();
          }
          
          // Ping dev server with https requests
          setInterval(sendHttpsPing, 2000);
            
          // Handle dev server websocket messages
          try {
            let ws = new WebSocket('wss://localhost:8002');
            ws.onmessage = (msg) => console.log('wss message:', msg.data);
            ws.onerror = (err) => console.log('wss error:', err);
          } catch (err) { console.log('socket creation error:', err) }
        </script>
      </head>
      <body>App Server: Hello World</body>
    </html>
  `)
});

httpsServer.listen('8001', () => {
  console.log('App server listening on port 8001');
})
