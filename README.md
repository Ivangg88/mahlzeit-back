# Mahlzeit Backend API Documentation

Welcome to the documentation for the Mahlzeit Backend API. This API provides endpoints for user registration, authentication, and managing a collection of recipes. It allows you to perform operations like creating, reading, updating, and deleting recipes. Below are the details of the available endpoints and the associated HTTP status codes.

Visit https://igarcia-mahlzeit.netlify.app/ to run this frontend project online.
<br>
<br>

## Table of Contents

- [Backend Features](#backend-features)
- [Used Packages](#used-packages)
- [API Base URL](#api-base-url)
- [Users Endpoints](#users-endpoints)
- [Songs Endpoints](#songs-endpoints)
- [Status Errors](#status-errors)
- [Available Scripts](#available-scripts)
- [Getting Started](#getting-started)

<br>

## Backend Features

- User registration and authentication.
- CRUD (Create, Read, Update(pending), Delete) operations for managing songs.
- Consistent error handling and status codes.
- Integration with MongoDB for data storage.
- Endpoint documentation for clear API usage.
- CORS configuration for controlled access.

<br>

## Used Packages

- **bcryptjs**: Library for hashing passwords securely.
- **chalk**: Provides colorized console logs for improved readability.
- **cors**: Middleware for handling Cross-Origin Resource Sharing.
- **debug**: Allows debugging and logging in the application.
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Web framework for building APIs and applications.
- **express-validation**: Middleware for request validation.
- **jsonwebtoken**: Generates and verifies JSON Web Tokens for authentication.
- **mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **morgan**: Middleware for HTTP request logging.
- **multer**: Middleware for handling file uploads.
- **mongodb-memory-server**: In-memory MongoDB server for testing.
- **supertest**: Library for testing HTTP requests.
- **typescript**: Typed programming language for enhanced development.
- **jest**: Testing framework for writing unit tests.
- **ts-jest**: TypeScript preprocessor for Jest.
- **eslint**: Linter for identifying and fixing code errors.
- **eslint-config-airbnb-base**: Airbnb's JavaScript style guide configuration.
- **eslint-config-airbnb-typescript**: Airbnb's TypeScript style guide configuration.
- **eslint-config-prettier**: Disables ESLint rules that conflict with Prettier.
- **husky**: Enables Git hooks to automate tasks before commits.

<br>

## API Base URL

The API can be accessed at: `https://mahlzeit-back-dev-qssa.1.us-1.fl0.io`

<br>

## Users Endpoints

### [POST] /users/register

This endpoint registers a new user and saves their information in the database.

**Status**: 201 Created

### [POST] /users/login

This endpoint allows a user to log in and generates a token for authentication.

**Status**: 200 OK

## Recipes Endpoints

### [GET] /reciptes/getAll

This endpoint retrieves an array containing all the recipes from the database.

**Status**: 200 OK

### [GET] /reciptes/:id

This endpoint retrieves details of a specific recipe from the database based on its ID.

**Status**: 200 OK

### [POST] /reciptes/create

This endpoint receives recipe information (excluding ID), creates the recipe in the database, and returns the newly created recipe
.

**Status**: 201 Created

### [DELETE] /reciptes/delete

This endpoint deletes a recipe from the database based on its ID and returns a message:"Recipe has been succesfully deleted".
The id must be given as param: {id:"id to delete"}.

**Status**: 201

<br>

## Status Errors

- **400**: Bad Request
- **404**: Not Found
- **409**: Conflicts
- **500**: Internal Server Error

<br>

## Available Scripts

In the project directory, you can run:

- `npm run ts` : Compiles the code and creates the folder dist.
- `npm run ts:dev` : Compiles the code and creates the folder dist in a dev mode, watch mode is on.
- `npm start`: Runs the backend server.
- `npm run start:dev`: Runs the backend server with nodemon for development.
- `npm test`: Runs tests using Jest.
- `npm jest-coverage`: Generates test coverage report.

  <br>

## Getting Started

To run the backend locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file with required environment variables found in `.env.example`.
4. Compile the code using ` npm run ts` or `npm run ts:dev`.
5. Run the server using `npm start` or `npm run start:dev`.
