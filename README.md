# Battleship :ship: :anchor: :dart:

[![Workflow](https://github.com/AnthonyMazzie/Battleship/actions/workflows/battleshipPipeline.yml/badge.svg)](https://github.com/AnthonyMazzie/Battleship/actions/workflows/battleshipPipeline.yml)
[![codecov](https://codecov.io/gh/AnthonyMazzie/Battleship/graph/badge.svg?token=rDwCqn7cLr)](https://codecov.io/gh/AnthonyMazzie/Battleship)

## Overview

Welcome to Battleship! This project is a simplified implementation of the classic Battleship game. In this game, you'll have the opportunity to play against a computer opponent.

Key features of this Battleship implementation include:

- A 10x10 game board for strategic gameplay.
- A set of ships with varying lengths for added challenge.
- The ability for players to strategically place their ships on the board.
- Turn-based gameplay where you and the computer opponent take alternating shots.
- Real-time updates to the grid and ship components based on successful attacks.
- A clear indication of the winner when all ships of a player have been sunk.

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Helpful Commands](#helpful-commands)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Getting Started

### Prerequisites

Before you start playing Battleship, make sure you have the following prerequisites installed on your system:

- **Node.js**: Battleship is built with Node.js, so you'll need it to run the development server and build scripts.

If you don't have Node.js installed, you can download and install it from the [official website](https://nodejs.org/en/).

Once you have Node.js installed, follow these steps to set up and run the game:

```bash
# Clone the repository to your local machine
$ git clone https://github.com/AnthonyMazzie/Battleship.git

# Navigate to the project directory
$ cd Battleship

# Install project dependencies
$ npm install

# Start the development server
$ npm run dev
```

After the development server starts, open [http://localhost:3000](http://localhost:3000) with your browser to play the game.

---

### Helpful commands

```bash
# Run tests to ensure everything is working correctly
$ npm run test

# Format and lint code for consistent and clean codebase
$ npm run lint
$ npx prettier --check .
$ npx prettier --write .
```

---

## Technologies Used

This Battleship game is built using several modern web technologies and libraries. Key technologies include:

- [Node.js](https://nodejs.org/en): The JavaScript runtime used to run the development server and build scripts.
- [Next.js](https://nextjs.org/): A powerful React framework that enables functionality such as server-side rendering and generating static websites for React based web applications.
- [React.js](https://react.dev/): A JavaScript library for building user interfaces, known for its efficient and flexible way of building component-based applications.
- [TypeScript](https://www.typescriptlang.org/): A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [Jest](https://jestjs.io/): A delightful JavaScript testing framework, known for its simplicity and efficiency. Jest offers fast, interactive testing with minimal setup, ideal for React and TypeScript projects.
- [React DnD](https://react-dnd.github.io/react-dnd/about): A set of React utilities to help you build complex drag and drop interfaces while keeping components decoupled.
- [Material-UI](https://mui.com/): A popular React UI framework that provides a robust set of components for building intuitive user interfaces.
- [Prettier](https://prettier.io/) is an opinionated code formatter that enforces a consistent coding style. It helps maintain clean and readable code by automatically formatting your files according to a predefined code style.

---

## License

This project is open-source and is available under the [MIT License](LICENSE). The MIT License is a permissive open-source license that allows you to use, modify, and distribute the code for both personal and commercial purposes. Please review the [LICENSE](LICENSE) file for more details.

Feel free to contribute to this project, report issues, or use it in your own projects.

---
