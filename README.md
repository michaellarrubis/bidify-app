# bidify

Small Bidding App with [Node.js](https://nodejs.org/en/) - [Express](https://expressjs.com/) in the Backend, [Sequelize](https://sequelize.org/) as DB, [React](https://react.dev/) on Frontend

## Running locally

### Prerequisites

- [Docker](https://www.docker.com)

### Setup

This repository should already be cloned to your local machine.
1. Copy `.env.sample` and name it .env and supply the variables
```bash
    cp .env.sample .env
```

ENV Variables:
- `MYSQL_DATABASE` - Database name
- `MYSQL_ROOT_PASSWORD` - Mysql Root Password (can leave it blank)
- `MYSQL_PASSWORD` - Database password
- `MYSQL_USER` - Database user (root is the usual one)

- `DB_HOST` - Host of the Database (get the docker-compose.yml db service: bidify_db)
- `DB_PORT` - Port of the Database (usually 3306)

- `PORT` - Backend Port (set it to 4000)
- `SECRET_KEY` - The secret key used for Bcrypt
- `REACT_APP_API_URL` - Mapped API Url (set it tohttp://localhost/api/v1)

## Running the application

1. Build the images

```bash
docker-compose build --no-cache
```

2. Fire up the containers
```bash
docker-compose up
```

3. Run the migration
```bash
docker-compose run --rm bidify_api npx sequelize-cli db:migrate
```

## Accessing the application
```bash
Client: http://localhost
API: http://localhost/api/v1
```

## Request & Response

Public Routes (Login & Register) doesn't requires Token in the Header

## API POST Request & Response

`LOGIN REQUEST`
```bash
    curl --location 'http://localhost/api/v1/users/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "kellers@mailinator.com",
        "password": "Pass123??"
    }'
```

`LOGIN RESPONSE`
```bash
    {
        "statusCode": 200,
        "message": null,
        "data": {
            "id": 1,
            "email": "kellers@mailinator.com",
            "total_funds": 699,
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJrZWxsZXJzQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNjg0MDY1OTAxLCJleHAiOjE2ODQxNTIzMDF9.qtso7TCg9InFwKQ1wFzqoK2FPsbuSurQdPxUmuiJRZg"
        }
    }
```

## API Response Status Codes

- 200 - OK
- 201 - Created/Updated
- 400 - Bad Request
- 401 - Unauthorized
- 404 - Not Found
- 500 - Server Errror

## Built With

- [Typescript](https://www.typescriptlang.org/) - Strongly typed scripts/codes.
- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [Express](https://expressjs.com/) - Node.js framework
- [Sequelize](https://sequelize.org/) - ORM
- [JWT](https://jwt.io/) - Web Token

## TODO
- Deploy this on Server
- Test it with Jest
