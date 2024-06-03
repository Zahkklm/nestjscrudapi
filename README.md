
This is a simple REST API that tries to simulate email verification system of popular backend services.

# ChatGPT Log
[ChatGPT Website](https://chatgpt.com/share/9b4c7fea-9445-453b-9129-f8b1868604f7)

[Github Gist](https://gist.github.com/Zahkklm/8529d991321784c470d0fad90e4b27a7)

# Requirements
[npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

[Postman](https://www.postman.com/downloads/) (or a similar API testing interface)

# Setting Up

Necessary packages for this project are:
- typeorm (ORM choice for this project)
- pg (PostgreSQL client for Node.js)
- bcrypt (safe hashing library)
- nodemailer (popular free mailer library for sending mail)
- config (a package that gives a practical way to store configurations in one place to make them much easier to change and use them on test environements)
- testing (simple async testing library)

Run following commands in terminal to install packages mentioned above.

`npm install @nestjs/typeorm typeorm@0.3.19 pg bcrypt`

`npm install @nestjs-modules/mailer nodemailer`

`npm install @nestjs/config`

`npm install -D reflect-metadata @types/bcrypt`

Following command is used with _`--save-dev`_ option to make sure testing packages are not deployed.

`npm install --save-dev @nestjs/testing`

Create _.env_ file in the root directory of project that will consist of Database and SMTP server configurations

```
DB_URL=postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
DB_TYPE=postgres
MAIL_HOST=smtp.gmail.com
MAIL_USER=senderemail@mail.com
MAIL_PASSWORD=password
MAIL_FROM=senderemail@mail.com
MAIL_PORT=465 or 587
```

DB_URL will consist of connection string in following format according to database username, password, port, database name and optional parameters:

`postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]`

Example database connection string:

`postgresql://[ozgurdbhesap[:ozgurdbsifre]@][netloc][:5432][/testdb][?param1=value1&...]`



Generate migration files from entities by running

`npm run typeorm migration:generate`

Apply migrations 

`npm run typeorm migration:run`

# Run the app

`npm run start`

***HTTP endpoint: POST /user/register***

**Input**:
`````
{
  "username": "denemeisim",
  "password": "xxxzzzz",
  "email": "ozgurpeynirci@gmail.com"
}
`````

**Result**
````
{
  "status": "success",
  "data": [
    {
      "message": "User registered successfully",
      "userId": "51a24884-7784-42af-adaf-d74cee23621d"
    }
  ]
}
`````

***HTTP endpoint: GET /user/verify-email/{username}/{verificationToken}***

![Capture](https://github.com/Zahkklm/nestjscrudapi/assets/78751009/fffdb78a-3996-450c-b23b-08d90472c1a8)

````
{
  "status": "success",
  "data": [
    {
      "message": "Email verified successfully"
    }
  ]
}
````

***HTTP endpoint: GET /user/check-verification/{username}***

**Result**

````
{
  "status": "success",
  "data": [
    "User is verified"
  ]
}
````
# Testing

There are unit and E2E tests in this project. To run these tests, following testing package is required: 

```npm install @nestjs/testing```

Run E2E test

``` npm run test:e2e ```


# Primary Sources
- https://docs.nestjs.com/
- https://medium.com/@saeid/10-essential-practices-for-better-git-commits-and-why-they-matter-3cfc420bf53e
- https://medium.com/nestjs-ninja/authentication-part-3-using-nestjs-and-postgres-database-neon-tech-39306a41b7a0
- https://medium.com/simform-engineering/nestjs-and-postgresql-a-crud-tutorial-32aa78778752
- Lots of Stackoverflow 😎
