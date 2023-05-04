# https-wss-server-to-server-example

Repo to proove two web servers can communicate over http and websocket when both are running SSL using the same
certificate files.

![image](https://user-images.githubusercontent.com/2157412/236303914-70f57daf-4e57-42d9-b3f7-d53d60c8d4d2.png)

## Setup

The certificate files in `./ssl_certs` were created for `localhost`
using [mkcert](https://github.com/FiloSottile/mkcert).  
To use them you just need to follow the steps in that README.md to install mkcert as a certificate authority on
your machine locally.

Or you can drop in your own certificate files in `./ssl_certs`
