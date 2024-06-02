# nestjscrudapi
This is a simple REST API that tries to simulate email verification system of popular backend services.

# Requirements
npm

Postman (or a similar API testing interface)

# Setting Up

Necessary packages for this project are:
- typeorm (ORM choice for this project)
- pg (PostgreSQL client for Node.js)
- bcrypt (safe hashing library)
- nodemailer (popular free mailer library for sending mail)
- config (a package that gives a practical way to store configurations in one place to make them much easier to change and use them on test environements)
- testing (simple async testing library)

Run following commands in terminal to install packages mentioned above.

`npm install @nestjs/typeorm typeorm pg bcrypt`

`npm install @nestjs-modules/mailer nodemailer`

`npm install @nestjs/config`

`npm install -D reflect-metadata @types/bcrypt`

Following command is used with _`--save-dev`_ option to make sure testing packages are not deployed.

`npm install --save-dev @nestjs/testing`

Create _.env_ file in the root directory that will consist of SMTP server configurations

```
MAIL_HOST=smtp.gmail.com
MAIL_USER=senderemail@mail.com
MAIL_PASSWORD=password
MAIL_FROM=senderemail@mail.com
MAIL_PORT=465 or 587
```

Create _process.env_ file following format below to store database connection string (or use it to store `key=value` pairs storing same information in a different way).

`postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]`


Generate migration files from entities by running

`npm run typeorm migration:generate`

Apply migrations 

`npm run typeorm migration:run`

# Run the app

`npm run start`

***HTTP endpoint: POST /user/register:***

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

**Result**

Imagelink

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

***HTTP endpoint: GET /user/check-verification/{username}:***

**Result**

````
{
  "status": "success",
  "data": [
    "User is verified"
  ]
}
````