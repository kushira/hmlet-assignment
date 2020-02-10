## Pre-requisites
> - install node version 12.0.0 or above (LTS preferred).
> - running instance of Mongo DB 3.6 or above.

## How to run

> - npm install
> - npm start

Application should be available on port 3000

## How to test

> - npm install
> - npm test

## Configurations

Following configurations will be used from environment, if unavailable it will use default values

CONFIG_NAME : default value : description

> PORT : 3000 : HTTP port for application
>
> DB_URL : mongodb://localhost:27017/hmlet : Database URL
>
> FILE_PATH : ./store : file save path
>
> FILE_UPLOAD_PATH : ./uploads : file uploads temporary save path
>
> JWT_SHARED_SECRET : shared-secret : JWT shared secret

## Some TODO

- Upload file size and dimensions should be validated.
- There is no identify information being used in JWT token, 
at this point it serves the purpose of sys to sys authentication only.
- Unit test does not clean up the data created and files uploaded.
- No Logger
- Mongoose auto indexing should be disabled in production.
- When fetching data from DB, Mongoose lean operation should be used where applicable.
- 