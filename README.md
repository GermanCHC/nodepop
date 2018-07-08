# Nodepop

Api developed in order to do training with Node for an api.

This api has been developed on the assumption that it would serve applications to sell second-hand items.

## Install

### Install dependencies
```Shell
cd /nodepop
npm install
```


### Mongodb

This application uses MongoDB. To start MongoDB you can use the following command from the mongo folder:

```shell
./bin/mongod --dbpath ./data/db --directoryperdb
```

#### Mongoose

```Shell
npm i mongoose --save
```

#### Load Demo Data

This command load or delete and load demo data

```Shell
npm run loadData
```

## Development

To start the application in development mode use:

```shell
npm run dev
```

## API Documentation

### Authentication

To obtain a token make a POST to: /apiv1/users/login with email & password

To get answers in your language(actualy English or Spanish) you have to send also localeCODE with 'en' for english or 'es' for spanish. Default is going to be english in the case localCODE is not provided.

Use that token inthe rest of request in:
  - header: 'x-access-token'
  - body: token
  - query string: token

The first Users are load automatically with the file usersDemoData.json that is in lib folder.

### Classifieds

To get classifieds you can use:

```shell
http://localhost:3000/apiv1/classifieds
```

To paginate results you can add to previos url:

```shell
?skip=1&limit=3
```

To choose only some fields:
```shell
&fields=name=name%20sell=false
```
When you fill fields you always get objects without id. 

To get the list of tags you have to call the url with a security token:
```shell
http://localhost:3000/apiv1/classifieds/tags?token=XXXXXXXXXXX
```

To get the photos from classifieds you have to call:
```shell
ej:

http://localhost:3000/public/images/classifieds/iphone.jpg
```
### Users

You can only add users. You have to post user with x-www-form-urlencoded passing:
name, email and password to the next url.

```shell
http://localhost:3000/apiv1/users
```
