## Node-Express-Cart
Shopping cart Node using express, knex, bookshelf


## Installation
```bash
$ git clone https://github.com/MahmoudNaguib/node-express-cart
$ cd node-express-cart
$ cp .env.example .env  // Update Database settings and Email Settings 
$ npm install --save --force
```

## Running the app

```bash
# Run
$ npm run start

# Run database migration
$ knex migrate:latest

# Run database seeders
$ knex seed:run

# Run database specific seeders
$ knex seed:run --specific={{seederFileName}}
```

## Admin User
```bash
Email: admin@demo.com
Password: demo@12345
```

## Guest User
```bash
Email: user1@demo.com
Password: demo@12345
```

## Files and Folders access
```bash
# Give reade/write access to public/uploads directory
$ chmod -R 777 public/uploads
```


## POSTMAN API
```bash
- Postman URL
https://documenter.getpostman.com/view/375068/VUqrMGKM

Create environment with the below variables
- url:localhost:8000
- email: admin@demo.com
- password: demo@12345
```
```