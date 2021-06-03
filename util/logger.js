/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
const path = require('path');
const log4js = require('log4js');

const globalLogger = log4js.getLogger('logger');
const util = require('util');
const _ = require('lodash');
const mkdirp = require('mkdirp');
const config = require('../properties/config');

let internalLogger = null;

function workerAppender() {
  return (loggingEvent) => {
    process.send({
      log: loggingEvent,
    });
  };
}

const logConfig = config.get('logging');
const logDir = path.resolve(process.cwd(), logConfig.directory);

mkdirp.sync(logDir);

const log4jsConfig = {
  loggers: _.clone(logConfig.loggers),
  appenders: logConfig.appenders,
  categories: logConfig.categories,
};

// initalize logging on startup
log4js.configure(log4jsConfig, {});
if (config.is('logging:clustered')) {
  log4js.addAppender(workerAppender());
}

// set global logging level
const globalLogLevel = logConfig.loggers.global;

internalLogger = log4js.getLogger('internals');
internalLogger.info(`Setting logging level to ${globalLogLevel}`);

class Logger {
  constructor(name, forFile) {
    this.loggerName = name;
    if (forFile) {
      this.loggerName = 'app';
      this.module = path.relative(process.cwd(), name);
    }
    this.logger = log4js.getLogger(this.loggerName);

    const level = config.get(`logging:loggers:${this.loggerName}`);
    if (level) {
      globalLogger.trace(`Setting log config for ${name} to ${level}`);
    }

    globalLogger.trace(`Configured logger for ${this.loggerName}`);
  }

  _convertArgs(args) {
    const argsNew = Array.prototype.slice.call(args);
    const strArgs = argsNew.map((a) => {
      if (_.isString(a)) {
        return a;
      } if (_.isObject(a) && a instanceof Error) {
        return a.stack;
      }
      return util.inspect(a);
    });
    return strArgs.join(' - ');
  }

  _wrap(logEntry, addTrace) {
    const strArgs = [logEntry];
    if (this.module) {
      strArgs.unshift(`[${this.module}]`);
    }
    if (addTrace) {
      const obj = {};
      Error.captureStackTrace(obj, this.trace);
      strArgs.push(`\nSTACK TRACE\n${obj.stack}`);
    }
    return strArgs.join(' ');
  }

  table(objs) {
    let tbl = '\n';
    if (_.isArray(objs)) {
      const keys = _.keys(objs[0]);
      const width = Math.floor(100 / keys.length);

      const headers = _.map(keys, (key) => {
        return _.str.pad(key, width, ' ', 'right');
      });

      tbl += `${headers.join(' | ')}\n`;
      tbl += _.str.pad('\n', 110, '-');

      tbl += _
        .map(objs, (item) => {
          return _(item)
            .pick(keys)
            .values()
            .map((val) => {
              return _.str.pad(val, width, ' ', 'right');
            })
            .join(' | ');
        })
        .join('\n');
    }
    return tbl;
  }

  audit(...args) {
    this.logger.info(...args);
  }

  log(...args) {
    this.logger.log(...args);
  }

  info(...args) {
    this.logger.info(this._wrap(this._convertArgs(args)));
  }

  infoFormat(...args) {
    this.logger.info(this._wrap(util.format.apply(this, args)));
  }

  error(...args) {
    this.logger.error(this._wrap(this._convertArgs(args)));
  }

  warn(...args) {
    this.logger.warn(this._wrap(this._convertArgs(args)));
  }

  trace(...args) {
    this.logger.trace(this._wrap(this._convertArgs(args), true));
  }

  debug(...args) {
    if (!process.env.TESTING) {
      // don't include info logs in testing
      this.logger.debug(this._wrap(this._convertArgs(args)));
    }
  }

  isLevelEnabled(...args) {
    return this.logger.isLevelEnabled(...args);
  }
}

module.exports = {
  // the default, this expects the __filename to be passed
  // to generate a relative-path named logger
  getLogger(file, forFile = true) {
    return new Logger(file, forFile);
  },

  // this is for system-level functionality that we want
  // special log categories for, like "express" or "mongoose"
  getNamedLogger(name) {
    return new Logger(name, false);
  },

  getExpressMiddleware() {
    const logger = log4js.getLogger('http');
    return log4js.connectLogger(logger, {
      level: 'auto',
    });
  },
};
