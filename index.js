/* eslint-disable no-param-reassign */
require('module-alias/register');

const express = require('express');
const http = require('http');
const cors = require('cors');
const busboy = require('connect-busboy');
const config = require('./properties/config');
const LoggerManager = require('./util/logger');
const { normalizePort } = require('./util/helper-functions');
const loadBalancerRequest = require('./routes/middleware/load-balancer-requests');

const logger = LoggerManager.getLogger(__filename);

process.env.BABEL_CONFIG = process.env.BABEL_CONFIG || 'server';
require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-transform-runtime'],
});

/* create the express app and register the middleware and routes */
const app = express();
app.use(loadBalancerRequest);
app.use(busboy({
  highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
}));
app.use(express.json({ limit: '200mb', extended: true }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));
app.use(cors());
app.set('trust proxy', true);
require('./routes').default(app);
/* ------------------------------------------------------------ */

const port = normalizePort(process.env.PORT || config.get('server:port') || 3000);
const host = config.get('server:host') || '0.0.0.0';
const httpServer = http.createServer(app);

process.once('closeServer', () => {
  httpServer.close(() => {
    logger.debug('closing server');
    process.emit('serverClosed');
  });
});

const appServer = new Promise((resolve, reject) => {
  const server = httpServer.listen(port, host, (err) => {
    if (err) {
      logger.error('ERROR', err);
      reject(err);
      return;
    }
    process.emit('serverListening');
    resolve(server);
  });
});

appServer.then(() => {
  process.emit('webServerOnline');
  logger.debug(`Web Server Online! https://${host}:${port}`);
  if (process.send) {
    process.send('online');
  }
}).catch((err) => {
  logger.error('ERROR launching server', err);
  process.exit(-1);
});

module.exports = appServer;
