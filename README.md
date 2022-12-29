## Description

[Flooz] code challenge.
<br>
<br>
[Criterias]:

- The service does not have any security in place when it comes to API authentication.
- We do want to build the service in an as highly available manner as possible.
- We want to be able to specify token addresses as well as the balance threshold for
  each token we want to use when classifying a wallet.
- This last part is really important to be kept flexible as we might have frequent changes
  both on the tokens as well as the thresholds.
- Any user can call the API providing their wallet address and receive a list of
  classifications one for each token we have preset.

## Installation

```bash
$ npm install
```

Set the environment variables:

```
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

run docker container in development mode

```
docker-compose up -d
```

### Swagger

[Swagger link](http://localhost:3000/swagger/#/Classification/ClassificationController_Classify)

## Stay in touch

- Author - [Victor Jonah](https://www.github.com/Vectormike)
