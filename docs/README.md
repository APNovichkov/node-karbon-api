# Karbon API Docs

> Made and maintained by Andrey Novichkov  
> karbon.co/data

## What does the API do?
This is an API that allows you to find nearby brick & mortar stores based on a combination of:
- Having a specific product in the inventory
- Location
- Category
- Ratings


## GET Routes

### **Return all stores in the database**

> /stores

Output in JSON format:
```
[{
    'id': 45
    'name': 'Walgreens',
    'category': 'Personal Care/Groceries',
    'coordinates': [35.24329, -122.23423]
},
{
    ...
}]
```

### **Return store by id**

> /stores/{id}

Output in JSON format:
```
{
    'id': 45
    'name': 'Walgreens',
    'category': 'Personal Care/Groceries',
    'coordinates': [35.24329, -122.23423]
}
```


### **Return all products from all stores in the database**

> /products  

Output in JSON format:
```
[{
    'id': '20'
    'name': 'Apple iPhone Lightning Cable',
    'category': 'Technology',
    'store_id': 45
    'price': 14.99
    'quantity': 42
    'last_updated': 04192020-093029
},
{
    ...
}]
```

### **Return product by id**

> /products/{id}

Output in JSON format:
```
{
    'id': '20'
    'name': 'Apple iPhone Lightning Cable',
    'category': 'Technology',
    'store_id': 45
    'price': 14.99
    'quantity': 42
    'last_updated': 04192020-093029
}
```

### **Return stores based on a search category and a json body like the one below**

> /stores/getdata/{product_name/location/category/rating}

Input in JSON format:
```
{
    'keyword': 'Apple charging cable',
    'limit': 10,
    'location': [23.040203, -122.72834],
    'rating': 3
}
```

Output in JSON format:
```
[{
    'id': 45
    'name': 'Walgreens',
    'category': 'Personal Care/Groceries',
    'coordinates': [35.24329, -122.23423],
    'product': {
        'id': '20'
        'name': 'Apple iPhone Lightning Cable',
        'category': 'Technology',
        'store_id': 45
        'price': 14.99
        'quantity': 42
        'last_updated': 04192020-093029
    }
},
{
    ...
}]
```

### **Return products based on a search category and a json body like the one below**

> /products/getdata/{product_name/location/category}

Input in JSON format:
```
{
    'keyword': 'Apple charging cable',
    'limit': 10,
    'location': [23.040203, -122.72834],
    'category': 'Technology'
}
```

Output in JSON format:
```
[{
    'id': 45
    'name': 'Walgreens',
    'category': 'Personal Care/Groceries',
    'coordinates': [35.24329, -122.23423]
},
{
    ..
}]
```

## PUT Routes

### **Add new store to database**
Will return the store_id

> /add/store

Input in JSON format:
```
{
    'name': 'Walgreens',
    'category': 'Personal Care/Groceries',
    'coordinates': [35.24329, -122.23423]
}
```

### **Add new product to database**
Will return the product_id

> /add/product

Input in JSON format:
```
{
    'name': 'Apple iPhone Lightning Cable',
    'category': 'Technology',
    'store_id': 45
    'price': 14.99
    'quantity': 42
    'last_updated': 04192020-093029
}
```

## DELETE Routes

### **Remove store by id (this removes all products linked to this store_id)**
Will return the removed store object, and number of product objects removed

> /remove/store/{id}

Output in JSON Format
```
{
    'id': 45
    'name': 'Walgreens',
    'category': 'Personal Care/Groceries',
    'coordinates': [35.24329, -122.23423],
    'num_products_removed': 120
}
```

### **Remove product by id**
Will return the removed product object

> /remove/product/{id}

Output in JSON format:
```
{
    'id': 20
    'name': 'Apple iPhone Lightning Cable',
    'category': 'Technology',
    'store_id': 45
    'price': 14.99
    'quantity': 42
    'last_updated': 04192020-093029
}
```
