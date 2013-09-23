moment = require('moment')

LEVELS =
    trace: 0
    debug: 10,
    info: 20,
    warn: 30,
    error: 40

defaultConfig =
    level: 'debug'
    handleExceptions: false
    json: false
    timestamp: true

globalLoggerConfig = if global.config and global.config.logger then global.config.logger else defaultConfig

class Logger

    constructor: (localConfig) ->
        @name = localConfig.name || globalLoggerConfig.name || module.parent.filename
        @level = localConfig.level ? globalLoggerConfig.level
        @handleExceptions = localConfig.handleExceptions ? globalLoggerConfig.handleExceptions
        @json = localConfig.json ? globalLoggerConfig.json
        @timestamp = localConfig.timestamp ? globalLoggerConfig.timestamp

        @prefix = if @name then @name + " - " else " "

        if @handleExceptions
            @handleUncaughtExceptions()

    trace: (msg, metaData) ->
        if @shouldLog(LEVELS.trace) then @log(@buildMessage('TRACE', msg), metaData)

    debug: (msg, metaData) ->
        if @shouldLog(LEVELS.debug) then @log(@buildMessage('DEBUG', msg), metaData)

    info: (msg, metaData) ->
        if @shouldLog(LEVELS.info) then @log(@buildMessage('INFO', msg), metaData)

    warn: (msg, metaData) ->
        if @shouldLog(LEVELS.warn)
            logMsg = @buildMessage('WARN', msg)
            @logError(logMsg, metaData)

    error: (msg, metaData) ->
        if @shouldLog(LEVELS.error)
            logMsg = @buildMessage('ERROR', msg)
            @logError(logMsg, metaData)

    shouldLog: (level) ->
        return level >= LEVELS[@level]

    buildMessage: (levelStr, msg) ->
        if @json
            return {
                timestamp: moment().toJSON(),
                level: levelStr,
                message: msg
            }

        if @timestamp
            "#{moment().format()} #{levelStr} #{@prefix}#{msg}"
        else
            "#{levelStr} #{@prefix}#{msg}"

    log: (msg, metaData) ->
        if metaData
            console.log(msg, metaData)
        else
            console.log(msg)

    logError: (msg, metaData) ->
        if metaData
            console.error(msg, metaData)
        else
            console.error(msg)

    handleUncaughtExceptions: () ->
        @debug('handling Uncaught Exceptions')
        process.on('uncaughtException', (err) ->
            console.error(error)
        )


module.exports = (config) ->
    return new Logger(config)



