# Blog Api
A RESTful API for managing blog posts with authentication, drafts and publish for post, tagging and filtering of post, authentication with jwt and hashing of password

## Features 
- User authentication (jwt)
- Create, update, delete and read posts
- draft and published posts
- tag-based filtering
- Search by title/content
- Pagination
- Soft delete


### Tech Stack
- Node.js
- Express
- MongoDB and Mongoose
- JWT authentication

#### Project Structure
Folder/
    -----controllers/
            ---postController
            --- AuthController
    ---- Models/
            --- PostModels
            --- authModels
    ---- Routes/
            --- postRoutes
            --- authRoutes
    ---- Middlewares/
            --- ValidateToken
            --- GlobalErrorHandler
    ---- Utilities
            --- AppErrorHandler
    ---- App.js

##### Environment Variables
Create a `.env` file in the root
MONGODB_URL= mongodb+srv://....
JWT_SECRET = .....
PORT = 5000

#### Installation ans SetUp

1. Clone the repo
2. install dependencies ( npm install)
3. Create a .env file in the root
4. Input .env varibles

#### API Endpoints 

## Get Posts
get/api/v2/posts/post

    ## Query parameters
    - page
    - limit
    - search
    - tag
    - author
    - status (authenticated only)
get/api/v2/posts/post/:id (get post by id)
    {
    "message": "this is the post with the id",
    "post": {
        "_id": "69887fc91be1704e373aa6bb",
        "title": "the best car of the century",
        "slug": "the_best_car_of_the_century-1770553288967",
        "content": "The best car are car that gives us the energy we need daily, we also need water and mineral resusrces too",
        "author": {
            "_id": "698833d8dfae1c08463e0f18",
            "name": "emma anthony",
            "email": "oshiok2@gmail.com"
        },
        "status": "draft",
        "tag": [
            "transportation"
        ],
        "deletedAt": null,
        "updatedAt": null,
        "createdAt": "2026-02-08T12:21:29.088Z",
        "__v": 0
    }
}

## Create, Update, Delete of  Post
post/api/v2/posts/post (create post)
    {
    "message": "Post created",
    "post": {
        "title": "the best car of the century",
        "slug": "the_best_car_of_the_century-1770553288967",
        "content": "The best car are car that gives us the energy we need daily, we also need water and mineral resusrces too",
        "author": "698833d8dfae1c08463e0f18",
        "status": "draft",
        "tag": [
            "transportation"
        ],
        "deletedAt": null,
        "updatedAt": null,
        "_id": "69887fc91be1704e373aa6bb",
        "createdAt": "2026-02-08T12:21:29.088Z",
        "__v": 0
    }
}

put/api/v2/posts/post/:id (publish post with status response "published")
    {
    "message": "Post published",
    "post": {
        "_id": "69887a3173a29df845329ca8",
        "title": "the best food of the year",
        "slug": "the_best_food_of_the_year-1770551857500",
        "content": "The best food are food that gives us the energy we need daily, we also need water and mineral resusrces too",
        "author": "698833d8dfae1c08463e0f18",
        "status": "published",
        "tag": [
            "food"
        ],
        "deletedAt": null,
        "updatedAt": "2026-02-08T11:57:37.605Z",
        "createdAt": "2026-02-08T11:57:37.605Z",
        "__v": 0
    }
}

patch/api/v2/posts/post/:id (update a post based on title/content/ tag)
    {
    "message": "Post updated successfully",
    "post": {
        "_id": "69887fc91be1704e373aa6bb",
        "title": "Anthony's car is rated the best car",
        "slug": "anthony's_car_is_rated_the_best_car-1770553675580",
        "content": "The best car are car that gives us the energy we need daily, we also need water and mineral resusrces too",
        "author": {
            "_id": "698833d8dfae1c08463e0f18",
            "name": "emma anthony",
            "email": "oshiok2@gmail.com"
        },
        "status": "draft",
        "tag": [
            "transportation"
        ],
        "deletedAt": null,
        "updatedAt": "2026-02-08T12:27:55.754Z",
        "createdAt": "2026-02-08T12:21:29.088Z",
        "__v": 0
    }
}

delete/api/v2/posts/post/:id (delete of post only by author of post)
    {
    "message": "Post deleted successfully"
}

## Register User
post/api/v2/auth/register (sign up user)
    {
    "status": "user created",
    "user": {}
} 

post/api/v2/auth/signin (sign in user using jwt and bcrypt for password)

get/api/v2/auth/logged-user (get details of the logged user)
    {
    "message": "this is the user",
    "user": {
        "_id": "698833d8dfae1c08463e0f18",
        "name": "emma anthony",
        "email": "oshiok2@gmail.com",
        "__v": 0
    }
}

#### HTTP Status code 
- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 500 Server error