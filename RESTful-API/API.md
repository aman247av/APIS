# RESTful API Documentation

## Orders

### Place Order

- **Request:**
  - Method: POST
  - URL: `http://localhost:3000/orders/`
  - Headers:
    - Authorization: Bearer [Token]
  - Body (urlencoded):
    - productId: 64d71f58f4e643f9ce79fdc3
    - quantity: 3

```javascript
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://localhost:3000/orders/',
  'headers': {
  },
  form: {
    'productId': '64d71fc8f4e643f9ce79fdc5',
    'quantity': '2'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

- **Response:**
  - Status: Created (201)
  - Headers:
    - Authorization: Bearer [Token]
  - Body:
    ```json
    {
        "message": "Order placed",
        "createdOrder": {
            "_id": "64d722e4f4e643f9ce79fdcf",
            "productId": "64d71fc8f4e643f9ce79fdc5",
            "quantity": 2
        },
        "request": {
            "type": "GET",
            "url": "http://localhost:3000/orders/64d722e4f4e643f9ce79fdcf"
        }
    }
    ```

### List All Orders

- **Request:**
  - Method: GET
  - URL: `http://localhost:3000/orders/`
  - Headers:
    - Authorization: Bearer [Token]

```javascript
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://localhost:3000/orders/',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

- **Response:**
  - Status: OK (200)
  - Headers:
    - Authorization: Bearer [Token]
  - Body:
    ```json
    {
        "count": 4,
        "orders": [
            {
                "_id": "64d722e4f4e643f9ce79fdcf",
                "product": {
                    "_id": "64d71fc8f4e643f9ce79fdc5",
                    "name": "November 9",
                    "price": 420,
                    "productImage": "uploads/2023-08-12T05:59:36.688ZNovel2.jpg",
                    "__v": 0
                },
                "quantity": 2,
                "request": {
                    "type": "GET",
                    "url": "http://localhost:3000/orders/64d722e4f4e643f9ce79fdcf"
                }
            },
            {
                "_id": "64d72339f4e643f9ce79fdd2",
                "product": {
                    "_id": "64d71e9ff4e643f9ce79fdbf",
                    "name": "You Only live Once",
                    "price": 100,
                    "productImage": "uploads/2023-08-12T05:54:39.505ZNovel1.jpg",
                    "__v": 0
                },
                "quantity": 1,
                "request": {
                    "type": "GET",
                    "url": "http://localhost:3000/orders/64d72339f4e643f9ce79fdd2"
                }
            },
            {
                "_id": "64d72345f4e643f9ce79fdd5",
                "product": {
                    "_id": "64d71e9ff4e643f9ce79fdbf",
                    "name": "You Only live Once",
                    "price": 100,
                    "productImage": "uploads/2023-08-12T05:54:39.505ZNovel1.jpg",
                    "__v": 0
                },
                "quantity": 5,
                "request": {
                    "type": "GET",
                    "url": "http://localhost:3000/orders/64d72345f4e643f9ce79fdd5"
                }
            },
            {
                "_id": "64d72350f4e643f9ce79fdd8",
                "product": {
                    "_id": "64d71f58f4e643f9ce79fdc3",
                    "name": "IKIGAI",
                    "price": 500,
                    "productImage": "uploads/2023-08-12T05:57:44.569ZNovel3.jpg",
                    "__v": 0
                },
                "quantity": 3,
                "request": {
                    "type": "GET",
                    "url": "http://localhost:3000/orders/64d72350f4e643f9ce79fdd8"
                }
            }
        ]
    }
    ```

### OrderById

- **Request:**
  - Method: GET
  - URL: `http://localhost:3000/orders/64d72350f4e643f9ce79fdd8`
  - Headers:
    - Authorization: Bearer [Token]

```javascript
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://localhost:3000/orders/64d72350f4e643f9ce79fdd8',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

- **Response:**
  - Status: OK (200)
  - Headers:
    - Authorization: Bearer [Token]
  - Body:
    ```json
    {
        "productId": {
            "_id": "64d71f58f4e643f9ce79fdc3",
            "name": "IKIGAI",
            "price": 500,
            "productImage": "uploads/2023-08-12T05:57:44.569ZNovel3.jpg",
            "__v": 0
        },
        "quantity": 3,
        "request": {
            "method": "GET",
            "description": "GET_ALL_ORDERS",
            "url": "http://localhost:3000/orders/"
        }
    }
    ```

### DeleteByID

- **Request:**
  - Method: DELETE
  - URL: `http://localhost:3000/orders/64d72339f4e643f9ce79fdd2`
  - Headers:
    - Authorization: Bearer [Token]

