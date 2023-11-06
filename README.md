# Nodejs Blog APIS (Express, Typescript, Swagger)

## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [PostgreSQL](https://www.postgresql.org/download/) / [MySQL](https://www.mysql.com/downloads/) / [SQLite](https://www.sqlite.org/download.html)

## Setup

Clone the repository and run
```
git clone git@github.com:sagaryonjan/node-post.git

yarn   # or npm install

```

Make a copy of `.env.example` as `.env` and update your application details and database credentials. Now, run the migrations and seed the database.

```
NODE_ENV= development || test

npm run migrate
npm run seed
```
Finally, start the application.
```
npm run dev  (For development)
or 

npm run build
npm run start
```

Navigate to http://localhost:8000/api/docs/ to verify installation.

## Creating new Migrations and Seeds

These are the commands to create a new migration and corresponding seed file.
```
npm run make:migration <name>
npm run make:seeder <name>
```
Example,
```
npm run make:migration create_users_table
npm run make:seeder users_seeder_table
```

You can find the swagger documentation on link

http://localhost:8000/api/docs/

## Tests

To run the tests you need to create a separate test database. Don't forget to update your `.env` file to include the connections for test database.
```
# update env to test
NODE_ENV=test
```
After updating env. we must run migration & seeder for the test as inorder to run test successfully. 
```
npm run migrate
npm run seed
```
It will create a new user and post. Now you can run the test.

```
npm run test

```
