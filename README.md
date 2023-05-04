# https-wss-server-to-server-example

Repo to proove two web servers can communicate over http and websocket when both are running SSL using the same
certificate files.

![image](https://user-images.githubusercontent.com/2157412/236303914-70f57daf-4e57-42d9-b3f7-d53d60c8d4d2.png)

## Setup

The certificate files in `./ssl_certs` were created for `localhost`
using [mkcert](https://github.com/FiloSottile/mkcert).  
To use them you just need to follow the steps in that README.md to install mkcert as a certificate authority on
your machine locally. It's bascially just `brew install mkcert` and then `mkcert -install`.

Or you can drop in your own certificate files in `./ssl_certs`

## Running

In two separate terminals, run `node app-server/server.js` to start the app server and `node dev-server/server.js`
to run the dev server.

Then visit `https://localhost:8001` and you should see `sending ping`,`pong` for the https
requests and
`wss message: "wss ping"` for the websocket messages.
