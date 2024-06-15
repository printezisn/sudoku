# Sudoku

Just a simple sudoku game with the following features:

- An automatic solver for any sudoku.
- The ability to play in 3 different difficulty modes: Easy, Normal and Hard.
- The ability to play with an empty board. Pretty useful when you just want the game to solve a sudoku for you.
- The ability to switch colors while solving a sudoku. Pretty useful when you want to try something and then backtrack if it goes wrong.
- The ability to undo a single move or an entire color.

The app is implemented in Typescript (without any frameworks like React) and uses web workers to do the heavy operations (solving a sudoku and generating a new one).

## Stack

- NodeJS 20
- Typescript 5
- ESLint
- Vite
- Vitest

## How to run

1. Install NodeJS dependencies with `npm i`.
1. Create a `.env.local` file and add values for all the environment variables used. You can just copy them from the `.env.local.sample` file. Afterwards, you can change them to have the values you want.
1. Run `npm start` to start the app in development mode.
1. Visit `http://localhost:3000`.

## Other commands

- `npm run build` to build the app for production.
- `npm run preview` to run a preview of the app as it were in production (required `npm run build` first).
- `npm test` to run the tests.
- `npm run lint` to run the linter.
- `npm run format` to fix applicable linting errors.
