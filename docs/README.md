# Karbon API Docs

> Made and maintained by Andrey Novichkov  
> https://node-karbon-api.herokuapp.com/

## What does the Karbon API do?
This is an API aimns to allow you to find nearby brick & mortar stores based on a combination of:
- Having a specific product in the inventory
- Location
- Category
- Ratings  

This is an on-going project. For now, everything that you see below is **implemented and deployed**


## Auth Routes
**You need to be signed-up and logged in to be able to access API**

### Sign Up
> /auth/signup

Input as form encoded object:
```
{
    'user': username
    'password': password
}
```

### Log In
> /auth/login

Input as form encoded object:
```
{
    'user': username,
    'password': password
}
```

## Models
### Store Model

```
{
    name: "Target",
    coordinates: "14.2224, 40.8492",
    city: "San Francisco",
    products: [ Product1(FK), Product2(FK), ... ]
}
```

### Product Model
```
{
    name: "Lisen iPhone Charger",
    category: "Electronics",
    price: "19.99",
    store: Store1(FK)
}
```


## GET Routes

### **Return all stores in the database**

> /stores

Outputs array of stores in JSON format.

### **Return store by id**

> /stores/{id}

Outputs single store in JSON format.

### **Return all products from all stores in the database**

> /products  

Outputs array of products in JSON format.

### **Return product by id**

> /products/{id}


## POST Routes

### **Add new store to database**
Will return the inserted store

> /stores

Input in JSON format:
```
{
    'name': 'Walgreens',
    'city': 'San Francisco',
    'coordinates': [35.24329, -122.23423]
}
```

### **Add new product to database**
Will return the inserted product

> /products

Input in JSON format:
```
{
    'name': 'Apple iPhone Lightning Cable',
    'category': 'Technology',
    'price': 14.99,
    'store': Store1._id (FK)
}
```