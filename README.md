# API Documentation

## Overview

An API for a content management system offers capabilities for user authentication and the administration of posts in your application. It encompasses key functionalities like user registration, login, logout, password reset, as well as the creation, retrieval, updating, and deletion of posts. Additionally, it includes features for managing categories, including creation, retrieval, updating, and deletion.

## Introduction

The Person API is designed to perform CRUD operations on a "person" resource. It provides endpoints for creating, retrieving, updating, and deleting person records in a MongoDB database. The API is built using Express.js and Mongoose, making it easy to use and extend.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- MongoDB installed and running locally, or you have a MongoDB connection URI.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/HackCity_Tech
   ```

2. Navigate to the project directory:

   ```bash
   cd HackCity_Tech.git
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

### Running the API

1. Start the MongoDB server if not already running.

2. Start the API by running:

   ```bash
   node app.js
   ```

   The API will be available at `http://localhost:3000`.

## API Endpoints

### User Registration

- **URL:** `/api/user/signup`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "data": {
      "email": "user@example.com"
    },
    "message": "User registration successful"
  }
  ```

### User Login

- **URL:** `/api/user/login`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

  **Response:**

  ```json
  {
    "success": true,
    "data": {
      "user": {
        "email": "user@example.com"
      },
      "accessToken": "bearer_token"
    },
    "message": "Login successful"
  }
  ```

### User Logout

- **URL:** `/api/user/logout`
- **Method:** `POST`
- **Header:** `Authorization: Bearer <token>`

  ```json
  {
    "success": true,
    "data": null,
    "message": "Logged out successfully"
  }
  ```

### Forgot Password

- **URL:** `/api/user/forgot-password`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "email": "user@example.com"
  }
  ```

  **Response:**

  ```json
  {
    "success": true,
    "data": {
      "email": "user@example.com"
    },
    "message": "Password reset email sent"
  }
  ```

### Reset Password

- **URL:** `/api/user/reset-password`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "resetToken": "valid_reset_token",
    "newPassword": "newsecurepassword"
  }
  ```

  **Response:**

  ```json
  {
    "success": true,
    "data": {
      "email": "user@example.com"
    },
    "message": "Password reset successful"
  }
  ```

### Post Management Endpoints

### Create a Post

- **URL:** `/api/post/create`
- **Method:** `POST`
- **Request Body:**
- **Header:** `Authorization: Bearer <token>`

  ```json
  {
    "title": "Exciting Post",
    "content": "This is an engaging post content."
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "data": {
      "_id": "unique_post_id",
      "title": "Exciting Post",
      "content": "This is an engaging post content.",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    "message": "Post created successfully"
  }
  ```

### Delete a Post

- **URL:** `/api/post/:id`
- **Method:** `DELETE`
  **Response:**

  ```json
  {
    "success": true,
    "data": null,
    "message": "Post deleted successfully"
  }
  ```

### Edit a Post

- **URL:** `/api/post/:id`
- **Method:** `PUT`
- **Request Body:**
- **Header:** `Authorization: Bearer <token>`

  ```json
  {
    "title": "Updated Post Title",
    "content": "Updated post content."
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "data": {
      "_id": "unique_post_id",
      "title": "Updated Post Title",
      "content": "Updated post content.",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    "message": "Post updated successfully"
  }
  ```

### List Posts

- **URL:** `/api/post/list`
- **Method:** `GET`
- **Header:** `Authorization: Bearer <token>`
  **Response:**

  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "post_id_1",
        "title": "Exciting Post",
        "content": "This is an engaging post content.",
        "author": {
          "_id": "user_id",
          "email": "user@example.com"
        },
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      {
        "_id": "post_id_2",
        "title": "Another Post",
        "content": "This is another post content.",
        "author": {
          "_id": "user_id",
          "email": "user@example.com"
        },
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ],
    "message": "Posts retrieved successfully"
  }
  ```
