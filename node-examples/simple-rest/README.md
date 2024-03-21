# REST API

A REST API (Representational State Transfer Application Programming Interface) is a set of rules and protocols that allows software applications to communicate with each other over the internet or other networks. It is designed around the standard web technologies and HTTP protocols, making it an efficient and widely adopted method for enabling interactions between computer systems.

The core principles of a REST API revolve around resources, which are any kind of information or data. These resources are manipulated using HTTP request methods such as GET (to retrieve data), POST (to create data), PUT (to update data), DELETE (to delete data), and others, depending on the API's design. Each resource is identified by a URI (Uniform Resource Identifier), essentially a web address that specifies the location of the resource on the server.

REST APIs are stateless, meaning that each request from a client to a server must contain all the information needed to understand and complete the request. The server does not retain session information or status about the client, which simplifies the design and increases scalability and performance.

The responses from a REST API are typically in a format that's easy to read and work with, such as JSON (JavaScript Object Notation) or XML (eXtensible Markup Language), containing the data requested or the result of the operation performed.

In REST APIs, responses to requests are communicated through HTTP status codes, along with optional data payloads that can provide further details or the results of the request. The handling of successful and failed responses is a critical aspect of REST API design, ensuring that clients can understand the outcome of their requests and take appropriate actions.

## Successful Responses

200 OK: This status code indicates that a request has succeeded. The specific meaning of success depends on the HTTP method used. For a GET request, the resource is returned in the response body. For POST, PUT, or DELETE, the outcome of the action is conveyed in the body.
201 Created: Used specifically when a new resource has been created as a result of a POST request. The response usually includes a Location header pointing to the URL of the new resource, and the body may contain the details of the created resource.
202 Accepted: Indicates that the request has been accepted for processing, but the processing has not been completed. It's often used for requests that take a long time to process, implying that the result is not available immediately.
204 No Content: This response is used when the request is successful but there's no content to send in the response body. It's commonly used in DELETE requests or some PUT requests where updating a resource doesn't return any new data.

## Failed Responses

400 Bad Request: The request cannot be processed due to client error, such as malformed request syntax, invalid request message parameters, or deceptive request routing.
401 Unauthorized: Indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.
403 Forbidden: The server understood the request but refuses to authorize it. Unlike 401, re-authenticating will make no difference.
404 Not Found: The server has not found anything matching the Request-URI. It’s commonly used when the requested resource doesn’t exist.
405 Method Not Allowed: The method specified in the request is not allowed for the resource identified by the request URI.
500 Internal Server Error: A generic error message indicating that the server encountered an unexpected condition that prevented it from fulfilling the request.
503 Service Unavailable: The server is currently unable to handle the request due to a temporary overload or maintenance of the server.
In addition to these status codes, REST APIs often return a payload in the body of the response, especially in case of errors. This payload typically contains a message or structured data (like JSON) explaining what went wrong, and possibly suggestions for how to fix the issue. This information is invaluable for developers when debugging issues or handling errors in client applications.

## Curl Commands generating and receiving http requests

1. Create a new item:
`curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d '{"name": "Item 3"}'`

2. Read all items:
`curl http://localhost:3000/items`

3. Read a single item with id 1
`curl http://localhost:3000/items/1`

4. Update an existing item that has id 1
`curl -X PUT http://localhost:3000/items/1 -H "Content-Type: application/json" -d '{"name": "Updated Item Name"}'`

5. Delete an item with id 1
`curl -X DELETE http://localhost:3000/items/1`

6. Access a route with basic auth
`curl -u admin:password http://localhost:3000/items`

7. Access a route with the verbose flag set so you can see http response headers
`curl -v http://localhost:3000/items`

## Other http request and response processing tools

1. [Postman](https://www.postman.com/downloads/)
2. [Insomnia](https://insomnia.rest/download)

