// Generated by CoffeeScript 1.6.3
(function() {
  var LEVELS, Logger, defaultConfig, globalLoggerConfig;

  LEVELS = {
    trace: 0,
    debug: 10,
    info: 20,
    warn: 30,
    error: 40
  };

  defaultConfig = {
    level: 'trace',
    handleExceptions: false,
    json: false
  };

  globalLoggerConfig = global.config && global.config.logger ? global.config.logger : defaultConfig;

  Logger = (function() {
    function Logger(localConfig) {
      this.name = localConfig.name || globalLoggerConfig.name || module.parent.filename;
      this.level = localConfig.level || globalLoggerConfig.level;
      this.handleExceptions = localConfig.handleExceptions || globalLoggerConfig.handleExceptions;
      this.json = localConfig.json || globalLoggerConfig.json;
      this.prefix = this.name ? this.name + " - " : " ";
      if (this.handleExceptions) {
        this.handleUncaughtExceptions();
      }
    }

    Logger.prototype.trace = function(msg, metaData) {
      if (this.shouldLog(LEVELS.trace)) {
        return this.log(this.buildMessage('TRACE', msg), metaData);
      }
    };

    Logger.prototype.debug = function(msg, metaData) {
      if (this.shouldLog(LEVELS.debug)) {
        return this.log(this.buildMessage('DEBUG', msg), metaData);
      }
    };

    Logger.prototype.info = function(msg, metaData) {
      if (this.shouldLog(LEVELS.info)) {
        return this.log(this.buildMessage('INFO', msg), metaData);
      }
    };

    Logger.prototype.warn = function(msg, metaData) {
      var logMsg;
      if (this.shouldLog(LEVELS.warn)) {
        logMsg = this.buildMessage('WARN', msg);
        return this.logError(logMsg, metaData);
      }
    };

    Logger.prototype.error = function(msg, metaData) {
      var logMsg;
      if (this.shouldLog(LEVELS.error)) {
        logMsg = this.buildMessage('ERROR', msg);
        return this.logError(logMsg, metaData);
      }
    };

    Logger.prototype.shouldLog = function(level) {
      return level >= LEVELS[this.level];
    };

    Logger.prototype.buildMessage = function(levelStr, msg) {
      if (this.json) {
        return {
          level: levelStr,
          message: msg
        };
      } else {
        return "" + levelStr + " " + this.prefix + msg;
      }
    };

    Logger.prototype.log = function(msg, metaData) {
      if (metaData) {
        return console.log(msg, metaData);
      } else {
        return console.log(msg);
      }
    };

    Logger.prototype.logError = function(msg, metaData) {
      if (metaData) {
        return console.error(msg, metaData);
      } else {
        return console.error(msg);
      }
    };

    Logger.prototype.handleUncaughtExceptions = function() {
      this.debug('handling Uncaught Exceptions');
      return process.on('uncaughtException', function(err) {
        return console.error(error);
      });
    };

    return Logger;

  })();

  module.exports = function(config) {
    return new Logger(config);
  };

}).call(this);