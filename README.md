# The Tea Round Picker API


RESTful API service to randomly pick tea maker for the round, store and manage members and rounds.

This API is build using NodeJS, Express and MongoDB, written in ES6 and compiled using Babel. The purpose of the API is to allow front-end applications make HTTP calls and do CRUD actions.

MongoDB model includes two collections:
 - **members**: saves all member data and later can be used for requesting /api/rounds/picker endpoint with participants list to get random tea maker.
 - **rounds**: when /api/rounds/picker is requested with supplied participants list, round is saved to database for later preview. Rounds cannot be edited or created via endpoint.

Key aspects of the API are:
	 - create, read, update and delete members on database
	 - read and delete rounds from database
	 - get random tea maker from given participants list

## Getting Started

### Prerequisites
Since Babel 7 is in use to compile ES6 code, Node 8.x or later version is required. To check your Node version run:
```sh
node -v
```
MongoDB is required to store all project data.
```sh
mongod --version
```

### Installation
Clone the repo:
```sh
git clone git@github.com:MindeVieras/tea-picker-api.git
```
Install dependencies:
```sh
npm install
```
Create .env file and set environmental variables:
```sh
cp .env.sample .env
```

### Start Server

**Production**
```sh
npm start
```
**Development**
```sh
npm run dev
```
**Note**: When starting locally - server should be running on http://localhost:3000 unless you set different host or port in .env file.

### Build production
```sh
npm run build
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

# API Documentation

## Response structure

Examples of how general JSON response model looks.

### Success Response

**Code** : `200 OK`
**Content example** : When response success:

```json
{
    "status": 200,
    "message": "OK",
    "data": {
		"_id": "5c55e4cdad2e7e52c05b36ad",
        "name": "Joe Go",
        "name_lc": "joe go",
        "email": "jg@test.com",
        "createdAt": "2019-02-02T18:43:25.929Z"
	}
}
```

### Error Response

**Code** : `404 Not found`
**Content example** : API not found error:
```json
{
    "status": 404,
    "message": "API not found"
}
```

**Code** : `422 Unprocessable Entity`
**Content example** : Client input errors:
```json
{
    "status": 422,
    "message": "Input error",
    "errors": {
        "name": "Member name is required",
        "email": "Email must be valid"
    }
}
```

**Code** : `500 Internal server error`
**Content example** : Server error:
```json
{
    "status": 500,
    "message": "Internal server error"
}
```

# Members

## Get all members

Get list of members.

**URL** : `/api/members`

**Method** : `GET`

  
### Success Response

**Code** : `200 OK`

**Content example** : In this example, the API returns array of members:

```json
{
    "status": 200,
    "message": "OK",
    "data": [
        {
            "_id": "5c55e4cdad2e7e52c05b36ad",
            "name": "Joe Go",
            "name_lc": "joe go",
            "email": "jg@test.com",
            "createdAt": "2019-02-02T18:43:25.929Z"
        },
        {
            "_id": "5c55bddb08bc813f96a0d6b4",
            "name": "John E",
            "name_lc": "john e",
            "email": "",
            "createdAt": "2019-02-02T15:57:15.111Z"
        }
    ]
}
```

## Create member

Create new member if member name does not already exist. Each member can also have optional email.

**URL** : `/api/members`

**Method** : `POST`

**Data example**: Name field is required and must be not in use. Email field is optional:

```json
{
    "name": "Test Member",
    "email": "example@example.com"
}
```

### Success Response

**Code** : `201 CREATED`

**Content example**:

```json
{
    "status": 201,
    "message": "Created",
    "data": {
        "_id": "5c57787772057e5dbf77b48d",
        "name": "Test Member",
        "email": "example@example.com",
        "name_lc": "test member",
        "createdAt": "2019-02-02T20:25:43.695Z"
    }
}
```

### Error Response

**Condition** : If provided data is invalid, e.g. a name field is empty or email is invalid.

**Code** : `422 Unprocessable Entity`

## Update member

Update member details - name and email.

**URL** : `/api/members/:id`

**Method** : `PUT`

**Data example** : Name field is required and must be not in use. Email field is optional:

```json
{
    "name": "Test Member",
    "email": "example@example.com"
}
```

### Success Responses

**Code** : `200 OK`

**Content example**:

```json
{
    "status": 200,
    "message": "OK",
    "data": {
        "_id": "5c57787772057e5dbf77b48d",
        "name": "Test Member",
        "email": "example@example.com",
        "name_lc": "test member",
        "createdAt": "2019-02-02T20:25:43.695Z"
    }
}
```

### Error Response

**Condition** : If provided data is invalid, e.g. a name field is empty or email is invalid.

**Code** : `422 Unprocessable Entity`

## Get one member

Get single member.

**URL** : `/api/members/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the member on the
mongo.

### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": 200,
    "message": "OK",
    "data": {
        "_id": "5c57787772057e2dbf77b48d",
        "name": "Test Member",
        "email": "example@example.com",
        "name_lc": "test member",
        "createdAt": "2019-02-01T20:25:43.695Z"
    }
}
```

### Error Response

**Condition** : If member not found by given ID.

**Code** : `404 Not found`

## Delete member

Delete member from database.

**URL** : `/api/members/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the member on the
mongo.

**Method** : `DELETE`

### Success Response

**Code** : `200 OK`

**Content example**: Deleted member object:

```json
{
    "status": 200,
    "message": "OK",
    "data": {
        "_id": "5c57787772057e2dbf77b48d",
        "name": "Test Member",
        "email": "example@example.com",
        "name_lc": "test member",
        "createdAt": "2019-02-01T20:25:43.695Z"
    }
}
```

### Error Response

**Condition** : If member not found by given ID.

**Code** : `404 Not found`

# Rounds


## Get tea round picker

Get random tea maker.

**URL** : `/api/rounds/picker`

**Method** : `POST`

**Data example** Participants field as an array with list of members. 

```json
{
    "participants": ["Test member", "Name Example"]
}
```
  
### Success Response

**Code** : `200 OK`

**Content example** : In this example, the API returns round object with makerName field which is member name that goes and makes tea:

```json
{
    "status": 200,
    "message": "OK",
    "data": {
        "_id": "5c5783c6025f2a7de46ede30",
        "makerName": "MindeV.",
        "participants": [
            "MindeV.",
            "Test Member"
        ],
        "createdAt": "2019-02-01T10:13:58.517Z"
    }
}
```

### Error Response

**Condition** : If provided data is invalid, e.g. participants field is empty.

**Code** : `422 Unprocessable Entity`


## Get all rounds

Get list of rounds.

**URL** : `/api/rounds`

**Method** : `GET`

  
### Success Response

**Code** : `200 OK`

**Content example** : In this example, the API returns array of rounds:

```json
{
    "status": 200,
    "message": "OK",
    "data": [
        {
            "_id": "5c55e0ff08bc813f96a0d6c8",
            "makerName": "John E",
            "participants": [
                "John E",
                "Test member",
                "Minde Vieras"
            ],
            "createdAt": "2019-02-02T18:27:11.970Z"
        },
        {
            "_id": "5c55e0ba08bc813f96a0d6c5",
            "makerName": "Test member",
            "participants": [
                "John E",
                "Test member",
                "Minde Vieras"
            ],
            "createdAt": "2019-02-02T18:26:02.513Z"
        }
    ]
}
```

## Delete round

Delete round from database.

**URL** : `/api/rounds/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the round on the
database.

**Method** : `DELETE`

### Success Response

**Code** : `200 OK`

**Content example**: Return deleted round:

```json
{
    "status": 200,
    "message": "OK",
    "data": {
        "_id": "5c36c5f6041bcf5656a4b945",
        "makerName": "Joe Go",
        "participants": [
            "James Dav",
            "Joe Go"
        ],
        "createdAt": "2019-02-03T10:44:06.726Z"
    }
}
```

### Error Response

**Condition** : If round not found by given ID.

**Code** : `404 Not found`