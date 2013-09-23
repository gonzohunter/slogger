# Logger will pickup global.logger.config
global.config =
    logger:
        level: 'info'
        handleExceptions: false

# Global config can be overriden with each logger
logger = require('../src/slogger')({name: __filename, level: 'debug', handleExceptions: false})
logger.debug('debug message')
logger.info('info message')
logger.warn('warn message')
logger.error('error message')