# Pizza Delivery API

This is a REST API for a pizza delivery app. To set up the project, kindly get these installed and setup on your PC.
* **Node JS**
* **Mongo DB**
* **MailGun Account**

The entry point to the application is the `src/index.js` file.


## To Install
Kindly clone the repository 
    `git clone https://github.com/kenselasie/node_pizza_delivery_backend.git`

Next, in the terminal, install dependencies
    npm install

After, create a `.env` file in the root directory
Copy the items in `env.example` file and fill then with the necessary fields

* **JWT_KEY**: This is the token secret, any string will do
* **NODE_ENV**: This specifies the current environment, you can put `development` or `production` depending on the environment you find yourself.
* **MAILGUN_DOMAIN**: This is the domain of your mailgun account
* **MAILGUN_APIKEY**: This is the APIKEY of your mailgun account
* **UNIT_TEST_USER_TOKEN**: This is a sample user token to perform unit tests for the system.
* **MONGODB_URL**: This is the URL to your database instance.

## Run the app
When the above requirements are met, you can now run your app with
    npm run start

To run in dev mode
    npm run dev

## Run the tests
To run tests, make sure the database is populated with some data. That is: `Users`, `Menus` and `Orders`
Also make sure `UNIT_TEST_USER_TOKEN` is given a value of a valid user token. To run unit test, run this command 
    npm test

# REST API

Find below all APIs of the system.

## Get all users in the system

### Request


`GET /http://localhost:3000/api/user/`

### Response
```
    {
        "message": "Successful",
        "data": [
            {
                "_id": "61b538be0dfb8821d908ebcf",
                "name": "John Doe",
                "email": "john@gmail.com",
                "street_address": "Street 1"
            },
            {
                "_id": "61b5403bf29452543c4a6e6d",
                "name": "Foo Bar",
                "email": "foobar@gmail.com",
                "street_address": "Street 2"
            }
        ]
    }
```

## Add new user

### Request

`POST /http://localhost:3000/api/user/`

```
    {
        "name": "Adwoa B",
        "email": "adwoa@gmail.com",
        "street_address": "Kokomemle",
        "password": "password"
    }
```

### Response
```
    {
        "message": "User Successfully Created"
    }
```