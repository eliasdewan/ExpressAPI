# Nodejs, Express, Typescript Lessson-2

This is the first attempt toward learning Nodejs

initalized node , typescript - to dist
npm i express dotenv
npm i -D typescript @types/express @types/node

# Imlemented

> index
> Server
> Api router
> Book controller
> Book service
> Type apiresponse, book, bookupdate payload

## src/index : index

> dot config
> server.start()

## src/server/server : Server

- / in use (/) to apiRouter from index
- /docs in use (/docs) to swaggerui.serve .setup(output)

> app.express()
> express static private
> start() : server

- {app, config, router}

## src/api/index : Api Router

- /api/book in use (API_PREFIX + /book) to bbokrouter from bookscontrol.router
  > export Apirouter use predix/books bookcontrol router

## src/api/books/booksController : Book Controller

- '' in (get,set,post,delete) (apiPRefix) using in apiprefix

- export new Book controller { router: http handlers} (initialize)
- {router, api prefix: used in handlers (prefix, middlewere)}

## src/api/books/bookservice : Book service

- > export book service

  - book loader > loads from file

  - methods use apiresponse , Book type

  - book service uses look loader to load json to list

## mongo db

- > mongo db desktyop with compass
  - env mongodburl
  - mongoose package types
  - mongoose on server
  - mongoose. connect(url) .catch inside this app listen

## Misc

Server config types

## Auth, User , Registeruser , database

- > User Object model

  - Create and export user interface, separate interfaces for sub objects(address, profile), using compostion.
  - Include \_id: Types.ObjectId; from mongoose for database

- > Database

  - create a new interface Iuser excluding _id, iclude all the user fields fields and extend Document from mongoose import
  - create shema of Type Schema<interface exteding Document>

 > For each functionalty use dto to check
  - > Authentication controller, service, dto
  - >Register is part of **Authentication**, create authentication controller
  - export controller , import in index in /src and use register routes that server uses to pass router. router.use(controller) ( It could be just passed to the server and it could use directly)
  - Controller calls validation and service with DTO first then service 
  - the registeruserdto contains multiple dto classes and they check @validation nested and also 
  - > Authentication service exports authentication instance
  - Might store the users , but database stores 
  - ?? Check parameter of a created type with a create-user.request type? 
  - Use the database created Iuser interface from database model and create using the model. 

- > Login with dto with Login response and Auth response
