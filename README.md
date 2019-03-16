# Custom-Env

Custom env is a library built to make development more feasible by allowing multiple .env configurations for different environments. This is done by loading environment variables from a .env._envname_ file, into the node's `process.env` object.

## Installation

`npm install custom-env`

## Usage

Place this at the top of your application

```// Default configuration
require('custom-env').env()
```

This by default loads configuration from the `.env` file and assumes the app is in development enviroment mode.

Create a `.env` file in your app's root directory and add the environment variables each on new line:

```
APP_ENV=dev
DB_HOST=localhost
DB_USER=root
DB_PASS=root
```

Simple! The `process.env` is now loaded with the environment variables above.

### Example

```
console.log(process.env.APP_ENV)
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)
```

### Expected Output

```
dev
localhost
root
root
```

If you want to load from a particular environment, use:

```
// This loads configuration from staging environment
require('custom-env').env('staging')
```

Create a `.env.staging` file in your app's root directory and add the environment variables each on new line:

```
APP_ENV=staging
DB_HOST=localhost
DB_USER=root
DB_PASS=root
```

The `process.env` is now loaded with the environment variables above.
Try it out:

```
NODE_ENV=staging node index.js
```

### Example

```
console.log(process.env.APP_ENV)
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)
```

### Expected Output

```
staging
localhost
root
root
```

## Loading from the current environment

You can load configuration from the current environment with custom-env, just pass first argument of the `env()` method as `true` (note: this must be a type Boolean type `true`) and that's all:

```
// This Loads the configuration dynamically from to the current enviroment
// Defaults to _dev_ if the environment was set
require('custom-env').env(true)
```

## The `env()` method

The `env()` method holds two (2) optional arguments `envname`, `path` which defaults to _dev_ and _current working directory_ respectively. If you wish to set a different path rather than the _current working directory_, pass your path as the second argument of the `env()` method.

```
require('custom-env').env('dev', 'path/to/custom/path')
```

## Are you a dotenv fan?
Wow! If you are already familiar with the popular [`dotenv`](https://github.com/motdotla/dotenv) library and you still want to set the custom `config`, you are good to go as `custom-env` also provides a public method that directly loads the `dotenv`'s `config` method. Try it out:

```
// Load custom-env and set configurations from dotenv
var custom_environments = require('custom-env')

// Set the environment to load
custom_environments.env(process.env.NODE_ENV)

// Set dotenv's config
custom_environments.dotenvConfig({'path':process.cwd(), 'encoding':'utf8'})
```

You can also leverage the [`dotenv-expand`](https://github.com/motdotla/dotenv-expand) extension to use ENV variable expansion inside your `.env` files.

For example:

```
IP=127.0.0.1
PORT=1234
APP_URL=http://${IP}:${PORT}
```

Using the above example `.env` file, `process.env.APP_URL` would be `http://127.0.0.1:1234`.

## Chaining

Every public method of custom-env returns itself, making it possible to chain methods. Example:

```
// Chain the methods
require('custom-env').env('dev').dotenvConfig({'encoding':'utf8'})
```
### What about .env.production?
We strongly recommend that you should not commit and pass `.env.production` file in production mode, as this file may contain sensitive information.

## Github Repo
[https://github.com/erisanolasheni/custom-env](https://github.com/erisanolasheni/custom-env)
