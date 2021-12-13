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
`npm run start`

To run in dev mode
`npm run dev`

## Run the tests
To run tests, make sure the database is populated with some data. That is: `Users`, `Menus` and `Orders`
Also make sure `UNIT_TEST_USER_TOKEN` is given a value of a valid user token. To run unit test, run this command 
`npm test`

## Run coverage
To run coverage, run this command 
`npm run coverage`
    

# REST API

Find below all APIs of the system.

# USER MODULE
## GET ALL USERS

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

## ADD NEW USER

### Request

`POST /http://localhost:3000/api/user/`
#### Payload
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



## USER LOGIN

### Request

`POST /http://localhost:3000/api/user/login`
#### Payload
```
{
    "email": "adwoa@gmail.com",
    "password": "password"
}
```

### Response
```
{
    "message": "Successfully Logged In",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkd29hQGdtYWlsLmNvbSIsInVzZXJfaWQiOiI2MWI2N2Q1MzVlZTU2NmZiMmYxMmNjNGUiLCJpYXQiOjE2MzkzNTAwNzgsImV4cCI6MTY0MTk0MjA3OH0.UUNazULTbMObUaWDDNNe7DMu0XWAFgFyYyEIgWV96Ds"
}
```

## GET USER BY ID

### Request

`GET /http://localhost:3000/api/user/:id`


### Response
```
{
    "message": "Success",
    "data": {
        "_id": "61b67d535ee566fb2f12cc4e",
        "name": "Adwoa B",
        "email": "adwoa@gmail.com",
        "street_address": "Kokomemle"
    }
}
```


## USER UPDATE

### Request

`PATCH /http://localhost:3000/api/user/:id`
#### Payload
```
{
    "name": "Adwoa B",
    "email": "adwoa@gmail.com",
    "street_address": "Kokomemle"
}
```

### Response
```
{
    "message": "User info updated succesfully"
}
```

## USER DELETE

### Request

`DELETE /http://localhost:3000/api/user/:id`
#### Payload

### Response
```
{
    "message": "User Deleted"
}
```

## USER LOGOUT

### Request

`GET /http://localhost:3000/api/user?token={token_id}`

### Response
```
{
    "message": "User Deleted"
}
```


# MENU MODULE
## GET ALL MENUS
### Request


`GET /http://localhost:3000/api/menu`
Requires Bearer Token
### Response
```
{
    "message": "Successful",
    "data": [
        {
            "_id": "61b551013eabe49651f301fb",
            "menu_name": "Pizza Meat Lovers",
            "price": "35"
        },
        {
            "_id": "61b5510b3eabe49651f301fd",
            "menu_name": "Pizza Supreme",
            "price": "35"
        },
        {
            "_id": "61b5512c3eabe49651f30201",
            "menu_name": "Pizza Vegetarian",
            "price": "45"
        },
        {
            "_id": "61b551563eabe49651f30208",
            "menu_name": "Pizza Super Mix",
            "price": "45"
        }
    ]
}
```

## ADD NEW MENU

### Request

`POST /http://localhost:3000/api/menu`
#### Payload
```
{
    "menu_name": "Pizza Super Mix",
    "price": "45"

}
```

### Response
```
{
    "message": "Menu Successfully Created"
}
```







# ORDER MODULE
## GET ALL ORDERS
### Request


`GET /http://localhost:3000/api/order`
Requires Bearer Token
### Response
```
{
    "message": "Successful",
    "data": [
        {
            "_id": "61b56166e50de41a9b7fd225",
            "menu": {
                "_id": "61b551013eabe49651f301fb",
                "menu_name": "Pizza Meat Lovers",
                "price": "35"
            },
            "quantity": 54
        },
        {
            "_id": "61b66f932e632469f3b18bf4",
            "menu": {
                "_id": "61b551563eabe49651f30208",
                "menu_name": "Pizza Super Mix",
                "price": "45"
            },
            "quantity": 100
        }
    ]
}
```

## ADD NEW ORDER

### Request

`POST /http://localhost:3000/api/order`
Requires Bearer Token

#### Payload
```
{
    "menu_id": "61b551563eabe49651f30208",
    "quantity": "103"
}
```

### Response
```
{
    "message": "Order successfully made",
    "receiptSent": true,
    "order": {
        "menu": "61b551563eabe49651f30208",
        "quantity": 3
    }
}
```
