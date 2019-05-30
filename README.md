# Employees CRUD

A web application based on [React JS](https://reactjs.org) interfaces, RESTful API Node.js using [Express 4](http://expressjs.com/) and [SQLite](https://www.sqlite.org).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and npm installed.
```
npm install
npm start
```

The front-end app runs off localhost:3000. The REST API is located in the /server folder and runs off localhost:8080.

## Running Tests

End-to-end tests implemented to all API endpoints.

```
npm test
```

## API Doc
Only one simple example how make a request in the API.

### Create Employee
URL: /api/employees

Method: POST

**Example Call:**
```
curl -H "Content-type:application/json" \
     http://localhost:8080/api/employees \
     -d '{"name": "Steve","code": "F00","profession": "Dev","color": "#ff0000","city": "Toronto","branch": "Brampton", "assigned": "1"}'
```

**Example Result**
```
{
  "employee":  
    {
      "id": 1,
      "name":"Steve",
      "code":"F00",
      "profession":"Dev",
      "color":"#ff0000",
      "city":"Toronto",
      "branch":"Brampton",
      "assigned":1
    }
}
```

# Important Notes

The chosen architecture was defined considering the most used technologies in the Node.js context like Express, trying to follow the best practices of code styling, tests and RESTful API patterns.

### Made with ❤ by Rafael de Souza
