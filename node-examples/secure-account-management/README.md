# Introduction

This application illustrates a user sign-up process with salting and hashing of the user credentials.

# Curl commands

## Sign-up

```
curl -X POST http://localhost:3000/signup \
-H "Content-Type: application/json" \
-d '{"username": "newuser", "password": "password123"}'
```

## Sign-in

```
curl -X POST http://localhost:3000/signin \
-H "Content-Type: application/json" \
-d '{"username": "newuser", "password": "password123"}'
```