```javascript
var request = require('request');
var options = {
  'method': 'DELETE',
  'url': 'http://localhost:3000/orders/64d72339f4e643f9ce79fdd2',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

- **Response:**
  - Status: OK (200)
  - Headers:
    - Authorization: Bearer [Token]
  - Body:
    ```json
    {
        "message": "Order Deleted",
        "request": {
            "method": "POST",
            "url": "http://localhost:3000/orders",
            "body": {
                "productId": "ID",
                "quantity": "Number"
            }
        }
    }
    ```


## Products

### Upload Product

- Method: POST
- URL: `http://localhost:3000/products/`
- Headers:
  - Authorization: Bearer [Token]
- Body:
  - name: Atomic Habits
  - price: 530
  - productImage: [file](/home/av/Downloads/Novel4.jpg)



```javascript
var request = require('request');
var fs = require('fs');
var options = {
  'method': 'POST',
  'url': 'http://localhost:3000/products/',
  'headers': {
    'Authorization': 'Bearer [Token]'
  },
  formData: {
    'name': 'You Only live Once',
    'price': '400',
    'productImage': [
      fs.createReadStream('/home/av/Downloads/Novel1.jpg')
    ]
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

- **Response:**
  - Status: Created (201)
  - Headers:
    - Authorization: Bearer [Token]
  - Body:
    ```json
    {
        "message": "Created product successfully!",
        "createdProduct": {
            "name": "You Only live Once",
            "price": 400,
            "_id": "64d71e9ff4e643f9ce79fdbf",
            "request": {
                "method": "POST",
                "url": "http://localhost:3000/products/64d71e9ff4e643f9ce79fdbf"
            }
        }
    }
    ```

### All Products

- Method: GET
- URL: `http://localhost:3000/products/`
- Headers:
  - Authorization: Bearer [Token]


```javascript
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://localhost:3000/products/',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

- **Response:**
  - Status: OK (200)
  - Headers:
    - Authorization: Bearer [Token]
  - Body:
    ```json
    {
        "count": 4,
        "products": [
            {
                "name": "You Only live Once",
                "price": 400,
                "productImage": "uploads/2023-08-12T05:54:39.505ZNovel1.jpg",
                "_id": "64d71e9ff4e643f9ce79fdbf",
                "request": {
                    "method": "GET",
                    "url": "http://localhost:3000/products/64d71e9ff4e643f9ce79fdbf"
                }
            },
            {
                "name": "IKIGAI",
                "price": 500,
                "productImage": "uploads/2023-08-12T05:57:44.569ZNovel3.jpg",
                "_id": "64d71f58f4e643f9ce79fdc3",
                "request": {
                    "method": "GET",
                    "url": "http://localhost:3000/products/64d71f58f4e643f9ce79fdc3"
                }
            },
            {
                "name": "November 9",
                "price": 420,
                "productImage": "uploads/2023-08-12T05:59:36.688ZNovel2.jpg",
                "_id": "64d71fc8f4e643f9ce79fdc5",
                "request": {
                    "method": "GET",
                    "url": "http://localhost:3000/products/64d71fc8f4e643f9ce79fdc5"
                }
            },
            {
                "name": "Atomic Habits",
                "price": 530,
                "productImage": "uploads/2023-08-12T06:00:06.521ZNovel4.jpg",
                "_id": "64d71fe6f4e643f9ce79fdc7",
                "request": {
                    "method": "GET",
                    "url": "http://localhost:3000/products/64d71fe6f4e643f9ce79fdc7"
                }
            }
        ]
    }
    ```

### ProductById

- Method: GET
- URL: `http://localhost:3000/products/64d71e9ff4e643f9ce79fdbf`
- Headers:
  - Authorization: Bearer [Token]


