# The Tea Round Picker API

RESTful API service to randomly pick tea maker for the round. Store and manage members and rounds.

This project is build using NodeJS, Express and Mongoose with ES6. The purpose of the API is to allow front-end applications make HTTP calls and do CRUD actions. So this is independent service allows you to use any client.


## Getting Started

### Prerequisites
Since Babel 7 is in use to compile ES6 code, Node 8.x or later version is required. To check your Node version run:
```
node -v
```

MongoDB is required to store all project data.
```
mongod --version
```

### Installation
Clone the repo:
```
git clone git@github.com:MindeVieras/tea-picker-api.git
```

Install dependencies:
```
npm install
```

Create .env file and set environmental variables:
```
cp .env.sample .env
```

### Start Server
Production
```
npm start
```

Development
```
npm run dev
```

### Testing
Testing is done by using Mocha + Chai. This is great combination when it comes to asynchronous code testing. To run test:
```
npm test
```

### Linting
```
npm run lint
```
