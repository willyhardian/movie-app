# My Movies App Server
My Movies App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

- Movies
  - [GET Movies](#get-movies)
  - [POST Movies](#post-movies)
  - [PUT Movies](#put-moviesid)
  - [PATCH Movies](#patch-moviesidshow)
  - [DELETE Movies](#delete-moviesid)

### GET /movies

> Get all movies

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": integer,
    "title": string,
    "synopsis": text,
    "duration": integer,
    "releaseDate": date,
    "coverUrl": text,
    "rating": float,
    "isNowShowing": boolean,
    "createdAt": date,
    "updatedAt": date
  },
  ...
]
```

---
### POST /movies

> Create new movie

_Request Header_
```
not needed
```

_Request Body_
```
{
  "title": string,
  "synopsis": text,
  "duration": integer,
  "releaseDate": date,
  "coverUrl": text,
  "rating": float,
  "isNowShowing": boolean
}
```

_Response (201 - Created)_
```
{
  "id": integer,
  "title": string,
  "synopsis": text,
  "duration": integer,
  "releaseDate": date,
  "coverUrl": text,
  "rating": float,
  "isNowShowing": boolean,
  "createdAt": date,
  "updatedAt": date
}
```

_Response (400 - Bad Request)_
```
{
  "message": "title is required"
  OR
  "message": "synopsis is required"
}
```

---
### PUT /movies/:id

> Update movie by id

_Request Header_
```
not needed
```

_Request Body_
```
{
  "title": string,
  "synopsis": text,
  "duration": integer,
  "releaseDate": date,
  "coverUrl": text,
  "rating": float,
  "isNowShowing": boolean
}
```

_Response (200 - Ok)_
```
{
  "message": "Movie <id> has been updated"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "title is required"
  OR
  "message": "synopsis is required"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```

---
### PATCH /movies/:id/show

> Update movie isNowShowing by id

_Request Header_
```
not needed
```

_Request Body_
```
{
  "isNowShowing": boolean
}
```

_Response (200 - Ok)_
```
{
  "message": "Movie <id> status has been updated to <isNowShowing>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "isNowShowing is required"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```

---
### DELETE /movies/:id

> Remove movie by id

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```
{
  "message": "Movie <id> has been removed"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```

### Global Error


_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```