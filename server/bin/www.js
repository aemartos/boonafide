#!/usr/bin/env node
let app = require('../app').app;

app.use((req, res, next) => {
  res.status(404).json({status:"NOT FOUND", message: `${req.path} does not exist`});
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({status:"ERROR", message: err.message});
  }
});

let server = require('../app').server;

server.on('error', error => {
  if (error.syscall !== 'listen') { throw error }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${process.env.PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${process.env.PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

const port = process.env.PORT;

server.listen(port, () => console.log(`Listening on http://localhost:${port}`))
  .on('error', (e) => {
    console.log('Error', e);
    server.listen(Number(port) + 1, () => console.log(`Listening on http://localhost:${Number(port)+1}`));
});
