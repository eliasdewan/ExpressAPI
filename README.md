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

  - create a new interface Iuser excluding \_id, iclude all the user fields fields and extend Document from mongoose import
  - create shema of Type Schema<interface exteding Document>

> For each functionalty use dto to check

- > Authentication controller, service, dto
- > Register is part of **Authentication**, create authentication controller
- export controller , import in index in /src and use register routes that server uses to pass router. router.use(controller) ( It could be just passed to the server and it could use directly)
- Controller calls validation and service with DTO first then service
- the registeruserdto contains multiple dto classes and they check @validation nested and also
- > Authentication service exports authentication instance
- Might store the users , but database stores
- ?? Check parameter of a created type with a create-user.request type?
- Use the database created Iuser interface from database model and create using the model.

- > Login with dto with Login response and Auth response
- env JWT_SECRET generatorscript
- `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

# Changes made, updated for one model

- > User.ts nesting all items as database schema
- Removed unused inteface User, to replace with BaseUser without \_id and Types mongoose import
- > Register-user request doesnt have salt and follwows BaseUser format
- > Register-user DTO follows the same nesting format as BaseUser
- > User schema uses BaseUser and can also use User with \_id . UserDocument extends BaseUser

# Extra added

- > Auth controller uses the validator method with loginDto
- > registerUser uses userExist method to check if username or email alaready exists

# Consider username and email lowercase

# Schema design

- > for referenced schema
- UserDocument/UserPopulatedDocument -> UserBaseDocument -> { Mongoose.Document, User }
- > for non referenced schema
- UserDocument -> { Mongoose.Document, User }.
- main **User** interface with basics user with types, optional and maaybe with union types too
- converted to types for mongoose specific funtions, types\<Array> are also auto initailized , dont need optional
- a **BaseUserDocument** extends document and user. _VIRTUAL_ and _METHODS_
  - they Array<> and Map<> of user are converted to to Types.Arraay<> or map .
  - schema creted from this or extension of this must implemnts its virtual and methods
  - **UserDocument** extends BaseUserDocument with narrowed if union.
    - Create separeate userdocument interface for other union type narrowing
  - **UserModel** extends Model\<UserDocumnet> for the _statics_
- export default model\<UserDocument, UserModel>("User", UserSchema)
- userdocument for correct return type of user document instead of document and user model to identify methods
## schema = Schema<UserDocument, UserModel>

- pre\<UserDocument>('fn name', function) . so both userdocument and userdocument populated can be used
- post\<Query<UserDocument, UserDocument>>('fn name', function) - for query type st

# Special piece relational

https://gist.github.com/WangHansen/f23f70b758bb9f38fc68414c809e765f#file-userschema-ts
https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1

- {type: Schema.Types.ObjectId, ref: "Company", required: true} reference to say this id references to an item in company collection.
- in the interface use Types.ObjectId | Record<string, unknown>; to allow to use in two schenarios
  - where you want just the id, maybe in **UserDocument** extending from base user document
  - or you can have the attribute with a string key and value as {object from another schemaa?} in **UserDocumentPopulate**
  - call a method that calls: return Promise/<UserDocumentPopulate> in model
  - async function takes two parameters (this: Model<UserDocument>, id: string) , just need id as this is present
  - returns this.findById(id).populate("collection").exec()
  - generics is used so the model can extend userdocument and have a return type of userfocument populated for function generiic

# sub schema. Do not inherit document for sub schema 
> use top level interface to extend