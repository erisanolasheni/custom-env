/*
 * This library wraps the popular node dotenv module
 * For it's configuration
 *
 */

var fs = require('fs')
var path = require('path')

var NODE_ENV = process.env.NODE_ENV

function main(env = null, dir = null, encoding = null) {
    this.env = env
    this.dir = dir
    this.encoding = encoding

    this.customEnvConfig = {
        dir: this.dir,
        envname: this.env
    }

    this.configDotEnv = {
        path: null,
        encoding: this.encoding
    }

    this.setCustomEnvConfig = function (obj) {
        // var dir = typeof (dir) == 'string' ? dir : process.cwd()
        // var envname = envname
        if (obj != null) {
            if (obj && typeof obj == 'object' && obj.constructor.name.toLowerCase() == 'object' && Object.keys(obj).length > 0) {
                for (var v in obj) {
                    this.customEnvConfig[v] = obj[v]
                }
            }
        }
    }

    this.getCustomEnvConfig = function () {
        return this.customEnvConfig
    }


    this.setDotEnvConfig = function (obj = null) {
        if (obj != null) {
            if (typeof obj == 'object' && obj.constructor.name.toLowerCase() == 'object') {
                for (var v in obj) {
                    this.configDotEnv[v] = obj[v]
                }
            }
        }
    }

    this.getDotEnvConfig = function () {
        return this.configDotEnv
    }

    this.getEnvFile = function (dir, envname = null) {
        // Check if dir exists and its a directory
        var dir = typeof (dir) == 'string' ? dir : process.cwd()
        envname = typeof (envname) == 'string' ? envname : envname === true && process.env.NODE_ENV ? process.env.NODE_ENV : false


        var dirIsDirectory = fs.lstatSync(dir).isDirectory()

        if (!dirIsDirectory) {
            throw new Error('dir must be a directory')
            return false
        }


        var filesInDir = fs.readdirSync(dir)

        // console.log(filesInDir)

        if (Array.isArray(filesInDir) && filesInDir.length > 0) {
            if (envname) {
                if (envname == 'dev') {
                    var envRegex = "\.env(\.dev)?$"
                } else {
                    var envRegex = "\.env\." + envname + "$"
                }

            } else {
                var envRegex = "\.env$"
            }

            for (var file of filesInDir) {
                if (new RegExp(envRegex).test(file)) {
                    return path.join(dir, file)
                }
            }

            // throw new Error("env files not present in directory " + dir)
            console.warn("No env file present for the current environment: ", process.env.NODE_ENV)
            return false
        } else {
            // throw new Error("env files not present in directory " + dir)
            console.warn("No env file present for the current environment: ", process.env.NODE_ENV)
            return false
        }
    }


    this.loadDotEnvConfig = function () {
        var dotenvobj = this.getDotEnvConfig()

        if(dotenvobj.path) {
            require('dotenv-expand')(require('dotenv').config(dotenvobj));
        }
    }


    this.loadCustomDotEnv = function () {
        // setTheCustomEnv
        this.setCustomEnvConfig(this.dir, this.env)

        var currentCustomEnvConfig = this.getCustomEnvConfig()
        // Set and load dotenv
        this.setDotEnvConfig({
            'path': this.getEnvFile(currentCustomEnvConfig.dir, currentCustomEnvConfig.envname)
        })


        // Start dotenv with the available settings
        this.loadDotEnvConfig()

    }

    this.loadCustomDotEnv()
}

// Create a new constructor to make some properties available

var pubLicMain = new Object()

module.exports = {
    env: function () {
        this.main = new main(arguments[0], arguments[1])
        if (arguments[2] === true) {
            this.main.setCustomEnvConfig({
                'envname': process.env.NODE_ENV
            })
        }
        return this
    },
    dotenvConfig: function () {
        this.main.setDotEnvConfig(...arguments)
        return this
    },
    config: function () {
        this.main.setCustomEnvConfig(...arguments)
        return this
    }
}
