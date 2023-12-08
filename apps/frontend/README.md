# Frontend

The frontend project is a React Admin application with TypeScript and Vite. It is a single page application that consumes the BFF API.

## Setup

Install project dependencies:

```bash
yarn install
```

## Run Application (Development)

Copy and rename `.env.example` to `.env` and fill in the environment vars for the Preqin API credentials.

```bash
yarn dev
```

## Tests

// TODO: Implement unit tests

## Build

The project is built with Vite. More information can be found in the [Vite documentation](https://vitejs.dev/guide/build.html#library-mode).

```bash
yarn build
```

// TODO: Containerized build not yet implemented

## Deployment

// TODO: Deployment not yet implemented

## About React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
