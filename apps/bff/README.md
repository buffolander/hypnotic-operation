# Backend for Frontend BFF

The BFF serves as an abstraction layer between the frontend and the Preqin API.

It's an Node.js with TypeScript application. The Express server leverages [tsoa](https://github.com/lukeautry/tsoa) for generating OpenAPI docs from code.

API specs can be found under `generated/tsoa/spec/swagger.json`.

// TODO: serve the API specs at `/api-docs` endpoint

## Setup

Install project dependencies:

```bash
yarn install
```

// TODO: Hot reloading with Nodemon not yet implemented

## Tests

Unit tests setup with Jest. Prefer placing your tests in the same directory as the module they are testing instead of a separate `__tests__` directory.

Run unit tests:

```bash
yarn test:unit
```

// TODO: Improve unit test coverage

// TODO: Integration tests not yet implemented

## Build

The project is built with Esbuild. The build script will output the compiled code to `dist/index.js`.

Build options can be modified in `scripts/build-esbuild.ts`.

```bash
yarn build
```

// TODO: Containerized build not yet implemented

## Run Application

Copy and rename `.env.example` to `.env` and fill in the environment vars for the Preqin API credentials.

```bash
yarn start
```

## Deployment

// TODO: Deployment not yet implemented
