# hypnotic-operations

The project hosts an application that interacts with the Preqin API. It's composed of a React frontend and a BFF service written in Node.js with Typescript.

It uses yarn workspaces to manage multiple applications in the same repository.

BFF docs: [apps/bff/README.md](apps/bff/README.md) 

Frontend docs: [apps/frontend/README.md](apps/frontend/README.md)

## Setup & Run

```bash
# install dependencies
yarn install

# build all applications
yarn build:all

# start frontend and bff
yarn start:all
```

// TODO: Create base interface and extensions for each AssetClass on BFF

// TODO: Create distinct list components for each AssetClass on Frontend

// TODO: Add a diagram of the architecture

// TODO: Containerize applications

// TODO: Add docker-compose file to run the project locally
