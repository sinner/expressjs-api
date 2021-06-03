const nconf = require('nconf');
const fs = require('fs');

const env = process.env.NODE_ENV || 'dev';
const rootDirectory = process.cwd();

// create new instance of nconf
const store = new nconf.Provider();

store.argv().env('__');

// initalize a rough version of log4js just to get started
const log4js = require('log4js');

log4js.configure({
  appenders: {
    appConsole: { type: 'console' },
  },
  categories: { default: { appenders: ['appConsole'], level: 'ERROR' } },
});
const logger = log4js.getLogger('properties');

function log(msg) {
  logger.info(msg);
}

function requiredProperties(name, file) {
  if (!fs.existsSync(file)) {
    logger.error(
      `When specified, ${
        name
      } configuration file ${
        file
      } is required, but does not exist.`,
    );
    process.exit(1);
  } else {
    log(`Loading ${name} configuration name: ${file}`);
  }
  store.file(name, file);
}

function optionalProperties(name, file) {
  if (!fs.existsSync(file)) {
    logger.warn(
      `Optional ${name} configuration file ${file} does not exist.`,
    );
  } else {
    log(`Loading ${name} configuration name: ${file}`);
  }
  store.file(name, file);
}

if (store.get('properties:custom')) {
  requiredProperties('custom', store.get('properties:custom'));
}

if (store.get('properties:named')) {
  const namedConfig = store.get('properties:named').toLowerCase();
  const file = `${rootDirectory}/server/properties/config-${namedConfig}.json`;
  requiredProperties('named', file);
}

if (env) {
  const envConfigFile = `${__dirname}/config-${env}.json`;
  optionalProperties(`config-${env}`, envConfigFile);
} else {
  log('No environment config file specified; probably running locally');
}

const defaultConfigFile = `${__dirname}/config-default.json`;
optionalProperties('config-default', defaultConfigFile);

const buildLabelFile = `${__dirname}/build.json`;
optionalProperties('build-label', buildLabelFile);

store.defaults({
  rootDirectory,
});

log('PROPERTIES LOADED SUCCESSFULLY');

store.set('env', env || 'local');

module.exports = {
  get(key) {
    return store.get(key);
  },
  is(key) {
    const val = store.get(key);
    return val === true || val === 'true';
  },
  set(key, value) {
    store.set(key, value);
  },
  load(file) {
    log(`Loading configuration manually: ${file}`);
    store.file(file);
  },
};