```javascript
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://localhost:3000/products/64d71e9ff4e643f9ce79fdbf',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

- **Response:** OK (200)
  - Headers:
    - Authorization: Bearer [Token]
  - Body:
    ```json
    {
        "product": {
            "_id": "64d71e9ff4e643f9ce79fdbf",
            "name": "You Only live Once",
            "price": 400,
            "productImage": "uploads/2023-08-12T05:54:39.505ZNovel1.jpg"
        },
        "request": {
            "method": "GET",
            "description": "GET_ALL_PRODUCTS",
            "url": "http://localhost:3000/products/"
        }
    }
    ```

### Product

- Method: PATCH
- URL: `http://localhost:3000/products/64d71e9ff4e643f9ce79fdbf`
- Headers:
  - Authorization: Bearer [Token]
- Body:
  - price: 100


```javascript
var request = require('request');
var options = {
  'method': 'PATCH',
  'url': 'http://localhost:3000/products/64d71e9ff4e643f9ce79fdbf',
  'headers': {
    'Authorization': 'Bearer [Token]'
  },
  form: {
    'price': '100'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

- **Response:**
  - Status: OK (200)
  - Headers:
    - Authorization: Bearer [Token]
  - Body:
    ```json
    {
        "message": "Product Updated",
        "request": {
            "type": "GET",
            "url": "http://localhost:3000/products/64d71e9ff4e643f9ce79fdbf"
        }
    }
    ```

### DeleteById

- Method: DELETE
- URL: `http://localhost:3000/products/64d71fe6f4e643f9ce79fdc7`
- Headers:
  - Authorization: Bearer [Token]


```javascript
var request = require('request');
var options = {
  'method': 'DELETE',
  'url': 'http://localhost:3000/products/64d71fe6f4e643f9ce79fdc7',
  'headers': {
    'Authorization': 'Bearer [Token]'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

- **Response:**
  - Status: OK (200)
  - Headers:
    - Authorization: Bearer [Token]
  - Body:
    ```json
    {
        "message": "Product Deleted",
        "request": {
            "method": "POST",
            "url": "http://localhost:3000/products",
            "body": {
                "name": "String",
                "price": "Number"
            }
        }
    }
    ```


## Users

### Generate Token

- **Method:** POST
- **URL:** `http://localhost:3000/users/login`
- **Headers:**
  - Authorization: Bearer `YourAccessToken`
- **Body:**
  - email: av@gmail.com
  - password: API@2023


```javascript
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://localhost:3000/users/login',
  'headers': {
  },
  form: {
    'email': 'av@gmail.com',
    'password': 'API@2023'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

- **Response:**
  - Status: OK (200)
  - Headers:
    - Authorization: Bearer `YourAccessToken`
  - Body:
    ```json
    {
        "message": "Successful Login",
        "token": "YourAccessTokenHere"
    }
    ```

### Create User

- **Method:** POST
- **URL:** `http://localhost:3000/users/signup`
- **Headers:**
  - Authorization: Bearer `YourAccessToken`
- **Body:**
  - email: av@gmail.com
  - password: API@2023


```javascript
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://localhost:3000/users/signup',
  'headers': {
  },
  form: {
    'email': 'av@gmail.com',
    'password': 'API@2023'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

- **Response:**
  - Status: Conflict (409)
  - Headers:
    - Authorization: Bearer `YourAccessToken`
  - Body:
    ```json
    {
        "message": "user already exists"
    }
    ```

### Delete User

- **Method:** DELETE
- **URL:** `http://localhost:3000/users/64d717a4b458ed16e24bb0e1`
- **Headers:**
  - Authorization: Bearer `YourAccessToken`
- **Body:**
  - email: ayushi@gmail.com
  - password: API@2021


```javascript
var request = require('request');
var options = {
  'method': 'DELETE',
  'url': 'http://localhost:3000/users/64d717a4b458ed16e24bb0e1',
  'headers': {
    'Authorization': 'Bearer [Token]'
  },
  form: {
    'email': 'ayushi@gmail.com',
    'password': 'API@2021'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

- **Response:**
  - Status: OK (200)
  - Headers:
    - Authorization: Bearer `YourAccessToken`
  - Body:
    ```json
    {
        "message": "User Deleted"
    }
    ```


