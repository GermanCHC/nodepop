#Pequeña guía de instalación proyecto de inicio

## First steps in all applications

### Install git
```Shell
mkdir appFolder
cd appFolder
git init
```

### Install Express Generator

Framework usefull to create a reference app architecture

http://expressjs.com

```Shell
npm install express-generator -g
```

### Create App
```Shell
express <appName> --ejs
```

### Install dependencies
```Shell
cd /<appFolder>/<appName>
npm install
```

### MongoDB

This application uses MongoDB. To start MongoDB you can use:
```
./bin/mongod --dbpath ./data/db --directoryperdb
```

#### Mongoose

```Shell
npm i mongoose --save
```

### Custom Helpers

Add script in package.json to run api in dev mode. To use it in all platforms add as dev dependencies cross-env

```Shell
// Install cross-env
npm i cross-env --save-dev

// That generate a dev dependency only necessary when you are developing.

// Now change package.json script 
"dev": "cross-env DEBUG=nodepop:* nodemon ./bin/www"

// After that just write and use development mode
npm run dev 

```