# Nodejs, Express, Typescript Lessson-1

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

> export new Book controller { router: http handlers} (initialize)
> {router, api prefix: used in handlers (prefix, middlewere)}

## src/api/books/bookservice : Book service

> export book service
> book loader > loads from file
> methods use apiresponse , Book type

> book service uses look loader to load json to list
